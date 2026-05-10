-- ============================================================
-- RLS POLICIES FOR EXISTING TABLES
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE walker_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE walker_availability ENABLE ROW LEVEL SECURITY;

-- profiles
CREATE POLICY "Profiles viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- walker_profiles
CREATE POLICY "Walker profiles viewable by everyone" ON walker_profiles FOR SELECT USING (true);
CREATE POLICY "Walkers can insert own profile" ON walker_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Walkers can update own profile" ON walker_profiles FOR UPDATE USING (auth.uid() = user_id);

-- walker_availability
CREATE POLICY "Availability viewable by everyone" ON walker_availability FOR SELECT USING (true);
CREATE POLICY "Walkers can insert own availability" ON walker_availability FOR INSERT WITH CHECK (
  walker_id IN (SELECT id FROM walker_profiles WHERE user_id = auth.uid())
);
CREATE POLICY "Walkers can update own availability" ON walker_availability FOR UPDATE USING (
  walker_id IN (SELECT id FROM walker_profiles WHERE user_id = auth.uid())
);


-- ============================================================
-- NEW TABLES
-- ============================================================

-- Dogs (owned by owner users)
CREATE TABLE dogs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  breed text,
  age integer,
  gender text,
  photo text,
  health_issues text,
  socialization text,
  energy_level integer DEFAULT 50,
  special_notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE dogs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owners can view own dogs" ON dogs FOR SELECT USING (owner_id = auth.uid());
CREATE POLICY "Owners can insert dogs" ON dogs FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Owners can update dogs" ON dogs FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Owners can delete dogs" ON dogs FOR DELETE USING (auth.uid() = owner_id);


-- Bookings
CREATE TABLE bookings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  walker_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  dog_id uuid REFERENCES dogs(id) ON DELETE SET NULL,
  date date NOT NULL,
  start_time time NOT NULL,
  duration_minutes integer NOT NULL DEFAULT 30,
  status text NOT NULL DEFAULT 'pending',
  -- status values: pending | confirmed | active | completed | cancelled
  price numeric(10,2),
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Bookings viewable by participants" ON bookings
  FOR SELECT USING (owner_id = auth.uid() OR walker_id = auth.uid());
CREATE POLICY "Owners can create bookings" ON bookings
  FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Participants can update bookings" ON bookings
  FOR UPDATE USING (owner_id = auth.uid() OR walker_id = auth.uid());


-- Reviews
CREATE TABLE reviews (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  walker_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  booking_id uuid REFERENCES bookings(id) ON DELETE SET NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(booking_id)
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Reviews viewable by everyone" ON reviews FOR SELECT USING (true);
CREATE POLICY "Owners can write reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Owners can update own reviews" ON reviews FOR UPDATE USING (auth.uid() = owner_id);


-- ============================================================
-- TRIGGER: auto-update avg_rating on walker_profiles
-- when a new review is inserted or updated
-- ============================================================

CREATE OR REPLACE FUNCTION update_walker_avg_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE walker_profiles
  SET avg_rating = (
    SELECT ROUND(AVG(rating)::numeric, 1)
    FROM reviews
    WHERE walker_id = NEW.walker_id
  )
  WHERE user_id = NEW.walker_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_review_insert_or_update
  AFTER INSERT OR UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_walker_avg_rating();
