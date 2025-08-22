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
    - [Employee](#employee)
    - [Trains](#trains)
    - [Lines](#lines)
    - [Stations](#stations)
    - [Schedule](#schedule)
    - [Junction Tables](#junction-tables)
      - [Stations_Line](#stations_line)
      - [Trains_Schedule](#trains_schedule)
- [Relationships Explained](#relationships-explained)
- [Endpoints API Documentation](#endpoints-api-documentation)
  - [Employees Overview](#employees-overview-apiemployees)
  - [Trains Overview](#trains-overview-apitrains)
  - [Stations Overview](#stations-overview-apistations)
  - [Lines Overview](#lines-overview-apilines)
  - [Schedules Overview](#schedules-overview-apischedules)
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

## Setup

## Summary

## Authentication

### Authentication Process (JWT)

This API implements authentication using a **custom JWT implementation** (without `jsonwebtoken`).  
The flow is based on **two tokens**:

- `accessToken` — short-lived, used to access protected resources.
- `refreshToken` — long-lived, used to renew the `accessToken`.

---

### 1. Get a Token

Send a `POST` request to `/api/auth` with a JSON body containing the `id`.

### Example Request

```http
POST /api/auth
Content-Type: application/json

{
  "id": 242
}
```

### Example Response

```
{
  "id": 242,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5..."
}
```

The returned token must be used in the Authorization header for all protected routes.

## 2. Access Protected Routes

Any protected endpoint requires the accessToken in the Authorization header.

```
GET /api/users
Authorization: Bearer <accessToken>
```

### Example Request

```
POST /api/users
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5...
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
POST /auth/refresh
Content-Type: application/json

{
  "id": 242,
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5..."
}
```

## Error Handling

### Missing token → 401 Unauthorized

Invalid or expired token → 401 Unauthorized

Invalid request body (e.g., missing fields) → 400 Bad Request (after validation is implemented)

- ### Register

- ### Login
