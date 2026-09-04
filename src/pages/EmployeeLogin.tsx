import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { employeeLogin, isEmployeeLoggedIn } from "../api";

export default function EmployeeLogin() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (isEmployeeLoggedIn()) {
    navigate("/anstatt/panel", { replace: true });
  }

  // handleSubmit kommer kanskje
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await employeeLogin(code);
      navigate("/ansatt/panel");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Noe gikk galt.");
    }
  }

  return (
    <div className="login-page">
      <Link to="/" className="back-link">
        ← Til brukersiden
      </Link>
      <div className="card">
        <div className="lock-icon">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="4" y="10" width="16" height="10" rx="1" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          </svg>
        </div>
        <h3>Ansatt-panel</h3>
        <p className="lead">Skriv inn ansattkoden for å behandle saker.</p>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <input
              type="password"
              placeholder="Ansattkode"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              autoFocus
            />
          </div>
          {error && <p className="error-text">{error}</p>}
          <button
            className="btn btn-primary"
            type="submit"
            style={{ width: "100%", justifyContent: "center" }}
          >
            Logg inn
          </button>
        </form>
      </div>
    </div>
  );
}
