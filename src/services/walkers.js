import { supabase } from '../lib/supabaseClient'

export async function fetchWalkers({ onlineOnly = false } = {}) {
  let query = supabase
    .from('walker_profiles')
    .select(`
      id,
      user_id,
      bio,
      experience,
      walking_zone,
      hourly_rate,
      is_online,
      avg_rating,
      max_dogs,
      radius_km,
      profiles!walker_profiles_user_id_fkey (
        full_name,
        city,
        profile_photo
      ),
      walker_availability (
        mon, tue, wed, thu, fri, sat, sun,
        morning_from, morning_to, afternoon_from, afternoon_to
      )
    `)

  if (onlineOnly) query = query.eq('is_online', true)

  const { data, error } = await query
  if (error) throw error
  return data ?? []
}

export async function fetchWalkerById(walkerProfileId) {
  const { data, error } = await supabase
    .from('walker_profiles')
    .select(`
      id,
      user_id,
      bio,
      experience,
      walking_zone,
      hourly_rate,
      is_online,
      avg_rating,
      max_dogs,
      radius_km,
      profiles!walker_profiles_user_id_fkey (
        full_name,
        city,
        phone,
        profile_photo
      ),
      walker_availability (
        mon, tue, wed, thu, fri, sat, sun,
        morning_from, morning_to, afternoon_from, afternoon_to
      )
    `)
    .eq('id', walkerProfileId)
    .single()

  if (error) throw error
  return data
}

export async function updateWalkerOnlineStatus(walkerProfileId, isOnline) {
  const { error } = await supabase
    .from('walker_profiles')
    .update({ is_online: isOnline })
    .eq('id', walkerProfileId)
  if (error) throw error
}
