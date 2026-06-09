-- CreateAdd translation columns to Event table
-- Migration for adding description_de and description_en columns

-- Step 1: Add new columns
ALTER TABLE events 
ADD COLUMN description_de TEXT DEFAULT '';

ALTER TABLE events 
ADD COLUMN description_en TEXT DEFAULT '';

-- Step 2: Migrate existing data (falls vorhanden)
-- This copies old description to description_de as fallback
UPDATE events 
SET description_de = COALESCE(description, '')
WHERE description_de = '';

-- Step 3: Optional - Drop old description column after verification
-- Uncomment this after you've verified everything works:
-- ALTER TABLE events DROP COLUMN description;

-- Done! The events table now supports bilingual descriptions.
