import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "../components/layouts/AppLayout";
import LeadsPage from "../pages/LeadsPage";
import OpportunitiesPage from "../pages/OpportunitiesPage";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/leads" replace />} />
        <Route path="/leads" element={<LeadsPage />} />
        <Route path="/opportunities" element={<OpportunitiesPage />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </AppLayout>
  );
}
export default App;
