import type { Ticket, TicketStatus } from "../api.ts";

const STATUS_CLASS: Record<TicketStatus, string> = {
  Åpen: "badge-open",
  "Under behandling": "badge-progress",
  Løst: "badge-solved",
};

interface Props {
  tickets: Ticket[];
  onSelect: (ticket: Ticket) => void;
}

export default function TicketTable({ tickets, onSelect }: Props) {
  if (tickets.length === 0) {
    return (
      <div className="empty-state">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M4 4h16v12H8l-4 4V4z" />
        </svg>
        <p style={{ marginTop: 12 }}>Ingen saker å vise.</p>
      </div>
    );
  }

  return (
    <table className="ticket-table">
      <thead>
        <tr>
          <th>Sak</th>
          <th>Navn</th>
          <th>Emne</th>
          <th>Type</th>
          <th>Prioritet</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((t) => (
          <tr key={t.id} onClick={() => onSelect(t)}>
            <td>{t.id}</td>
            <td>{t.name}</td>
            <td>{t.subject}</td>
            <td>{t.type}</td>
            <td>{t.priority}</td>
            <td>
              <span className={`badge ${STATUS_CLASS[t.status]}`}>
                {t.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
