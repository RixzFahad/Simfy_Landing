# SimFy Group Employee Portal

A modern, responsive employee portal for SimFy Group — built with HTML, CSS, and JavaScript, powered by Google Apps Script.

## Features

- **Modern Landing Page** — Hero section with animated counters, About section, Services grid, and Contact cards
- **Role-Based Login** — Secure authentication for Admin, Sales, Operations, and Finance roles
- **Admin Dashboard** — Overview stats, data tables for Employees, Plots, PMS History, and Sites
- **Mobile-First Responsive** — Hamburger navigation, fluid grids, and adaptive layouts
- **Scroll Animations** — IntersectionObserver-powered reveal effects and animated number counters
- **Glassmorphism Nav** — Frosted-glass sticky navigation with active section tracking
- **Accessibility** — ARIA labels, semantic HTML, keyboard-navigable controls

## Tech Stack

- **Frontend:** HTML5, CSS3 (custom properties, grid, flexbox), vanilla JavaScript
- **Backend:** Google Apps Script (`code.js`)
- **Data:** Google Sheets
- **Icons:** Font Awesome 6.5
- **Fonts:** Google Fonts (Poppins)

## File Structure

- `Index.html` — Complete frontend (HTML + CSS + JS)
- `code.js` — Google Apps Script backend (login, data fetching)
- `README.md` — This file

## Deployment

1. Open [Google Apps Script](https://script.google.com)
2. Create a new project and paste `code.js`
3. Create an HTML file named `Index` and paste the contents of `Index.html`
4. Deploy as a Web App
5. Ensure the linked Google Sheet has `Users`, `Employees`, `Plots`, `PMS`, and `Sites` tabs
