/*
  # Create media table for Mother's Day website

  1. New Tables
    - `media`
      - `id` (uuid, primary key)
      - `type` (text: 'photo' or 'video')
      - `url` (text)
      - `caption` (text, nullable)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `media` table
    - Add policy for public read access (for displaying on website)
*/

CREATE TABLE IF NOT EXISTS media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('photo', 'video')),
  url text NOT NULL,
  caption text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read media"
  ON media
  FOR SELECT
  USING (true);
