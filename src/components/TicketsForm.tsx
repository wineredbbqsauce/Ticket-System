import { useState } from "react";
import { createTicket, type Ticket, type NewTicketInput } from "../api.ts";

const EMPTY: NewTicketInput = {
  name: "",
  email: "",
  subject: "",
  type: "Problem",
  description: "",
};

interface Props {
  onSubmit: (ticket: Ticket) => void;
}

export default function TicketForm({ onSubmit }: Props) {
  const [form, setForm] = useState<NewTicketInput>(EMPTY);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof NewTicketInput>(
    field: K,
    value: NewTicketInput[K],
  ) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.subject.trim() ||
      !form.description.trim()
    ) {
      setError("Vennligst fyll ut alle feltene.");
      return;
    }
    setSubmitting(true);
    try {
      const ticket = await createTicket(form);
      setForm(EMPTY);
      onSubmit(ticket);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Noe gikk galt. Prøv igjen.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field-row">
        <div className="field">
          <label>Navn</label>
          <input
            type="text"
            value={form.name}
            placeholder="Ola Nordmann"
            onChange={(e) => update("name", e.target.value)}
          />
        </div>
        <div className="field">
          <label>E-post</label>
          <input
            type="email"
            value={form.email}
            placeholder="ola@eksempel.no"
            onChange={(e) => update("email", e.target.value)}
          />
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label>Emne</label>
          <input
            type="text"
            value={form.subject}
            placeholder="Kort beskrivelse"
            onChange={(e) => update("subject", e.target.value)}
          />
        </div>
        <div className="field">
          <label>Type</label>
          <select
            value={form.type}
            onChange={(e) =>
              update("type", e.target.value as NewTicketInput["type"])
            }
          >
            <option>Problem</option>
            <option>Klage</option>
            <option>Spørsmål</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label>Beskrivelse</label>
        <textarea
          value={form.description}
          placeholder="Fortell oss hva som har skjedd, og gjerne hvordan vi kan hjelpe deg."
          onChange={(e) => update("description", e.target.value)}
        />
      </div>

      {error && <p className="error">{error}</p>}

      <div className="field-row">
        <span className="hint">
          Vi behandler henvendelser så raskt som mulig.
        </span>
        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? "Sender..." : "Send inn"}
        </button>
      </div>
    </form>
  );
}
