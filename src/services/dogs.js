import { supabase } from '../lib/supabaseClient'

export async function fetchDogsByOwner(ownerUserId) {
  const { data, error } = await supabase
    .from('dogs')
    .select('id, name, breed, age, gender, photo, health_issues, socialization, energy_level, special_notes')
    .eq('owner_id', ownerUserId)
    .order('created_at', { ascending: true })
  if (error) throw error
  return data ?? []
}

export async function addDog(ownerUserId, dog) {
  const { data, error } = await supabase
    .from('dogs')
    .insert({ owner_id: ownerUserId, ...dog })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateDog(dogId, updates) {
  const { error } = await supabase
    .from('dogs')
    .update(updates)
    .eq('id', dogId)
  if (error) throw error
}

export async function deleteDog(dogId) {
  const { error } = await supabase
    .from('dogs')
    .delete()
    .eq('id', dogId)
  if (error) throw error
}
