import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const initial = {
  company: "",
  title: "",
  jobType: "",
  status: "",
  location: "",
  appliedDate: "",
  notes: ""
};

export default function AddApplication() {
  const { addApplication } = useAuth();
  const [formData, setFormData] = useState(initial);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validate = () => {
    const e = {};
    if (!formData.company.trim()) e.company = "Company Name is required.";
    if (!formData.title.trim()) e.title = "Job Title is required.";
    if (!formData.jobType) e.jobType = "Job Type is required.";
    if (!formData.status) e.status = "Status is required.";
    if (!formData.location.trim()) e.location = "Location is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    addApplication(formData);
    setFormData(initial);
    setErrors({});
    setSuccess("Application added!");
    setTimeout(() => setSuccess(""), 2000);
  };

  return (
    <div className="card">
      <h3>Add Job Application</h3>
      <form onSubmit={submit}>
        <label>Company Name</label>
        <input value={formData.company} onChange={(e)=>setFormData({...formData, company: e.target.value})} />
        {errors.company && <div className="error">{errors.company}</div>}

        <label>Job Title</label>
        <input value={formData.title} onChange={(e)=>setFormData({...formData, title: e.target.value})} />
        {errors.title && <div className="error">{errors.title}</div>}

        <label>Job Type</label>
        <select value={formData.jobType} onChange={(e)=>setFormData({...formData, jobType: e.target.value})}>
          <option value="">Select</option>
          <option>Full-time</option>
          <option>Internship</option>
          <option>Part-time</option>
          <option>Contract</option>
        </select>
        {errors.jobType && <div className="error">{errors.jobType}</div>}

        <label>Status</label>
        <select value={formData.status} onChange={(e)=>setFormData({...formData, status: e.target.value})}>
          <option value="">Select</option>
          <option>Applied</option>
          <option>Interview Scheduled</option>
          <option>Rejected</option>
          <option>Selected</option>
        </select>
        {errors.status && <div className="error">{errors.status}</div>}

        <label>Location</label>
        <input value={formData.location} onChange={(e)=>setFormData({...formData, location: e.target.value})} />
        {errors.location && <div className="error">{errors.location}</div>}

        <label>Applied Date</label>
        <input type="date" value={formData.appliedDate} onChange={(e)=>setFormData({...formData, appliedDate: e.target.value})} />

        <label>Notes (optional)</label>
        <textarea value={formData.notes} onChange={(e)=>setFormData({...formData, notes: e.target.value})}></textarea>

        <button className="btn" type="submit">Add Application</button>
        {success && <div className="success">{success}</div>}
      </form>
    </div>
  );
}
