import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.email) e.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.password) e.password = "Password is required.";
    else if (form.password.length < 6) e.password = "Password must be at least 6 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    login(form.email, form.password);
    navigate("/dashboard");
  };

  return (
    <div className="card">
      <h3>Login</h3>
      <form onSubmit={submit} noValidate>
        <label>Email</label>
        <input
          value={form.email}
          onChange={(e) => setForm({...form, email: e.target.value})}
          type="email"
        />
        {errors.email && <div className="error">{errors.email}</div>}

        <label>Password</label>
        <input
          value={form.password}
          onChange={(e) => setForm({...form, password: e.target.value})}
          type="password"
        />
        {errors.password && <div className="error">{errors.password}</div>}

        <button className="btn" type="submit">Login</button>
      </form>
      <div style={{ marginTop: 12 }}>
        <b>Test accounts:</b>
        <ul>
          <li>hrmanager@gmail.com / any password → role manager</li>
          <li>any other email / any password → role user</li>
        </ul>
      </div>
    </div>
  );
}
