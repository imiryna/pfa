# Personal Finance Advisor

## Table of Contents

- [Overview](#overview)
- [Setup](#setup)
- [Summary](#summary)
- [Authentication](#authentication)
  - [Register](#register)
  - [Login](#login)
- [Relationships](#relationships)
  - [Entity Relationship Diagram](#entity-relationship-diagram)
  - [Detailed Table Information](#detailed-table-information)
    - [Users](#employee)
    - [Account](#trains)
    - [Category](#lines)
    - [transaction](#stations)
    - [Budget](#schedule)
    - [Junction Tables](#junction-tables)
      - [Stations_Line](#stations_line)
      - [Trains_Schedule](#trains_schedule)
- [Relationships Explained](#relationships-explained)
- [Endpoints API Documentation](#endpoints-api-documentation)
  - [Users Overview](#employees-overview-apiemployees)
  - [Account Overview](#trains-overview-apitrains)
  - [Category Overview](#stations-overview-apistations)
  - [Transaction Overview](#lines-overview-apilines)
  - [Budget Overview](#schedules-overview-apischedules)
- [License](#license)

## Overview

Personal Finance Advisor API is a backend service that provides core financial calculations and logic to assist users in making loan decisions.

The server exposes a RESTful API that allows clients (web or mobile) to:

- Submit user financial data (monthly salary, currency, interest rate, etc.)

Get calculated results:

- Maximum loan amount user can afford

- Net disposable income = salary − expenses
  → tells how much is left for savings, investments, or debt repayment.

- Savings rate = (net disposable income ÷ salary) × 100
  → shows how efficiently they save.

- Debt-to-income ratio (DTI)
  → total monthly debt ÷ salary; banks use this to judge creditworthiness.

- Estimated repayment plan

- Total interest paid over the selected loan term

- Goal-based savings plan
  → if they want $X in Y years, tell them how much to set aside monthly.

The application is designed to be modular, scalable, and secure, allowing easy integration with frontend applications or third-party services. It handles input validation, applies financial formulas, and ensures reliable data delivery via structured API endpoints.

## Setup development environment

### 1. Install dependencies

Install necessary libraries:

```
npm install pg dotenv
```

### 2. Configure database access

Create a .env file with your PostgreSQL connection details, e.g.:

```
PGHOST=localhost
PGPORT=5432
PGUSER=postgres
PGPASSWORD=yourpassword
PGDATABASE=fin_advisor
```

Make sure the database (`fin_advisor` in this example) already exists.

### 3. Initial data

Have your schema.sql file in the same folder. It should contain all statements `CREATE TYPE`, `CREATE TABLE`, `ALTER TABLE`, `CREATE INDEX`, etc.

### 4. Script for loading sample data

Create JS code for execute `.sql` file. For example `db.js`.

### 5. Run the setup script

From the terminal, execute:

```
node db.js
```

The `db.js` reads `schema.sql`, connects to Postgres using the credentials from .env, and executes the SQL to create all tables, types, and constraints.

If everything is configured correctly you’ll see:

```
Schema executed successfully
```

## Start project locally

1. Install Docker.
2. Clone this repository.
3. Run `docker compose up`. (or `docker compose -p pfa up -d `)
4. Access the API through http://localhost:3000.

## Summary

### Authentication Process (JWT)

This API implements authentication using a **custom JWT implementation** (without `jsonwebtoken`).  
The flow is based on **two tokens**:

- `accessToken` — short-lived, used to access protected resources.
- `refreshToken` — long-lived, used to renew the `accessToken`.

---

### 1. Get a Token

Send a `POST` request to `/api/auth` with a JSON body containing the `email`.

### Example Request

```http
POST /api/auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Example Response

```
{
  "user": { "id": 242, "email": "user@example.com" },
  "token": "<accessToken>",
  "refreshToken": "<refreshToken>"
}
```

The returned token must be used in the Authorization header for all protected routes.

```
Authorization: Bearer <accessToken>
```

## 2. Access Protected Routes

Any protected endpoint requires the accessToken in the Authorization header.

```
GET /api/users
Authorization: Bearer <accessToken>
```

### Example Request

```
POST /api/users
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "name": "Frida",
  "email": "frida@example.com"
}
```

### Example Response

```
{
  "data": "Frida"
}
```

## 3. Refresh Access Token

When the accessToken has expired, you can request a new one using the refreshToken.

### Example Reqest

```
POST /api/auth/refresh
Content-Type: application/json

{

  "refreshToken": "<newAccessToken>"
}
```

## 4.Logout

```
POST /api/auth/refresh

{

"message": "Logged out successfully"
}
```

## Error Handling

### Missing token → 401 Unauthorized

Invalid or expired token → 401 Unauthorized

Invalid request body (e.g., missing fields) → 400 Bad Request (after validation is implemented)

## Entity Relationship Diagram

![alt text](./fin_advisor%20-%20public.png)

## Entity Relationship Diagram

### Users

| Column    | Type    | Description                         |
| --------- | ------- | ----------------------------------- |
| id        | PK      | The unique identifier of the users. |
| email     | VARCHAR | The email of the users.             |
| password  | VARCHAR | The password of the users.          |
| full_name | VARCHAR | The name of the users.              |
| token     | VARCHAR | The token of the users.             |

### Account

| Column           | Type                                         | Description                             |
| ---------------- | -------------------------------------------- | --------------------------------------- |
| id               | PK                                           | The unique identifier of the account.   |
| user_id          | FK (INT)                                     | The users assigned to this account.     |
| account_type     | 'bank', 'cc', 'investment', 'cash', 'crypto' | The type of the account.                |
| institution_name | VARCHAR                                      | The name of institution of the account. |
| alias            | VARCHAR                                      | The description of the acoount.         |
| currency         | CHAR                                         | The currency of the account.            |
| balance          | NUMERIC                                      | The balance of the account.             |
| create_at        | TIMESTAMP                                    | The creating time of the account.       |

### Category

| Column        | Type                             | Description                              |
| ------------- | -------------------------------- | ---------------------------------------- |
| id            | PK                               | The unique identifier of the category.   |
| user_id       | FK (INT)                         | The users assigned to this category.     |
| name          | VARCHAR                          | The name of the account.                 |
| category_type | 'income', 'expenses', 'transfer' | The name of institution of the category. |

### Transaction

| Column      | Type      | Description                                |
| ----------- | --------- | ------------------------------------------ |
| id          | PK        | The unique identifier of the transaction.  |
| account_id  | FK        | The account assigned to this transaction.  |
| category_id | FK        | The category assigned to this transaction. |
| amount      | NUMERIC   | The amoun of the transaction.              |
| create_at   | TIMESTAMP | The creating time of the transaction.      |
| tags        | text[ ]   | The tegs of the account.                   |

### Budget

| Column      | Type                                               | Description                             |
| ----------- | -------------------------------------------------- | --------------------------------------- |
| id          | PK                                                 | The unique identifier of the budget.    |
| user_id     | FK (INT)                                           | The users assigned to this transaction. |
| category_id | FK                                                 | The category assigned to this budget.   |
| amount      | NUMERIC                                            | The amoun of the budget.                |
| period      | 'daily', 'weekly', 'biweekly', 'monthly', 'annual' | The type of period of the budget.       |
| start_date  | TIMESTAMP                                          | The start date of the budget formation. |
| end_date    | TIMESTAMP                                          | The end of the budget formation.        |

## Relationships Explained

- **Users → Accounts**: **One-to-Many**  
  A user may have many accounts, but each account belongs to one user.

- **Users → Categories**: **One-to-Many**  
  A user may create many categories, but each category belongs to one user (or exist as global, without `user_id`).

- **Users → Budgets**: **One-to-Many**  
  A user may set multiple budgets, but each budget belongs to one user.

- **Accounts → Transactions**: **One-to-Many**  
  An account may have many transactions, but each transaction is tied to one account.

- **Categories → Transactions**: **One-to-Many**  
  A category may classify many transactions, but each transaction has one category.

- **Categories → Budgets**: **One-to-Many**  
  A category may appear in many budgets, but each budget targets one category.

## Endpoints API Documentation

## Auth Overview (`/auth`)

| Method | Endpoint        | Description                                                                   | Success Code | Error Code |
| ------ | --------------- | ----------------------------------------------------------------------------- | ------------ | ---------- |
| POST   | `/auth/signin`  | Authenticate a user with email & password. Returns access and refresh tokens. | 200          | 401        |
| POST   | `/auth/refresh` | Provide a valid refresh token to get a new access token.                      | 200          | 401        |

---

## Users Overview (`/api/users`)

| Method | Endpoint          | Description       | Success Code | Error Code |
| ------ | ----------------- | ----------------- | ------------ | ---------- |
| GET    | `/api/users`      | Get all users     | 200          | —          |
| POST   | `/api/users`      | Create a new user | 201          | —          |
| GET    | `/api/users/{id}` | Get user by ID    | 200          | 404        |
| PATCH  | `/api/users/{id}` | Update user by ID | 200          | 404        |
| DELETE | `/api/users/{id}` | Delete user by ID | 200          | 404        |

---

## Accounts Overview (`/api/accounts`)

| Method | Endpoint             | Description          | Success Code | Error Code |
| ------ | -------------------- | -------------------- | ------------ | ---------- |
| GET    | `/api/accounts`      | Get all accounts     | 200          | —          |
| POST   | `/api/accounts`      | Create a new account | 201          | —          |
| GET    | `/api/accounts/{id}` | Get account by ID    | 200          | 404        |
| PATCH  | `/api/accounts/{id}` | Update account by ID | 200          | 404        |
| DELETE | `/api/accounts/{id}` | Delete account by ID | 200          | 404        |

---

## Categories Overview (`/api/categories`)

| Method | Endpoint               | Description           | Success Code | Error Code |
| ------ | ---------------------- | --------------------- | ------------ | ---------- |
| GET    | `/api/categories`      | Get all categories    | 200          | —          |
| POST   | `/api/categories`      | Create a new category | 201          | —          |
| GET    | `/api/categories/{id}` | Get category by ID    | 200          | 404        |
| PATCH  | `/api/categories/{id}` | Update category by ID | 200          | 404        |
| DELETE | `/api/categories/{id}` | Delete category by ID | 200          | 404        |

---

## Transactions Overview (`/api/transactions`)

| Method | Endpoint                 | Description           | Success Code | Error Code |
| ------ | ------------------------ | --------------------- | ------------ | ---------- |
| GET    | `/api/transactions`      | Get all transactions  | 200          | —          |
| GET    | `/api/transactions/{id}` | Get transaction by ID | 200          | 404        |

---

## Calculations Overview (`/api/calc`)

| Method | Endpoint                     | Description                                            | Success Code | Error Code |
| ------ | ---------------------------- | ------------------------------------------------------ | ------------ | ---------- |
| GET    | `/api/net_disposable_income` | Calculate Net Disposable Income (NDI) for current user | 200          | —          |
| GET    | `/api/saving_rate`           | Calculate Saving rate for current user                 | 200          | -          |
| GET    | `/api/maximum_loan`          | Calculate Maximum possible loan for current user       | 200          | -          |

---

# Run tests

Root directory of the project

```
npm run test
```

# Run lint

Root directory of the project

```
npm run lint
```
