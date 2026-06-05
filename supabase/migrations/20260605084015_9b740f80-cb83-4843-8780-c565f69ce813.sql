
-- 1. Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users read own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- 2. Lock down writes — keep public read on storefront tables

-- products
DROP POLICY IF EXISTS "public write products" ON public.products;
CREATE POLICY "admin manage products" ON public.products
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- categories
DROP POLICY IF EXISTS "public write categories" ON public.categories;
CREATE POLICY "admin manage categories" ON public.categories
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- subcategories
DROP POLICY IF EXISTS "public write subcategories" ON public.subcategories;
CREATE POLICY "admin manage subcategories" ON public.subcategories
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- hero_slides
DROP POLICY IF EXISTS "public write hero_slides" ON public.hero_slides;
CREATE POLICY "admin manage hero_slides" ON public.hero_slides
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- app_settings
DROP POLICY IF EXISTS "public write app_settings" ON public.app_settings;
CREATE POLICY "admin manage app_settings" ON public.app_settings
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- facebook_posts — admin only (internal data, no public read)
DROP POLICY IF EXISTS "public write facebook_posts" ON public.facebook_posts;
DROP POLICY IF EXISTS "public read facebook_posts" ON public.facebook_posts;
CREATE POLICY "admin manage facebook_posts" ON public.facebook_posts
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- orders — anon can place (INSERT), admin manages the rest. Drop public read of customer data.
DROP POLICY IF EXISTS "public write orders" ON public.orders;
DROP POLICY IF EXISTS "public read orders" ON public.orders;
CREATE POLICY "anyone can place orders" ON public.orders
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);
CREATE POLICY "admin manage orders" ON public.orders
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
