import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import TopBar from "../components/TopBar";
import StatCard from "../components/StatCard";
import TicketTable from "../components/TicketTable";
import TicketBoard from "../components/TicketBoard";
import TicketDrawer from "../components/TicketDrawer";
import {
  listTickets,
  updateTicket,
  deleteTicket,
  isEmployeeLoggedIn,
  employeeLogout,
  type Ticket,
  type TicketStatus,
} from "../api.ts";

type View = "tabell" | "tavle";

export default function EmployeePanel() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Alle statuser");
  const [priorityFilter, setPriorityFilter] = useState("Alle prioriteter");
  const [typeFilter, setTypeFilter] = useState("Alle typer");
  const [view, setView] = useState<View>("tabell");
  const [selected, setSelected] = useState<Ticket | null>(null);

  useEffect(() => {
    if (!isEmployeeLoggedIn()) {
      navigate("/ansatt", { replace: true });
      return;
    }
    refresh();
  }, []);

  async function refresh() {
    setTickets(await listTickets());
  }

  function handleLogout() {
    employeeLogout();
    navigate("/");
  }

  async function handleSave(id: string, patch: Partial<Ticket>) {
    await updateTicket(id, patch);
    await refresh();
    setSelected(null);
  }

  async function handleDelete(id: string) {
    await deleteTicket(id);
    await refresh();
    setSelected(null);
  }

  async function handleStatusChange(id: string, status: TicketStatus) {
    await updateTicket(id, { status });
    await refresh();
  }

  const filtered = useMemo(() => {
    return tickets.filter((t) => {
      if (statusFilter !== "Alle statuser" && t.status !== statusFilter)
        return false;
      if (
        priorityFilter !== "Alle prioriteter" &&
        t.priority !== priorityFilter
      )
        return false;
      if (typeFilter !== "Alle typer" && t.type !== typeFilter) return false;
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        return (
          t.id.toLowerCase().includes(q) ||
          t.name.toLowerCase().includes(q) ||
          t.email.toLowerCase().includes(q) ||
          t.subject.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [tickets, query, statusFilter, priorityFilter, typeFilter]);

  const stats = useMemo(
    () => ({
      total: tickets.length,
      open: tickets.filter((t) => t.status === "Åpen").length,
      progress: tickets.filter((t) => t.status === "Under behandling").length,
      solved: tickets.filter((t) => t.status === "Løst").length,
    }),
    [tickets],
  );

  return (
    <>
      <TopBar
        right={
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn" onClick={() => navigate("/")}>
              Brukersiden
            </button>
            <button className="btn" onClick={handleLogout}>
              Logg ut
            </button>
          </div>
        }
      />
      <div className="page-wide">
        <div className="stat-grid">
          <StatCard label="Totalt" value={stats.total} />
          <StatCard label="Åpne" value={stats.open} />
          <StatCard label="Under behandling" value={stats.progress} />
          <StatCard label="Løst" value={stats.solved} />
        </div>

        <div className="toolbar">
          <input
            type="text"
            placeholder="Søk saksnr., navn, e-post…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>Alle statuser</option>
            <option>Åpen</option>
            <option>Under behandling</option>
            <option>Løst</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option>Alle prioriteter</option>
            <option>Lav</option>
            <option>Middels</option>
            <option>Høy</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option>Alle typer</option>
            <option>Problem</option>
            <option>Klage</option>
            <option>Spørsmål</option>
          </select>
          <div className="view-toggle">
            <button
              className={view === "tabell" ? "active" : ""}
              onClick={() => setView("tabell")}
            >
              Tabell
            </button>
            <button
              className={view === "tavle" ? "active" : ""}
              onClick={() => setView("tavle")}
            >
              Tavle
            </button>
          </div>
        </div>

        <div className="panel-box">
          {view === "tabell" ? (
            <TicketTable tickets={filtered} onSelect={setSelected} />
          ) : (
            <TicketBoard
              tickets={filtered}
              onSelect={setSelected}
              onStatusChange={handleStatusChange}
            />
          )}
        </div>
      </div>

      {selected && (
        <TicketDrawer
          key={selected.id}
          ticket={selected}
          onClose={() => setSelected(null)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}
