# 🎧 Kundeservice

A customer-service ticketing app with a customer-facing portal and a code-gated
employee panel for managing support tickets.

## 🛠️ Tech stack

- **TypeScript**
- **React**
- **Vite**
- **React Router** for client-side routing

## ✨ Features

**Customer portal (`/`)**
- 📝 Submit a ticket (name, email, subject, type, description)
- 🎫 Receive a ticket number (`SAK-XXXX`) as a receipt after submitting
- 🔍 Look up an existing ticket's status by ticket number + email

**Employee panel (`/ansatt`, `/ansatt/panel`)**
- 🔒 Code-gated login (see `EMPLOYEE_CODE` in `src/api.ts`)
- 📊 Dashboard stats (total / open / in progress / solved)
- 🔎 Search and filter tickets by status, priority, and type
- 📋 Table view and drag-and-drop kanban board view
- 🗂️ Ticket detail panel: change status/priority, assign, reply to the
  customer, add an internal note (staff-only), or delete the ticket

## 📁 Project structure

```
src/
  api.ts              # data layer — all "backend" calls go through here
  App.tsx             # routes
  main.tsx            # entry point
  index.css           # global styles
  pages/
    CustomerPage.tsx
    EmployeeLogin.tsx
    EmployeePanel.tsx
  components/
    TopBar.tsx
    TicketForm.tsx
    TicketLookup.tsx
    TicketTable.tsx
    TicketBoard.tsx
    TicketDrawer.tsx
    StatCard.tsx
```

## 🚀 Getting started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## 🔌 Backend

Data currently persists in the browser via `localStorage`/`sessionStorage`.
All "server" interaction is isolated in `src/api.ts` — every exported
function (`createTicket`, `listTickets`, `lookupTicket`, `updateTicket`,
`deleteTicket`, `employeeLogin`, etc.) is written as an `async` function
with the same shape a real API call would have. Swapping in a real backend
means replacing the body of each function with a `fetch()` call to the
matching endpoint (noted in a comment above each function) — no other file
needs to change.