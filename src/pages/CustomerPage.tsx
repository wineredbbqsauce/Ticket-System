import { useState } from "react";
import { Link } from "react-router-dom";
import TopBar from "../components/TopBar.tsx";
import TicketForm from "../components/TicketForm.tsx";
import type { Ticket } from "../api.ts";

type Tab = "meld" | "folg";

export default function CustomerPage() {
  const [tab, setTab] = useState<Tab>("meld");
  const [receipt, setReceipt] = useState<Ticket | null>(null);

  return (
    <>
      <TopBar
        right={
          <Link to="/ansatt" className="btn">
            Ansatt
          </Link>
        }
      />
      <div className="page">
        <h2>Hvordan kan vi hjelpe?</h2>
        <p className="lead">
          Meld inn en sak, eller følg en sak du allerede har meldt inn.
        </p>
        <div className="tabs">
          <button
            className={`tab ${tab === "meld" ? "active" : ""}`}
            onClick={() => {
              setTab("meld");
              setReceipt(null);
            }}
          >
            Meld inn sak
          </button>
          <button
            className={`tab ${tab === "folg" ? "active" : ""}`}
            onClick={() => setTab("folg")}
          >
            Følg sak
          </button>
        </div>

        {tab === "meld" && (
          <div className="card">
            {receipt ? (
              <div className="receipt">
                <p className="hint">Saken din er registrert</p>
                <div className="ticket-id">{receipt.id}</div>
                <p className="hint">
                  Noter saksnummeret — du kan bruke det sammen med e-posten din
                  under «Følg sak».
                </p>
                <button
                  className="btn"
                  style={{ marginTop: 16 }}
                  onClick={() => setReceipt(null)}
                >
                  Meld inn en ny sak
                </button>
              </div>
            ) : (
              <>
                <h3>Meld inn en sak</h3>
                <p className="lead">
                  Beskriv problemet, klagen eller spørsmålet ditt så hjelper vi
                  deg.
                </p>
                <TicketForm onSubmitted={setReceipt} />
              </>
            )}
          </div>
        )}

        {tab === "folg" && (
          <div className="card">
            <h3>Følg sak</h3>
            <p className="lead">
              Slå opp status på en sak du allerede har sendt inn.
            </p>
            {/* TicketLookup kommer her */}
          </div>
        )}
      </div>
    </>
  );
}
