-- Crossings
CREATE TABLE crossings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  crossed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  vow_text TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE crossings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own crossings" ON crossings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own crossings" ON crossings FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Checkins
CREATE TABLE checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  week_of DATE NOT NULL,
  drift_text TEXT NOT NULL,
  return_text TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE checkins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own checkins" ON checkins FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own checkins" ON checkins FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Night Watch
CREATE TABLE night_watch (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  drifted TEXT NOT NULL,
  repair TEXT NOT NULL,
  light_gave TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE night_watch ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own night_watch" ON night_watch FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own night_watch" ON night_watch FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Pillar Logs
CREATE TABLE pillar_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  pillar SMALLINT NOT NULL CHECK (pillar BETWEEN 1 AND 7),
  rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, date, pillar)
);

ALTER TABLE pillar_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own pillar_logs" ON pillar_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can upsert own pillar_logs" ON pillar_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own pillar_logs" ON pillar_logs FOR UPDATE USING (auth.uid() = user_id);

-- Fast Logs
CREATE TABLE fast_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  fast_type TEXT NOT NULL CHECK (fast_type IN ('mouth', 'noise', 'comfort')),
  date DATE NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, date, fast_type)
);

ALTER TABLE fast_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own fast_logs" ON fast_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can upsert own fast_logs" ON fast_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own fast_logs" ON fast_logs FOR UPDATE USING (auth.uid() = user_id);

-- Reading Progress
CREATE TABLE reading_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  book TEXT NOT NULL CHECK (book IN ('one', 'two')),
  chapter SMALLINT NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, book, chapter)
);

ALTER TABLE reading_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own reading_progress" ON reading_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can upsert own reading_progress" ON reading_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reading_progress" ON reading_progress FOR UPDATE USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_crossings_user_id ON crossings(user_id);
CREATE INDEX idx_checkins_user_id ON checkins(user_id);
CREATE INDEX idx_night_watch_user_id ON night_watch(user_id);
CREATE INDEX idx_pillar_logs_user_date ON pillar_logs(user_id, date);
CREATE INDEX idx_fast_logs_user_date ON fast_logs(user_id, date);
CREATE INDEX idx_reading_progress_user ON reading_progress(user_id);
