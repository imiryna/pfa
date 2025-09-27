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
	full_name varchar(255),
  token varchar(148)
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
    user_id uuid REFERENCES users(id) ON DELETE CASCADE,
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
CREATE INDEX IF NOT EXISTS idx_transaction_account ON transaction(account_id);
CREATE INDEX IF NOT EXISTS idx_budget_user_id      ON budget(user_id);

-- === USERS ===
INSERT INTO users (id, email, password, full_name)
  VALUES
    ('ae75ffdb-f9cc-4ca5-ac99-e1437746b066','alice@example.com', '$2b$10$wNG0/1Jcosfm/V6H54bAXe58q9RetgmlCmnjriXKOTDmx8iskEz1q', 'Alice Kowalska'),
    ('a2686efc-b89d-40ef-b111-663ce7b64324', 'bob@example.com',   '$2b$10$wNG0/1Jcosfm/V6H54bAXe58q9RetgmlCmnjriXKOTDmx8iskEz1q', 'Bob Nowak'),
    ('1a42ec4e-e3f0-476f-a13b-891dc9986b93', 'carol@example.com', '$2b$10$wNG0/1Jcosfm/V6H54bAXe58q9RetgmlCmnjriXKOTDmx8iskEz1q', 'Carol Wisniewska');

-- === ACCOUNTS ===
-- Alice
INSERT INTO account (id, user_id, account_type, institution_name, alias, currency, balance)
VALUES
  ('ca9cb06c-7b74-4269-896a-93247b023962','ae75ffdb-f9cc-4ca5-ac99-e1437746b066', 'bank', 'PKO Bank', 'Main Account', 'PLN', 10000.00),
  ('9cba6a6e-e466-456c-b605-c86100289482','ae75ffdb-f9cc-4ca5-ac99-e1437746b066', 'cc', 'mBank', 'Credit Card', 'PLN', -2000.00);

-- Bob
INSERT INTO account (id, user_id, account_type, institution_name, alias, currency, balance)
VALUES
  ('e4b22bf7-3cd9-439b-8441-635c8975f4d4', 'a2686efc-b89d-40ef-b111-663ce7b64324', 'bank', 'ING Bank', 'Main Account', 'PLN', 8000.00),
  ('b35fd8c3-4c10-4a33-95dd-db96b42d32a3', 'a2686efc-b89d-40ef-b111-663ce7b64324', 'cc', 'Alior', 'Credit Card', 'PLN', -1500.00);

-- Carol
INSERT INTO account (id, user_id, account_type, institution_name, alias, currency, balance)
VALUES
  ('a9c36787-5c20-4cdd-bce5-2aaa12006bbe', '1a42ec4e-e3f0-476f-a13b-891dc9986b93','bank', 'Santander', 'Main Account', 'PLN', 12000.00),
  ('acbad479-1f5d-426a-bcd5-b01f18a94fd3', '1a42ec4e-e3f0-476f-a13b-891dc9986b93', 'cc', 'Millennium', 'Credit Card', 'PLN', -1000.00);

-- === CATEGORIES ===
-- Alice personal
INSERT INTO category (id, user_id, name, category_type)
VALUES 
  ('64ae21e6-b0e2-4585-9157-338fd7fe8714', 'ae75ffdb-f9cc-4ca5-ac99-e1437746b066', 'Salary', 'income'),
  ('d6082908-4706-4cc3-8bd2-0b60ce2ae3c4', 'ae75ffdb-f9cc-4ca5-ac99-e1437746b066', 'Groceries', 'expenses');

-- Bob personal
INSERT INTO category (id, user_id, name, category_type)
VALUES 
  ('71fdc7b9-4a50-488c-86f3-c83e6c1b42a6', 'a2686efc-b89d-40ef-b111-663ce7b64324', 'Salary', 'income'),
  ('fa7b75df-4ef2-469c-8dbc-8179888a9f3e', 'a2686efc-b89d-40ef-b111-663ce7b64324', 'Utilities', 'expenses');

-- Carol personal
INSERT INTO category (id, user_id, name, category_type)
VALUES 
  ('574e8f6c-d0de-44b5-91b9-768a7407c105', '1a42ec4e-e3f0-476f-a13b-891dc9986b93', 'Salary', 'income'),
  ('bf538bf6-124c-4a52-84c1-630405076650', '1a42ec4e-e3f0-476f-a13b-891dc9986b93', 'Rent', 'expenses');

-- Global/free (no user_id)
INSERT INTO category (id, user_id, name, category_type)
VALUES 
  ('c622b80d-b170-48dc-8e0f-98fd35093b50', NULL, 'Investment Income', 'income'),
  ('a19f3e5d-7f21-49e7-8c0b-b7868288e907', NULL, 'Dining Out', 'expenses'),
  ('c0fc1178-4fd8-4fc9-a85c-9b59ddc15a8d', NULL, 'Transfer In', 'transfer'),
  ('6e620734-bdd5-4342-b66a-ccdde42018dc', NULL, 'Transfer Out', 'transfer');


-- 10 transactions for Alice main account
INSERT INTO transaction (account_id, category_id, amount)
VALUES
  ('ca9cb06c-7b74-4269-896a-93247b023962', '64ae21e6-b0e2-4585-9157-338fd7fe8714', 5000.00),
  ('ca9cb06c-7b74-4269-896a-93247b023962', 'd6082908-4706-4cc3-8bd2-0b60ce2ae3c4', -300.00),
  ('ca9cb06c-7b74-4269-896a-93247b023962', 'd6082908-4706-4cc3-8bd2-0b60ce2ae3c4', -150.00),
  ('ca9cb06c-7b74-4269-896a-93247b023962', '64ae21e6-b0e2-4585-9157-338fd7fe8714', 5000.00),
  ('ca9cb06c-7b74-4269-896a-93247b023962', 'd6082908-4706-4cc3-8bd2-0b60ce2ae3c4', -200.00),
  ('ca9cb06c-7b74-4269-896a-93247b023962', 'd6082908-4706-4cc3-8bd2-0b60ce2ae3c4', -100.00),
  ('ca9cb06c-7b74-4269-896a-93247b023962', 'd6082908-4706-4cc3-8bd2-0b60ce2ae3c4', -50.00),
  ('ca9cb06c-7b74-4269-896a-93247b023962', '64ae21e6-b0e2-4585-9157-338fd7fe8714', 5000.00),
  ('ca9cb06c-7b74-4269-896a-93247b023962', 'd6082908-4706-4cc3-8bd2-0b60ce2ae3c4', -350.00),
  ('ca9cb06c-7b74-4269-896a-93247b023962', 'd6082908-4706-4cc3-8bd2-0b60ce2ae3c4', -400.00);

-- 10 transactions for Bob main account 
INSERT INTO transaction (account_id, category_id, amount)
VALUES
  ('e4b22bf7-3cd9-439b-8441-635c8975f4d4', '71fdc7b9-4a50-488c-86f3-c83e6c1b42a6', 3000.00),
  ('e4b22bf7-3cd9-439b-8441-635c8975f4d4', 'fa7b75df-4ef2-469c-8dbc-8179888a9f3e', -200.00),
  ('e4b22bf7-3cd9-439b-8441-635c8975f4d4', 'fa7b75df-4ef2-469c-8dbc-8179888a9f3e', -75.00),
  ('e4b22bf7-3cd9-439b-8441-635c8975f4d4', '71fdc7b9-4a50-488c-86f3-c83e6c1b42a6', 3000.00),
  ('e4b22bf7-3cd9-439b-8441-635c8975f4d4', 'fa7b75df-4ef2-469c-8dbc-8179888a9f3e', -160.00),
  ('e4b22bf7-3cd9-439b-8441-635c8975f4d4', 'fa7b75df-4ef2-469c-8dbc-8179888a9f3e', -120.00),
  ('e4b22bf7-3cd9-439b-8441-635c8975f4d4', 'fa7b75df-4ef2-469c-8dbc-8179888a9f3e', -80.00),
  ('e4b22bf7-3cd9-439b-8441-635c8975f4d4', '71fdc7b9-4a50-488c-86f3-c83e6c1b42a6', 3000.00),
  ('e4b22bf7-3cd9-439b-8441-635c8975f4d4', 'fa7b75df-4ef2-469c-8dbc-8179888a9f3e', -380.00),
  ('e4b22bf7-3cd9-439b-8441-635c8975f4d4', 'fa7b75df-4ef2-469c-8dbc-8179888a9f3e', -415.00);

-- 10 transactions for Carol main account
INSERT INTO transaction (account_id, category_id, amount)
VALUES
  ('a9c36787-5c20-4cdd-bce5-2aaa12006bbe', '574e8f6c-d0de-44b5-91b9-768a7407c105', 8000.00),
  ('a9c36787-5c20-4cdd-bce5-2aaa12006bbe', 'bf538bf6-124c-4a52-84c1-630405076650', -500.00),
  ('a9c36787-5c20-4cdd-bce5-2aaa12006bbe', 'bf538bf6-124c-4a52-84c1-630405076650', -250.00),
  ('a9c36787-5c20-4cdd-bce5-2aaa12006bbe', '574e8f6c-d0de-44b5-91b9-768a7407c105', 8000.00),
  ('a9c36787-5c20-4cdd-bce5-2aaa12006bbe', 'bf538bf6-124c-4a52-84c1-630405076650', -400.00),
  ('a9c36787-5c20-4cdd-bce5-2aaa12006bbe', 'bf538bf6-124c-4a52-84c1-630405076650', -300.00),
  ('a9c36787-5c20-4cdd-bce5-2aaa12006bbe', 'bf538bf6-124c-4a52-84c1-630405076650', -150.00),
  ('a9c36787-5c20-4cdd-bce5-2aaa12006bbe', '574e8f6c-d0de-44b5-91b9-768a7407c105', 8000.00),
  ('a9c36787-5c20-4cdd-bce5-2aaa12006bbe', 'bf538bf6-124c-4a52-84c1-630405076650', -1350.00),
  ('a9c36787-5c20-4cdd-bce5-2aaa12006bbe', 'bf538bf6-124c-4a52-84c1-630405076650', -1400.00);

-- Budgets for Alice
INSERT INTO budget (id, user_id, category_id, amount, period, start_date, end_date)
VALUES
  ('09e69412-70e7-4b09-9733-0f3db66af943', 'ae75ffdb-f9cc-4ca5-ac99-e1437746b066', 'd6082908-4706-4cc3-8bd2-0b60ce2ae3c4', 2000.00, 'monthly', '2024-09-01', '2024-09-30'),
  ('3e062430-7599-457d-b3d9-c5357c70cf6b', 'ae75ffdb-f9cc-4ca5-ac99-e1437746b066', '64ae21e6-b0e2-4585-9157-338fd7fe8714',    4000.00,    'monthly', '2024-09-01', '2024-09-30');

-- Budgets for Bob
INSERT INTO budget (id, user_id, category_id, amount, period, start_date, end_date)
VALUES
  ('406379be-1678-4c68-9d07-0451fb186b94', 'a2686efc-b89d-40ef-b111-663ce7b64324', 'fa7b75df-4ef2-469c-8dbc-8179888a9f3e', 1500.00, 'monthly', '2024-09-01', '2024-09-30'),
  ('df0de0e1-0ba5-4264-b685-de7a3ff87674', 'a2686efc-b89d-40ef-b111-663ce7b64324', '71fdc7b9-4a50-488c-86f3-c83e6c1b42a6',    5000.00, 'monthly', '2024-09-01', '2024-09-30');

-- Budgets for Carol
INSERT INTO budget (id, user_id, category_id, amount, period, start_date, end_date)
VALUES
  ('e6a2d116-8387-40ff-9131-7a305c8cb038', '1a42ec4e-e3f0-476f-a13b-891dc9986b93', 'bf538bf6-124c-4a52-84c1-630405076650',      2500.00, 'monthly', '2024-09-01', '2024-09-30'),
  ('ce658233-2f46-4fba-b1bd-22b53f43d928', '1a42ec4e-e3f0-476f-a13b-891dc9986b93', '574e8f6c-d0de-44b5-91b9-768a7407c105',    7000.00,    'monthly', '2024-09-01', '2024-09-30');