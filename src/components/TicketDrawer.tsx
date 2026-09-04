import { useState } from "react";
import type { Ticket, TicketStatus, TicketPriority } from "../api.ts";

interface Props {
  ticket: Ticket;
  onClose: () => void;
  onSave: (id: string, patch: Partial<Ticket>) => void;
  onDelete: (id: string) => void;
}

export default function TicketDrawer({
  ticket,
  onClose,
  onSave,
  onDelete,
}: Props) {
  const [status, setStatus] = useState<TicketStatus>(ticket.status);
  const [priority, setPriority] = useState<TicketPriority>(ticket.priority);
  const [assignee, setAssignee] = useState(ticket.assignee || "");
  const [reply, setReply] = useState(ticket.reply || "");
  const [internalNote, setInternalNote] = useState(ticket.internalNote || "");

  function handleSave() {
    onSave(ticket.id, {
      status,
      priority,
      assignee: assignee || null,
      reply,
      internalNote,
    });
  }

  function handleDelete() {
    if (confirm(`Slette ${ticket.id}? Dette kan ikke angres.`)) {
      onDelete(ticket.id);
    }
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        <button className="drawer-close" onClick={onClose}>
          ✕
        </button>
        <h3>{ticket.id}</h3>
        <p className="hint">
          {ticket.name} · {ticket.email}
        </p>

        <div className="drawer-section">
          <h5>Emne</h5>
          <p>{ticket.subject}</p>
          <h5>Beskrivelse</h5>
          <p style={{ whiteSpace: "pre-wrap" }}>{ticket.description}</p>
        </div>

        <div className="drawer-section">
          <h5>Status</h5>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as TicketStatus)}
          >
            <option>Åpen</option>
            <option>Under behandling</option>
            <option>Løst</option>
          </select>
        </div>

        <div className="drawer-section">
          <h5>Prioritet</h5>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as TicketPriority)}
          >
            <option>Lav</option>
            <option>Middels</option>
            <option>Høy</option>
          </select>
        </div>

        <div className="drawer-section">
          <h5>Tildelt</h5>
          <input
            type="text"
            placeholder="Navn på ansatt"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
          />
        </div>

        <div className="drawer-section">
          <h5>Svar til innsender</h5>
          <textarea
            placeholder="Skriv et svar kunden vil se under «Følg sak»…"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
        </div>

        <div className="drawer-section">
          <h5>Internt notat (kun ansatte ser dette)</h5>
          <textarea
            placeholder="Notater til deg selv eller kollegaer…"
            value={internalNote}
            onChange={(e) => setInternalNote(e.target.value)}
          />
        </div>

        <div className="form-footer">
          <button className="btn" onClick={handleDelete}>
            Slett sak
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            Lagre endringer
          </button>
        </div>
      </div>
    </div>
  );
}
