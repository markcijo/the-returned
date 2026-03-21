-- Allow anyone to count crossings (for the live counter on the home page)
CREATE POLICY "Anyone can count crossings"
  ON crossings FOR SELECT
  USING (true);
