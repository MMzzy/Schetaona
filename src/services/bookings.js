import { supabase } from '../lib/supabaseClient'

const BOOKING_SELECT = `
  id,
  date,
  start_time,
  duration_minutes,
  status,
  price,
  notes,
  created_at,
  dogs ( id, name, breed, photo ),
  owner:profiles!bookings_owner_id_fkey ( full_name, phone, profile_photo ),
  walker:profiles!bookings_walker_id_fkey ( full_name, phone, profile_photo )
`

export async function fetchBookingsByOwner(ownerUserId) {
  const { data, error } = await supabase
    .from('bookings')
    .select(BOOKING_SELECT)
    .eq('owner_id', ownerUserId)
    .order('date', { ascending: false })
  if (error) throw error
  return data ?? []
}

export async function fetchBookingsByWalker(walkerUserId) {
  const { data, error } = await supabase
    .from('bookings')
    .select(BOOKING_SELECT)
    .eq('walker_id', walkerUserId)
    .order('date', { ascending: false })
  if (error) throw error
  return data ?? []
}

export async function fetchTodaysConfirmedBookings(walkerUserId) {
  const today = new Date().toISOString().split('T')[0]
  const { data, error } = await supabase
    .from('bookings')
    .select(BOOKING_SELECT)
    .eq('walker_id', walkerUserId)
    .eq('date', today)
    .in('status', ['confirmed', 'active'])
    .order('start_time', { ascending: true })
  if (error) throw error
  return data ?? []
}

export async function createBooking({ ownerId, walkerId, dogId, date, startTime, durationMinutes, price, notes }) {
  const { data, error } = await supabase
    .from('bookings')
    .insert({
      owner_id: ownerId,
      walker_id: walkerId,
      dog_id: dogId,
      date,
      start_time: startTime,
      duration_minutes: durationMinutes,
      price,
      notes,
    })
    .select(BOOKING_SELECT)
    .single()
  if (error) throw error
  return data
}

export async function updateBookingStatus(bookingId, status) {
  const { error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', bookingId)
  if (error) throw error
}
