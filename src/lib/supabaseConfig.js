// Config de Supabase — MISMO proyecto que la app de Buenos Aires (solo agrega la
// tabla gym_state, no toca lo de BA). La clave "anon/publishable" es pública por
// diseño (queda en el JS del sitio); la seguridad la da el RLS de la tabla.
//
// Para activar la sincronización en la nube falta UN paso tuyo: correr el SQL de
// `supabase-setup.sql` en Supabase → SQL Editor (crea la tabla gym_state).
// Mientras tanto, la app funciona igual con localStorage (solo en este dispositivo).

export const SUPABASE_URL = 'https://hhyvuywboqkbqjbturgf.supabase.co'
export const SUPABASE_ANON_KEY = 'sb_publishable_aZ3YFSzj-KbsrT2R8DMaHw_-RaPxIGT'
