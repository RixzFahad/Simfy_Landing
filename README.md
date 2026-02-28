# SimFy Group Employee Portal

A responsive employee portal for SimFy Group built with HTML, CSS, and JavaScript, powered by Google Apps Script and Google Sheets.

## Features

- **Landing Page** — Hero section with stats badges, Poppins font, and a blue gradient background with parallax zoom animation
- **Role-Based Login** — Secure authentication supporting Admin, Sales, Operations, and Finance roles with password visibility toggle
- **Admin Dashboard** — Data tables for Employee Details, Plots, PMS History, and Sites, populated dynamically from Google Sheets
- **Responsive Design** — Mobile-friendly layout with adaptive stats, navigation, and footer
- **Sticky Navigation** — Persistent top nav with shadow and brand logo

## Tech Stack

- **Frontend:** HTML5, CSS3 (custom properties, flexbox, grid), vanilla JavaScript
- **Backend:** Google Apps Script (`code.js`)
- **Data:** Google Sheets (tabs: `Users`, `Employees`, `Plots`, `PMS`, `Sites`)
- **Icons:** Font Awesome 6.5
- **Fonts:** Google Fonts (Poppins)

## File Structure

- `Index.html` — Complete frontend (HTML + embedded CSS + JS)
- `code.js` — Google Apps Script backend (authentication, data fetching)
- `README.md` — This file

## Deployment

1. Open [Google Apps Script](https://script.google.com) and create a new project.
2. Paste the contents of `code.js` into the default script file.
3. Create an HTML file named `Index` and paste the contents of `Index.html`.
4. Deploy as a **Web App** (Execute as: Me, Access: Anyone).
5. Ensure the linked Google Sheet (`SHEET_ID` in `code.js`) contains the following tabs:
   - `Users` — columns: username, password, role
   - `Employees` — employee detail records
   - `Plots` — plot/land detail records
   - `PMS` — PMS history records
   - `Sites` — site records

## User Roles

- **Admin** — Full access to the admin dashboard with all data tables.
- **Sales / Operations / Finance** — Authenticated employee view (dashboard coming soon).

## How It Works

1. The user navigates to the deployed Web App URL.
2. They enter their username, password, and select a role on the login form.
3. Credentials are validated against the `Users` sheet via `loginUser()` in `code.js`.
4. On success:
   - **Admin** users see the admin dashboard with data tables loaded from Sheets.
   - **Employee** users see a welcome message (employee dashboard is planned).
5. Logout reloads the page to reset the session.

## License

Internal use — SimFy Group.
