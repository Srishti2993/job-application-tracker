import React, { useState, useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";

const PAGE_SIZE = 5;

export default function Applications() {
  const { applications, deleteApplication } = useAuth();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortMode, setSortMode] = useState(null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = [...applications];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(a =>
        (a.company || "").toLowerCase().includes(q) ||
        (a.title || "").toLowerCase().includes(q)
      );
    }
    if (filterType !== "All") list = list.filter(a => a.jobType === filterType);
    if (filterStatus !== "All") list = list.filter(a => a.status === filterStatus);
    if (sortMode === "company") {
      list.sort((a,b) => (a.company || "").localeCompare(b.company || ""));
    } else if (sortMode === "date") {
      list.sort((a,b) => {
        const da = a.appliedDate || "";
        const db = b.appliedDate || "";
        return db.localeCompare(da);
      });
    }
    return list;
  }, [applications, search, filterType, filterStatus, sortMode]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const shown = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  React.useEffect(()=> setPage(1), [search, filterType, filterStatus, sortMode]);

  return (
    <div className="card">
      <h3>Applications</h3>
      <div className="controls">
        <input placeholder="Search company or job title" value={search} onChange={(e)=>setSearch(e.target.value)} />
        <select value={filterType} onChange={(e)=>setFilterType(e.target.value)}>
          <option>All</option>
          <option>Full-time</option>
          <option>Internship</option>
          <option>Part-time</option>
          <option>Contract</option>
        </select>
        <select value={filterStatus} onChange={(e)=>setFilterStatus(e.target.value)}>
          <option>All</option>
          <option>Applied</option>
          <option>Interview Scheduled</option>
          <option>Rejected</option>
          <option>Selected</option>
        </select>
        <div className="sort-buttons">
          <button onClick={()=>setSortMode("company")}>Sort by Company (A–Z)</button>
          <button onClick={()=>setSortMode("date")}>Sort by Applied Date (Newest → Oldest)</button>
          <button onClick={()=>{ setSortMode(null); }}>Reset Sorting</button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Job Title</th>
            <th>Job Type</th>
            <th>Status</th>
            <th>Location</th>
            <th>Applied Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shown.length === 0 ? (
            <tr><td colSpan="7">No applications found.</td></tr>
          ) : shown.map(app => (
            <tr key={app.id}>
              <td>{app.company}</td>
              <td>{app.title}</td>
              <td>{app.jobType}</td>
              <td>{app.status}</td>
              <td>{app.location}</td>
              <td>{app.appliedDate || "-"}</td>
              <td>
                <button className="btn-small" onClick={()=>deleteApplication(app.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={()=>setPage(p=>Math.max(1, p-1))} disabled={page===1}>Previous</button>
        <span>Page {page} / {totalPages}</span>
        <button onClick={()=>setPage(p=>Math.min(totalPages, p+1))} disabled={page===totalPages}>Next</button>
      </div>
    </div>
  );
}
