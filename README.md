# Simfy_Landing

SimFy Group Employee Portal built with Google Apps Script and an HTML/CSS/JS frontend.

## Overview
This project serves an employee login portal with role-based behavior:
- **Admin** users are redirected to an admin dashboard with multiple data tables.
- **Employee** users receive a login success screen (dashboard placeholder).

The app reads credentials and dashboard data from Google Sheets.

## Project Structure
- `Index.html` — frontend UI (landing page, login form, admin dashboard UI, client-side handlers)
- `code.js` — Google Apps Script backend (`doGet`, login validation, sheet data fetchers)

## Features
- Employee login form with:
  - Username
  - Password (with show/hide toggle)
  - Role selection
- Role-aware login response:
  - Admin view with tables for Employees, Plots, PMS History, and Sites
  - Employee success message screen
- Spreadsheet-backed authentication and data retrieval

## Google Sheets Requirements
`code.js` expects a spreadsheet with:
- Spreadsheet ID set in `SHEET_ID`
- `Users` sheet (for authentication) with columns:
  1. Username
  2. Password
  3. Role
- Additional sheets for admin data:
  - `Employees`
  - `Plots`
  - `PMS`
  - `Sites`

## Backend Functions
- `doGet(e)` — serves `Index.html` as the web app entry page.
- `loginUser(data)` — validates username/password/role against the `Users` sheet.
- `getEmployeeDetails()` — returns `Employees` sheet data.
- `getPlotsDetails()` — returns `Plots` sheet data.
- `getPMSHistory()` — returns `PMS` sheet data.
- `getSites()` — returns `Sites` sheet data.

## Deployment (Google Apps Script)
1. Create an Apps Script project.
2. Add `Index.html` and `code.js`.
3. Update `SHEET_ID` in `code.js` if needed.
4. Deploy as a web app.
5. Ensure deployment has access to read the configured spreadsheet.
