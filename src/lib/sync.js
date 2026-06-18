// Sincronización en la nube (Supabase). El estado de la app (config + historial +
// ediciones de rutina) se guarda en una fila de `gym_state`, identificada por un
// "código" que elige el usuario. Mismo código en otro dispositivo = mismos datos.
//
// Todo degrada con elegancia: si no hay Supabase o la tabla no existe, devuelve
// un motivo y la app sigue andando solo con localStorage.

import { supabase } from './supabase'

const TABLE = 'gym_state'

// La tabla no existe todavía (falta correr el SQL).
function noTable(error) {
  return error?.code === 'PGRST205' || /relation .*gym_state.* does not exist/i.test(error?.message || '')
}

// Trae la fila de un código. row = null si el código no existe aún.
export async function fetchState(code) {
  if (!supabase) return { ok: false, reason: 'no-config' }
  const { data, error } = await supabase
    .from(TABLE)
    .select('data, updated_at')
    .eq('code', code)
    .maybeSingle()
  if (error) return { ok: false, reason: noTable(error) ? 'no-table' : 'error', error }
  return { ok: true, row: data }
}

// Guarda (upsert) el estado bajo un código.
export async function saveState(code, state) {
  if (!supabase) return { ok: false, reason: 'no-config' }
  const { error } = await supabase
    .from(TABLE)
    .upsert(
      { code, data: state, updated_at: new Date().toISOString() },
      { onConflict: 'code' },
    )
  if (error) return { ok: false, reason: noTable(error) ? 'no-table' : 'error', error }
  return { ok: true }
}
