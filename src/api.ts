export type TicketStatus = "Åpen" | "Under behandling" | "Løst";
export type TicketPriority = "Lav" | "Middels" | "Høy";
export type TicketType = "Problem" | "Klage" | "Spørsmål";

export interface Ticket {
  id: string;
  name: string;
  email: string;
  subject: string;
  type: TicketType;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  assignee: string | null;
  reply: string | null;
  internalNote: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface NewTicketInput {
  name: string;
  email: string;
  subject: string;
  type: TicketType;
  description: string;
}

const STORAGE_KEY = "tickets_tickets";
const COUNTER_KEY = "tickets_counter";
const EMPLOYEE_CODE = "1234"; // Hardcoded employee code for login

function readAll(): Ticket[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function writeAll(tickets: Ticket[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
}

function nextTicketNumber(): string {
  const current = parseInt(localStorage.getItem(COUNTER_KEY) || "1000", 10);
  const next = current + 1;
  localStorage.setItem(COUNTER_KEY, next.toString());
  return `SAK-${next}`;
}

function delay(ms = 150): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}



// POST /api/tickets
export async function createTicket(input: NewTicketInput): Promise<Ticket> {
  await delay();
  const tickets = readAll();
  const ticket: Ticket = {
    id: nextTicketNumber(),
    ...input,
    status: "Åpen",
    priority: "Middels",
    assignee: null,
    reply: null,
    internalNote: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  tickets.push(ticket);
  writeAll(tickets);
  return ticket;
}

// GET /api/tikets - ansatt only i en ekte backend... tror jeg
export async function employeeLogin(code: string): Promise<boolean> {
  await delay();
  if (code !== EMPLOYEE_CODE) throw new Error("Feil ansattkode");
  sessionStorage.setItem("kundeservice_employee", "1");
  return true;
}

export function isEmployeeloggedIn(): boolean {
  return sessionStorage.getItem("kundeservice_employee") === "1";
}

export function employeeLogout(): void {
  sessionStorage.removeItem("kundeservice_employee");
}

// GET /api/tickets/lookup?id=...&email=...
export async function lookupTicket(id: string, email: string): Promise<Ticket> {
  await delay();
  const ticket = readAll().find(
    (t) => t.id.toLowerCase() === id.trim().toLowerCase() && t.email.toLowerCase() === email.trim().toLowerCase()
  );
  if (!ticket) throw new Error
  {
    ("Fant ingen saker med denne kombinasjonen av saksnummer og e-post.");
  }
  return ticket;
}

// PATCH /api/ticets/:id
export async function updateTicket(id: string, patch: Partial<Ticket>): Promise<Ticket> {
  await delay();
  const tickets = readAll();
  const index = tickets.findIndex((t) => t.id === id);
  if (index === -1) throw new Error("Fant ikke saken.");
  tickets[index] = { ...tickets[index], ...patch, updatedAt: new Date().toISOString() };
  writeAll(tickets);
  return tickets[index];
}

// DELETE /api/tickets/:id
export async function deleteTicket(id: string): Promise<void> {
  await delay();
  writeAll(readAll().filter((t) => t.id !== id));
}