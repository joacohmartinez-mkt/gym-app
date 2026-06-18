-- ───────────────────────────────────────────────────────────────────────────
-- Setup de Supabase para la sincronización de la app de entrenamiento.
-- Pegá TODO esto en: Supabase → SQL Editor → New query → Run.
-- (Usá el MISMO proyecto que la app de Buenos Aires; esto solo agrega una tabla.)
-- ───────────────────────────────────────────────────────────────────────────

-- Una fila por "código de sincronización". `data` guarda todo el estado de la app
-- (config + historial + ediciones de rutina) como JSON.
create table if not exists public.gym_state (
  code       text primary key,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Seguridad a nivel de fila. App personal: se permite leer/escribir con la clave
-- anon (pública). La privacidad la da que el `code` sea difícil de adivinar.
alter table public.gym_state enable row level security;

drop policy if exists "gym lectura"  on public.gym_state;
drop policy if exists "gym alta"      on public.gym_state;
drop policy if exists "gym update"    on public.gym_state;

create policy "gym lectura" on public.gym_state
  for select using (true);

create policy "gym alta" on public.gym_state
  for insert with check (true);

create policy "gym update" on public.gym_state
  for update using (true) with check (true);
