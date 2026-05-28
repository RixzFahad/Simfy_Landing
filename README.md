# Simfy_Landing

SimFy Group Employee Portal built with Google Apps Script + HTML/CSS/JavaScript.

## What this project includes
- Landing page with navigation and hero section
- Employee login form with:
  - Username
  - Password (with show/hide toggle)
  - Role selection (`admin`, `sales`, `operations`, `finance`)
- Role-based behavior after login:
  - `admin`: opens an admin dashboard
  - non-admin roles: shows a success/welcome screen

## Admin dashboard data sources
When an admin logs in, the app fetches and renders table data from these spreadsheet tabs:
- `Employees`
- `Plots`
- `PMS`
- `Sites`

Authentication is validated against the `Users` tab.

## Project files
- `Index.html`: frontend UI (landing page, login form, dashboard rendering)
- `code.js`: Google Apps Script backend (`doGet`, `loginUser`, and dashboard data fetchers)

## Google Apps Script setup
1. Create a new Apps Script project.
2. Add/update the files:
   - `code.js`
   - `Index.html` (copy the HTML from this repo)
3. Set `SHEET_ID` in `code.js` to your Google Sheet ID.
4. Ensure the following tabs exist in that sheet:
   - `Users` (for login validation)
   - `Employees`, `Plots`, `PMS`, `Sites` (for admin dashboard tables)
5. Deploy as a web app and grant appropriate access permissions.

## Expected `Users` sheet structure
The login logic checks these columns (starting from row 2):
- Column A: Username
- Column B: Password
- Column C: Role

Values are matched against the submitted login form (`username`, `password`, `role`).
