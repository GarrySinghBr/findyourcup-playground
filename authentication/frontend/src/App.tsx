import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginForm } from "@/components/LoginForm";
import { SignupForm } from "@/components/SignupForm";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
