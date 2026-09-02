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
