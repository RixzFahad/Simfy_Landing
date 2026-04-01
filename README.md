# SimFy Group Employee Portal

A Google Apps Script web application that serves as an internal employee portal for **SimFy Group**. It provides role-based login, an admin dashboard, and data views backed by Google Sheets.

## Features

- **Secure Login** — Employees authenticate with username, password, and role selection
- **Role-Based Access** — Four roles supported: Admin, Sales, Operations, Finance
- **Admin Dashboard** — Admins see live data tables pulled from Google Sheets:
  - Employee Details
  - Plots Details
  - PMS History
  - Sites
- **Password Visibility Toggle** — Show/hide password on the login form
- **Responsive Design** — Works on desktop and mobile
- **Animated Hero Section** — Branded landing page with stats highlights

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript (served via `HtmlService`) |
| Backend | Google Apps Script |
| Database | Google Sheets |
| Fonts / Icons | Google Fonts (Poppins), Font Awesome 6 |

## Project Structure

```
Simfy_Landing/
├── Index.html   # Frontend — landing page, login form, and admin dashboard UI
└── code.js      # Backend — Google Apps Script server-side functions
```

## Google Sheets Structure

The script reads from a single Google Spreadsheet (`SHEET_ID` in `code.js`). The following sheets must exist:

| Sheet Name  | Purpose                             |
|-------------|-------------------------------------|
| `Users`     | Employee credentials (username, password, role in columns A–C) |
| `Employees` | Employee records displayed in Admin Dashboard |
| `Plots`     | Plot/property records |
| `PMS`       | PMS (Property Management System) history |
| `Sites`     | Site details |

**Users sheet columns (row 1 = header):**
- Column A: `username`
- Column B: `password`
- Column C: `role` (one of `admin`, `employee-sales`, `employee-ops`, `employee-finance`)

## Deployment

### Prerequisites

- A Google account with access to Google Apps Script
- The Google Spreadsheet with the sheets listed above

### Steps

1. **Open Google Apps Script** — go to [script.google.com](https://script.google.com) and create a new project.
2. **Copy files** — paste the contents of `code.js` into the default `Code.gs` file, and create an `Index.html` file with the contents of `Index.html`.
3. **Set the Spreadsheet ID** — update `SHEET_ID` in `code.js` to match your Google Sheets file ID:
   ```js
   const SHEET_ID = 'your-spreadsheet-id-here';
   ```
4. **Deploy as Web App**:
   - Click **Deploy → New deployment**
   - Select type: **Web app**
   - Set *Execute as*: `Me`
   - Set *Who has access*: `Anyone` (or restrict as needed)
   - Click **Deploy** and copy the web app URL
5. **Share the URL** with employees to access the portal.

## Backend API Functions

These server-side functions are called from the frontend via `google.script.run`:

| Function | Description |
|---|---|
| `doGet(e)` | Entry point — serves `Index.html` as the web app |
| `loginUser(data)` | Validates `{username, password, role}` against the `Users` sheet. Returns `{success, username, role, message}` on success or throws on failure |
| `getEmployeeDetails()` | Returns all rows from the `Employees` sheet as a 2D array |
| `getPlotsDetails()` | Returns all rows from the `Plots` sheet |
| `getPMSHistory()` | Returns all rows from the `PMS` sheet |
| `getSites()` | Returns all rows from the `Sites` sheet |

## Access Roles

| Role | Login Value | Dashboard |
|---|---|---|
| Admin | `admin` | Full admin dashboard with all data tables |
| Sales | `employee-sales` | Welcome screen (employee dashboard coming soon) |
| Operations | `employee-ops` | Welcome screen (employee dashboard coming soon) |
| Finance | `employee-finance` | Welcome screen (employee dashboard coming soon) |

## Notes

- Passwords are stored in plain text in the Google Sheet. For production use, consider a more secure authentication approach.
- The employee dashboard for non-admin roles is a placeholder and is planned for future development.
- Logout is handled by reloading the page (`location.reload()`).
