// Config de Supabase — proyecto exclusivo para gym-app (okxqbtqajbqwvsiahdin).
// La clave "anon/publishable" es pública por diseño (queda en el JS del sitio);
// la seguridad la da el RLS de la tabla gym_state.
//
// Para activar la sincronización en la nube falta UN paso tuyo: correr el SQL de
// `supabase-setup.sql` en Supabase → SQL Editor (crea la tabla gym_state).
// Mientras tanto, la app funciona igual con localStorage (solo en este dispositivo).

export const SUPABASE_URL = 'https://okxqbtqajbqwvsiahdin.supabase.co'
export const SUPABASE_ANON_KEY = 'sb_publishable_y7XyAWTYLtLD7NRsRLTaHA_fhKH6hBD'
