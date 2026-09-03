import { Link } from "react-router-dom";
import type { ReactNode } from "react";

interface Props {
  right?: ReactNode;
}

export default function TopBar({ right }: Props) {
  return (
    <div className="top-bar">
      <Link
        to="/"
        className="brand"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="brand-icon">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4l3 3" />
          </svg>
        </div>
        <div className="brand-text">
          <h1>Ticket System</h1>
          <div className="subtitle">Saksbehandling</div>
        </div>
      </Link>
      {right}
    </div>
  );
}
