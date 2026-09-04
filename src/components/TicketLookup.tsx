import { useState } from "react";
import { lookupTicket, type Ticket, type TicketStatus } from "../api.ts";

const STATUS_CLASS: Record<TicketStatus, string> = {
  Åpen: "badge-open",
  "Under behandling": "badge-prosess",
  Løst: "badge-closed",
};

export default function TicketLookup() {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // handleSubmit kommer IKKE HER (not)
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setTicket(null);
    if (!id.trim() || !email.trim()) {
      setError("Fyll ut saksnummer og e-post.");
      return;
    }
    setLoading(true);
    try {
      const found = await lookupTicket(id, email);
      setTicket(found);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Noe gikk galt. Prøv igjen.",
      );
    } finally {
      setLoading(false);
    }
  }

  function handleIdChange(value: string) {
    if (/^\d+$/.test(value.trim())) {
      setId(`SAK-${value.trim()}`);
    } else {
      setId(value);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="field-row">
          <div className="field">
            <label>Saksnummer</label>
            <input
              type="text"
              placeholder="SAK-1001"
              value={id}
              onChange={(e) => handleIdChange(e.target.value)}
            />
          </div>
          <div className="field">
            <label>E-post</label>
            <input
              type="email"
              placeholder="ola@eksempel.no"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {error && <p className="error-text">{error}</p>}
          <div className="form-footer">
            <span className="hint">
              Bruk e-posten du oppga da du sendte inn saken.
            </span>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
            >
              {loading ? "Søker..." : "Søk opp sak →"}
            </button>
          </div>
        </div>
      </form>

      {ticket && (
        <div className="drawer-section">
          <h5>Status</h5>
          <p>
            <span className={`badge ${STATUS_CLASS[ticket.status]}`}>
              {ticket.status}
            </span>
          </p>
          <h5>Emne</h5>
          <p>{ticket.subject}</p>
          <h5>Din beskrivelse</h5>
          <p style={{ whiteSpace: "pre-wrap" }}>{ticket.description}</p>
          {ticket.reply && (
            <>
              <h5>Svar fra oss</h5>
              <p style={{ whiteSpace: "pre-wrap" }}>{ticket.reply}</p>
            </>
          )}
        </div>
      )}
    </>
  );
}
