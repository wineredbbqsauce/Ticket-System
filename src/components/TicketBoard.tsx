import type { Ticket, TicketStatus } from "../api";
import { useState } from "react";

const COLUMNS: TicketStatus[] = ["Åpen", "Under behandling", "Løst"];

interface Props {
  tickets: Ticket[];
  onSelect: (ticket: Ticket) => void;
  onStatusChange: (id: string, status: TicketStatus) => void;
}

export default function TicketBoard({
  tickets,
  onSelect,
  onStatusChange,
}: Props) {
  const [draggingId, setDraggingId] = useState<string | null>(null);

  return (
    <div className="board">
      {COLUMNS.map((col) => (
        <div
          key={col}
          className="board-col"
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => {
            if (draggingId) onStatusChange(draggingId, col);
            setDraggingId(null);
          }}
        >
          <div className="board-col-header">
            {col} * {tickets.filter((t) => t.status === col).length}
          </div>
          {tickets
            .filter((t) => t.status === col)
            .map((t) => (
              <div
                className={`board-card ${draggingId === t.id ? "dragging" : ""}`}
                key={t.id}
                draggable
                onDragStart={() => setDraggingId(t.id)}
                onDragEnd={() => setDraggingId(null)}
                onClick={() => onSelect(t)}
              >
                <h4>{t.subject}</h4>
                <div className="meta">
                  {t.id} * {t.name}
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
