-- profiles: linked to auth.users, one per user
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  bio text,
  avatar_url text,
  github_url text,
  linkedin_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- projects: portfolio items
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  tech_stack text[],
  github_url text,
  live_url text,
  image_url text,
  featured boolean default false,
  sort_order integer default 0,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- skills: grouped by category
create table public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  level integer check (level between 1 and 5),
  sort_order integer default 0,
  created_at timestamptz default now() not null
);

-- contacts: messages sent via contact form
create table public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  read boolean default false,
  created_at timestamptz default now() not null
);

-- auto-update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger projects_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

-- RLS
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.skills enable row level security;
alter table public.contacts enable row level security;

-- profiles: user só vê/edita o próprio
create policy "profiles: select own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles: insert own" on public.profiles
  for insert with check (auth.uid() = id);

create policy "profiles: update own" on public.profiles
  for update using (auth.uid() = id);

-- projects: leitura pública, escrita autenticada
create policy "projects: public read" on public.projects
  for select using (true);

create policy "projects: auth write" on public.projects
  for all using (auth.role() = 'authenticated');

-- skills: leitura pública, escrita autenticada
create policy "skills: public read" on public.skills
  for select using (true);

create policy "skills: auth write" on public.skills
  for all using (auth.role() = 'authenticated');

-- contacts: qualquer um insere, só autenticado lê
create policy "contacts: public insert" on public.contacts
  for insert with check (true);

create policy "contacts: auth read" on public.contacts
  for select using (auth.role() = 'authenticated');

-- GRANTs explícitos (novo padrão Supabase: sem auto_expose_new_tables)
grant select on public.projects to anon, authenticated;
grant select on public.skills to anon, authenticated;
grant insert on public.contacts to anon, authenticated;
grant select on public.contacts to authenticated;
grant select, insert, update on public.profiles to authenticated;
