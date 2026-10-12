-- Public can read everything; only logged-in (admin) users can write.
-- Run this in the Supabase SQL Editor.

CREATE POLICY "Public can read podcast episodes" ON public.podcast_episodes
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Authenticated can write podcast episodes" ON public.podcast_episodes
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public can read blog posts" ON public.blog_posts
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Authenticated can write blog posts" ON public.blog_posts
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public can read partners" ON public.partners
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Authenticated can write partners" ON public.partners
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
