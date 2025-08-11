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

- ### Register

- ### Login
