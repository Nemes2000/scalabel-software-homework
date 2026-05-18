# Scalable softwares - A major homework

## About the project

This assignment is based on another assignment (which is stored in a private repository) that the four of us completed. I developed the part of the project contained in the **frontend** folder shown here on my own. In this assignment, I broke down the existing backend software into **microservices**.

## Overview of the original software (in this homework only the [Staff App Features](#staff-app-features) functions are available)

The purpose of the software is to digitize restaurant administration.
The following features will be developed:

- table management
- reservations
- inventory management
- ordering
- billing
- feedback
- loyalty points and coupons
- staff scheduling
- tips

These features will be available to

- admin (manager)
- waitstaff
- kitchen staff
- customers

These will be implemented using the following technologies

- Database: MSSQL
- Backend: ASP.NET C#
- Frontend
  - Staff: Angular
  - Customers: Ionic Angular

## User Management

Customer Portal:

- Customers can log in or register (name, email, password)

Staff Portal:

- Admin
  - Pre-added to the database (1 account)
  - Can create employee accounts with randomly generated passwords (displayed upon creation, then no longer visible)
- Employees
  - Log in with a pre-generated password, which they are required to change upon their first login

## Customer App Features

- Login, registration
- Profile:
  - Name, email, password, address, phone number; of these, the following can be edited: address, phone number
- Home page/Food:
  - Available dishes (name, image, price),
  - can be added to cart (quantity can be adjusted in the cart; 1 item is added by default when added to cart)
- coupons:
  - accumulated points are displayed; available coupons are listed
  - coupons can be added to cart
  - the coupon price is deducted from points when added to cart (this can be reversed later by deleting the coupon via the cart)
  - some coupons are only applicable for purchases above a certain amount
  - coupons provide either a percentage discount or a fixed amount discount
- cart:
  - Products added to the cart are listed in a single list
  - Product quantities can be adjusted (setting to 0 removes the item from the cart)
  - When the order button is pressed, the default address (set in the profile) is suggested, but a different address can be entered for a specific order; this is not saved,
  - Phone number works the same way as the address
  - After entering the address and phone number, the order can be placed; the app then navigates to the orders view
- Orders:
  - Active orders are at the top; their status is displayed
  - If the order is rejected and the user used a coupon, the loyalty points are returned to the account
  - Below active orders, previous, completed orders are displayed
  - Tip:
    - 4 options: none, 5%, 10%, 15%
  - Order date
  - Home delivery
  - For completed orders: generated invoice (PDF)
- Payment (not a view, not part of the software):
  - For orders placed via the app, to the courier (cash on delivery)
  - at the restaurant, to the server
- review:
  - a user can submit any number of reviews
  - a review consists of the following
    - 5 stars (ratings from 0 to 5)
    - text comment
    - selection of order type (dine-in/delivery)

## Staff App Features

- Log in/Log out
- Waiter views:
  - Reservations:
    - Create a reservation (table, time (from to), number of guests, deposit)
    - View reservation list (calendar view)
    - cancel reservation
  - walk-in orders:
    - take walk-in order (table, customer, dishes, total, tip)
    - walk-in order
- Manager views:
  - received orders:
    - accept/reject online orders
    - statuses: received (pending), accepted, being prepared, being delivered, delivered (completed)
    - an invoice is automatically generated when the status changes to "accepted"
  - tables:
    - adding and deleting tables
  - inventory:
    - list of ingredients available in the restaurant (with search)
      - Ingredient properties: name, quantity
    - Create, delete
    - Increase/decrease quantities
  - Staff view:
    - Manage staff accounts
    - Create and delete new accounts
      - Role (kitchen staff, server, customer)
  - Work Schedule View:
    - 2 tables: waitstaff, kitchen staff
      - Properties: employee, start time, end time
    - Set opening hours separately for each day of the week
    - Assign staff to time slots
    - Staffing coverage for opening, closing, and sufficient staff (minimum of 1-2 waiters and kitchen staff)
  - Food view
    - Create, delete
    - Food properties: name, image, price, description
  - Reviews
    - Listing
    - Average
  - Coupons
    - Create
      - Rules (see previous section), price (how many loyalty points it costs)
    - delete
  - tips view:
    - distributing tips by selecting an algorithm
      - everyone gets the same amount (proportional to working hours)
      - only those currently working (proportional to working hours)
