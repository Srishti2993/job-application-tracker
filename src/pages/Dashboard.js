import React from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { applications } = useAuth();

  const total = applications.length;
  const applied = applications.filter(a => a.status === "Applied").length;
  const interview = applications.filter(a => a.status === "Interview Scheduled").length;
  const selected = applications.filter(a => a.status === "Selected").length;
  const rejected = applications.filter(a => a.status === "Rejected").length;

  const last5 = applications.slice(0,5);

  return (
    <div>
      <h3>Dashboard Summary</h3>
      <div className="cards">
        <div className="card-small">Total Applications: <b>{total}</b></div>
        <div className="card-small">Applied: <b>{applied}</b></div>
        <div className="card-small">Interview Scheduled: <b>{interview}</b></div>
        <div className="card-small">Selected: <b>{selected}</b></div>
        <div className="card-small">Rejected: <b>{rejected}</b></div>
      </div>
      <div style={{ marginTop: 16 }}>
        <h4>Last 5 Applications</h4>
        {last5.length === 0 ? <div>No applications yet.</div> :
          <ul>
            {last5.map(a => <li key={a.id}>{a.company} — {a.title} ({a.status})</li>)}
          </ul>
        }
      </div>
    </div>
  );
}
