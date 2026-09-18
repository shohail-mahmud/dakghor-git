-- Profiles
CREATE TABLE public.profiles (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'Correspondent',
  address TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Unique Dakghor address generator: DG-XXXX-XX
CREATE OR REPLACE FUNCTION public.generate_dakghor_address()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  chars TEXT := '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  candidate TEXT;
  part1 TEXT;
  part2 TEXT;
  i INT;
BEGIN
  LOOP
    part1 := '';
    part2 := '';
    FOR i IN 1..4 LOOP
      part1 := part1 || substr(chars, 1 + floor(random() * length(chars))::int, 1);
    END LOOP;
    FOR i IN 1..2 LOOP
      part2 := part2 || substr(chars, 1 + floor(random() * length(chars))::int, 1);
    END LOOP;
    candidate := 'DG-' || part1 || '-' || part2;
    EXIT WHEN NOT EXISTS (SELECT 1 FROM public.profiles WHERE address = candidate);
  END LOOP;
  RETURN candidate;
END;
$$;

-- Auto-create a profile with an issued address on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, address)
  VALUES (
    NEW.id,
    COALESCE(NULLIF(TRIM(NEW.raw_user_meta_data ->> 'name'), ''), 'Correspondent'),
    public.generate_dakghor_address()
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Recipient lookup: confirms an address exists and returns only the display name
CREATE OR REPLACE FUNCTION public.lookup_dakghor_address(_address TEXT)
RETURNS TABLE (address TEXT, display_name TEXT)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT p.address, p.name
  FROM public.profiles p
  WHERE p.address = UPPER(TRIM(_address))
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.lookup_dakghor_address(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.lookup_dakghor_address(TEXT) TO authenticated;