# SimFy Group Employee Portal

A Google Apps Script web application that serves as an internal employee portal for SimFy Group. It provides role-based login, an admin dashboard with live data from Google Sheets, and a responsive UI.

## Features

- **Role-based authentication** — Employees log in with a username, password, and role. Credentials are validated against a Google Sheets backend.
- **Admin dashboard** — Admins gain access to a full dashboard displaying four data tables fetched live from the spreadsheet:
  - Employee Details
  - Plots Details
  - PMS (Property Management System) History
  - Sites
- **Employee view** — Non-admin roles (Sales, Operations, Finance) receive a personalised welcome screen after login. A full employee dashboard is planned for a future release.
- **Password visibility toggle** — Users can reveal/hide their password while typing.
- **Responsive design** — Mobile-friendly layout using CSS Grid and Flexbox.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML / CSS / JavaScript (single-file SPA) |
| Backend | Google Apps Script (`code.js`) |
| Data store | Google Sheets |
| Fonts / Icons | Google Fonts (Poppins), Font Awesome 6 |

## Project Structure

```
Simfy_Landing/
├── Index.html   # Frontend – full HTML/CSS/JS single-page application
└── code.js      # Backend – Google Apps Script server-side functions
```

## Setup

### 1. Google Sheets

Create (or use an existing) Google Spreadsheet and note its **Spreadsheet ID** from the URL.

The spreadsheet must contain the following sheets:

| Sheet name | Purpose |
|---|---|
| `Users` | Login credentials — columns: `username`, `password`, `role` |
| `Employees` | Employee records shown in the admin dashboard |
| `Plots` | Plot/property details |
| `PMS` | Property Management System history |
| `Sites` | Active sites list |

Row 1 in each sheet is treated as the header row.

### 2. Google Apps Script

1. Open [script.google.com](https://script.google.com) and create a new project.
2. Paste the contents of `code.js` into the editor.
3. Update the `SHEET_ID` constant at the top of `code.js` with your Spreadsheet ID:
   ```js
   const SHEET_ID = 'YOUR_SPREADSHEET_ID';
   ```
4. Copy the contents of `Index.html` into a new HTML file named **`Index`** inside the same Apps Script project.
5. Deploy as a **Web App**:
   - Execute as: *Me*
   - Who has access: *Anyone within your organisation* (or as appropriate)
6. Copy the deployment URL and share it with your employees.

## Available Roles

| Role value | Description |
|---|---|
| `admin` | Full access — sees the Admin Dashboard with all data tables |
| `employee-sales` | Sales team — employee dashboard (coming soon) |
| `employee-ops` | Operations team — employee dashboard (coming soon) |
| `employee-finance` | Finance team — employee dashboard (coming soon) |

## Backend API (Apps Script Functions)

| Function | Description |
|---|---|
| `doGet(e)` | Entry point — serves `Index.html` as the web app |
| `loginUser(data)` | Validates `{ username, password, role }` against the `Users` sheet |
| `getEmployeeDetails()` | Returns all rows from the `Employees` sheet |
| `getPlotsDetails()` | Returns all rows from the `Plots` sheet |
| `getPMSHistory()` | Returns all rows from the `PMS` sheet |
| `getSites()` | Returns all rows from the `Sites` sheet |

## License

MIT
