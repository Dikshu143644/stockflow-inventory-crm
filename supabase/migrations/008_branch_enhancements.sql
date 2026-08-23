-- 008: Branch enhancements - Add branch_id to products table
-- Note: warehouses.branch_id and profiles.branch_id already exist in 001_initial_schema.sql

-- Add branch_id to products for branch-specific product management
ALTER TABLE products ADD COLUMN IF NOT EXISTS branch_id UUID REFERENCES branches(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_products_branch_id ON products(branch_id);
