import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadFromStorage, saveToStorage } from "../utils/storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => loadFromStorage("user") || null);
  const [applications, setApplications] = useState(() => loadFromStorage("applications") || []);

  useEffect(() => {
    saveToStorage("user", user);
  }, [user]);

  useEffect(() => {
    saveToStorage("applications", applications);
  }, [applications]);

  const login = (email, password) => {
    const role = email === "hrmanager@gmail.com" ? "manager" : "user";
    setUser({ email, role });
  };

  const logout = () => {
    setUser(null);
    navigate("/login");
  };

  const addApplication = (app) => {
    setApplications((prev) => [{ id: Date.now(), ...app }, ...prev]);
  };

  const editApplication = (id, data) => {
    setApplications((prev) => prev.map(a => a.id === id ? {...a, ...data} : a));
  };

  const deleteApplication = (id) => {
    setApplications((prev) => prev.filter(a => a.id !== id));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        applications,
        addApplication,
        editApplication,
        deleteApplication,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
