-- Enable UUID generator
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DO $$ 
BEGIN 
IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'a_type') THEN 
  CREATE TYPE a_type AS ENUM ('bank','cc','investment','cash','crypto'); 
    END IF; 
IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'c_type') THEN 
  CREATE TYPE c_type AS ENUM ('income','expenses','transfer'); 
    END IF; 
IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'b_period') THEN 
  CREATE TYPE b_period AS ENUM ('daily','weekly','biweekly','monthly','annual'); 
    END IF; 
END$$;

-- Create Users table
CREATE TABLE IF NOT EXISTS users(
	id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	email varchar(50) NOT NULL UNIQUE,
	password varchar(60) NOT NULL,
	full_name varchar(255)
);

-- Create Account table
create table if not exists account(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE, 
  account_type a_type NOT NULL,
  institution_name varchar(100) NOT NULL,
  alias varchar(60),
  currency char(3) NOT NULL,
  balance numeric(12,2) NOT NULL,
  create_at timestamp NOT NULL DEFAULT now(),
  update_at timestamp NOT NULL DEFAULT now()
);

-- Create categories
CREATE TABLE IF NOT EXISTS category (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name varchar(60) NOT NULL,
    category_type c_type NOT NULL
);

-- Create Transactions 
CREATE TABLE IF NOT EXISTS transaction (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id uuid NOT NULL REFERENCES account(id) ON DELETE CASCADE,
    category_id uuid REFERENCES category(id) ON DELETE SET NULL,
    amount numeric(12,2) NOT NULL,
    create_at timestamp NOT NULL DEFAULT now(),
    tags text[]
);
 
-- Create Budgets
CREATE TABLE IF NOT EXISTS budget (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id uuid REFERENCES category(id) ON DELETE SET NULL,
    amount numeric(12,2) NOT NULL,
    period b_period NOT NULL,
    start_date timestamp NOT NULL,
    end_date timestamp NOT NULL
);

-- Useful indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_account_user_id     ON account(user_id);
CREATE INDEX IF NOT EXISTS idx_category_user_id    ON category(user_id);
CREATE INDEX IF NOT EXISTS idx_transaction_user_id ON transaction(user_id);
CREATE INDEX IF NOT EXISTS idx_transaction_account ON transaction(account_id);
CREATE INDEX IF NOT EXISTS idx_budget_user_id      ON budget(user_id);