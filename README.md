# SimFy Group Employee Portal

A Google Apps Script web application that serves as a role-based employee portal for SimFy Group. It provides secure login, an admin dashboard with live data from Google Sheets, and department-specific access for Sales, Operations, and Finance staff.

## Features

- **Role-based login** — employees select their department role at login; admins get a dedicated dashboard
- **Admin Dashboard** — live tables for Employee Details, Plots Details, PMS History, and Sites, all pulled from Google Sheets
- **Employee view** — non-admin roles see a personalised welcome screen (full department dashboards coming soon)
- **Password visibility toggle** — inline show/hide button on the password field
- **Responsive design** — adapts to mobile and desktop via CSS Grid and Flexbox
- **Animated hero section** — slow zoom effect and fade-in typography

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3 (custom properties), vanilla JavaScript |
| Backend | Google Apps Script (V8 runtime) |
| Data store | Google Sheets |
| Fonts / Icons | Google Fonts (Poppins), Font Awesome 6 |

## Project Structure

```
Simfy_Landing/
├── Index.html   # Frontend — landing page, login form, admin dashboard UI
└── code.js      # Backend — Google Apps Script server-side functions
```

## Google Sheets Setup

The app reads from a single Google Spreadsheet. Set the `SHEET_ID` constant in `code.js` to your spreadsheet's ID.

Required sheets and their expected column layouts:

### `Users` sheet

| Column A | Column B | Column C |
|---|---|---|
| username | password | role |

Row 1 is treated as headers and skipped during authentication. The `role` value must match one of the login roles exactly (case-insensitive).

### `Employees` sheet

First row = column headers (displayed as table headings in the admin dashboard). Subsequent rows = employee records.

### `Plots` sheet

First row = column headers. Subsequent rows = plot records.

### `PMS` sheet

First row = column headers. Subsequent rows = PMS (Property Management System) history records.

### `Sites` sheet

First row = column headers. Subsequent rows = site records.

## Login Roles

| Role value | Description |
|---|---|
| `admin` | Full access — loads the Admin Dashboard with all data tables |
| `employee-sales` | Sales department — personalised welcome screen |
| `employee-ops` | Operations department — personalised welcome screen |
| `employee-finance` | Finance department — personalised welcome screen |

## Backend API (Google Apps Script)

All functions below are called from the frontend via `google.script.run`.

### `doGet(e)`
Serves `Index.html` as the web app entry point. Sets the page title to *SimFy Group Employee Portal* and allows embedding in any frame.

### `loginUser(data)`
Authenticates a user against the `Users` sheet.

**Parameters:**
```js
{
  username: string,  // case-insensitive
  password: string,
  role:     string   // case-insensitive
}
```

**Returns on success:**
```js
{
  success:  true,
  username: string,
  role:     string,
  message:  string
}
```

Throws an `Error` if any field is missing or credentials do not match.

### `getEmployeeDetails()`
Returns all rows from the `Employees` sheet as an array of arrays (row 0 = headers).

### `getPlotsDetails()`
Returns all rows from the `Plots` sheet as an array of arrays.

### `getPMSHistory()`
Returns all rows from the `PMS` sheet as an array of arrays.

### `getSites()`
Returns all rows from the `Sites` sheet as an array of arrays.

## Deployment

1. Open [Google Apps Script](https://script.google.com) and create a new project.
2. Paste the contents of `code.js` into the default script file.
3. Create an HTML file named **`Index`** (not `Index.html`) and paste the contents of `Index.html`.
4. Update `SHEET_ID` in `code.js` with your Google Spreadsheet ID.
5. Click **Deploy → New deployment**, choose **Web app**.
6. Set *Execute as* to your account and *Who has access* to your desired audience.
7. Copy the deployment URL and share it with your team.

## Configuration

```js
// code.js
const SHEET_ID   = 'YOUR_SPREADSHEET_ID'; // Replace with your sheet ID
const SHEET_NAME = 'Users';               // Sheet containing user credentials
```

## License

MIT
