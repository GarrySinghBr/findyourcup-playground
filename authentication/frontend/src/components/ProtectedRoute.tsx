import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface Props {
  children: React.ReactElement;
}

export function ProtectedRoute({ children }: Props) {
  const { user, loading } = useAuth();
  if (loading) {
    return <div className="text-sm text-muted-foreground">Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
