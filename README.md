# SimFy Group Employee Portal

A Google Apps Script–powered internal employee portal for **SimFy Group**. It provides role-based login, an admin dashboard with live data tables, and a responsive, modern UI served directly from Google Apps Script.

## Overview

| Layer | Technology |
|-------|------------|
| Frontend | HTML/CSS/JS (`Index.html`), served via `HtmlService` |
| Backend | Google Apps Script (`code.js`) |
| Data store | Google Sheets (one spreadsheet, multiple sheets) |

The web app is deployed as a Google Apps Script Web App. The frontend communicates with the backend through `google.script.run` async calls.

## Features

- **Role-based login** — Employees select one of four roles (Admin, Sales, Operations, Finance) at login time. Credentials are validated against a `Users` sheet in the linked Google Spreadsheet.
- **Admin dashboard** — Admins see a live dashboard with four data tables populated from separate sheets:
  - **Employee Details** (`Employees` sheet)
  - **Plots Details** (`Plots` sheet)
  - **PMS History** (`PMS` sheet)
  - **Sites** (`Sites` sheet)
- **Employee welcome screen** — Non-admin employees see a personalised welcome message after login (full employee dashboard is planned).
- **Responsive UI** — Mobile-friendly layout using CSS Grid and Flexbox, with a Poppins font and a clean blue accent palette.
- **Password visibility toggle** — Show/hide password field in the login form.
- **Logout** — Reloads the page to clear session state.

## Google Spreadsheet Schema

### `Users` sheet (authentication)

| Column A | Column B | Column C |
|----------|----------|----------|
| username | password | role |

Roles must match one of: `admin`, `employee-sales`, `employee-ops`, `employee-finance`.

### `Employees`, `Plots`, `PMS`, `Sites` sheets

Each sheet is expected to have **column headers in row 1**, followed by data rows. The admin dashboard renders these dynamically — no fixed schema is required.

## Setup & Deployment

### Prerequisites

- A Google account with access to Google Drive and Google Sheets.
- The target Google Spreadsheet created and populated (see schema above).

### Steps

1. **Create the spreadsheet** — note its ID from the URL (`https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit`).

2. **Open Apps Script** — Go to [script.google.com](https://script.google.com) and create a new project.

3. **Add the files**
   - Rename the default `Code.gs` script file and paste the contents of `code.js`.
   - Create a new HTML file named **`Index`** (without extension, as required by `HtmlService`) and paste the contents of `Index.html`.

4. **Set the Spreadsheet ID** — In `code.js`, update the constant:
   ```js
   const SHEET_ID = '<your-spreadsheet-id>';
   ```

5. **Deploy as a Web App**
   - Click **Deploy → New deployment**.
   - Choose type **Web app**.
   - Set *Execute as*: **Me** (or a service account).
   - Set *Who has access*: **Anyone within [your organisation]** (or as appropriate).
   - Copy the deployment URL and share it with employees.

6. **Re-deploy after changes** — Every code change requires a new deployment version. Click **Deploy → Manage deployments → Edit** and increment the version.

## Backend API (Google Apps Script functions)

All functions below are called from the frontend via `google.script.run`.

### `doGet(e)`
Serves the `Index.html` frontend as a web app response.

### `loginUser(data)`
Authenticates a user against the `Users` sheet.

**Parameters** (`data` object):

| Field | Type | Description |
|-------|------|-------------|
| `username` | string | Employee username (case-insensitive) |
| `password` | string | Password (case-sensitive) |
| `role` | string | Selected role (`admin`, `employee-sales`, `employee-ops`, `employee-finance`) |

**Returns** on success:
```json
{ "success": true, "username": "...", "role": "...", "message": "..." }
```
**Throws** on failure with a descriptive error message.

### `getEmployeeDetails()`
Returns all rows from the `Employees` sheet as a 2-D array (row 0 = headers).

### `getPlotsDetails()`
Returns all rows from the `Plots` sheet as a 2-D array.

### `getPMSHistory()`
Returns all rows from the `PMS` sheet as a 2-D array.

### `getSites()`
Returns all rows from the `Sites` sheet as a 2-D array.

## Project Structure

```
Simfy_Landing/
├── Index.html   # Frontend — navigation, hero, login form, admin dashboard
├── code.js      # Google Apps Script backend — auth & data fetching
└── README.md    # This file
```

## Roadmap

- Full employee dashboard (Sales, Operations, Finance views)
- Password hashing / secure credential storage
- Session tokens instead of page-reload logout
- Pagination and search for admin data tables

## License

Proprietary — SimFy Group internal use only.
