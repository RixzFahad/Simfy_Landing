# Simfy Group Employee Portal

A Google Apps Script-powered employee portal for SimFy Group, providing secure role-based login and an admin dashboard connected to Google Sheets.

## Overview

This portal is a single-page web application deployed as a Google Apps Script Web App. Employees log in with their credentials and are directed to a role-specific view. Admins get a full dashboard showing live data from Google Sheets.

## Features

- **Role-based login** — Supports four roles: Admin, Sales, Operations, Finance
- **Admin Dashboard** — Displays live tables for Employee Details, Plots Details, PMS History, and Sites
- **Employee view** — Employees see a personalised welcome screen (expandable in future)
- **Password visibility toggle** — Show/hide password on the login form
- **Responsive design** — Works on desktop and mobile
- **Google Sheets backend** — All user and data records are managed in a linked Google Spreadsheet

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, vanilla JavaScript |
| Backend | Google Apps Script (server-side JS) |
| Data store | Google Sheets |
| Fonts / Icons | Google Fonts (Poppins), Font Awesome 6 |

## File Structure

```
Simfy_Landing/
├── Index.html   # Frontend — landing page, login form, admin dashboard UI
└── code.js      # Backend — Google Apps Script functions served via doGet()
```

## Google Sheets Setup

The backend reads from a Google Spreadsheet (`SHEET_ID` in `code.js`). The spreadsheet must contain the following sheets:

| Sheet name | Purpose |
|---|---|
| `Users` | Employee login credentials — columns: Username, Password, Role |
| `Employees` | Employee records shown in Admin Dashboard |
| `Plots` | Plot details shown in Admin Dashboard |
| `PMS` | PMS history records shown in Admin Dashboard |
| `Sites` | Site records shown in Admin Dashboard |

The `Users` sheet must have a header row followed by one row per user with columns in this order:

```
Column A: Username
Column B: Password
Column C: Role  (admin | employee-sales | employee-ops | employee-finance)
```

## Deployment

1. Open [Google Apps Script](https://script.google.com) and create a new project.
2. Copy `code.js` content into the script editor (as `Code.gs`).
3. Copy `Index.html` into a new HTML file named `Index` in the same project.
4. Update `SHEET_ID` in `code.js` to your Google Spreadsheet ID.
5. Click **Deploy → New deployment**, choose **Web app**, set access to your organisation or "Anyone".
6. Copy the Web App URL and share it with employees.

## Backend API (Apps Script functions)

### `doGet(e)`
Serves the `Index.html` page as a Web App.

### `loginUser(data)`
Authenticates a user against the `Users` sheet.

**Parameters:**

| Field | Type | Description |
|---|---|---|
| `username` | string | Employee username (case-insensitive) |
| `password` | string | Employee password |
| `role` | string | Selected role (e.g. `admin`, `employee-sales`) |

**Returns:**
```json
{ "success": true, "username": "alice", "role": "admin", "message": "Welcome back, alice!" }
```
Throws an error on invalid credentials.

### `getEmployeeDetails()`
Returns all rows from the `Employees` sheet as a 2D array (first row = headers).

### `getPlotsDetails()`
Returns all rows from the `Plots` sheet.

### `getPMSHistory()`
Returns all rows from the `PMS` sheet.

### `getSites()`
Returns all rows from the `Sites` sheet.

## Roles

| Role value | Display name | Post-login view |
|---|---|---|
| `admin` | Admin | Full Admin Dashboard with all data tables |
| `employee-sales` | Sales | Welcome message (dashboard coming soon) |
| `employee-ops` | Operations | Welcome message (dashboard coming soon) |
| `employee-finance` | Finance | Welcome message (dashboard coming soon) |

## Contributing

1. Fork the repository and create a feature branch.
2. Make changes to `Index.html` (frontend) or `code.js` (backend).
3. Test locally using `clasp` or directly in the Apps Script editor.
4. Open a pull request with a clear description of the changes.
