ALTER TABLE transactions ADD COLUMN IF NOT EXISTS pay_address VARCHAR(50) ;
ALTER TABLE transactions ADD COLUMN IF NOT EXISTS pay_amount NUMERIC ;
ALTER TABLE transactions ADD COLUMN IF NOT EXISTS pay_currency VARCHAR(50) ;
