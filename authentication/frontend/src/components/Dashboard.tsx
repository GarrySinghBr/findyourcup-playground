import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export function Dashboard() {
  const { user, signOut } = useAuth();
  return (
    <div className="space-y-4 text-sm max-w-md w-full">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">
          You are logged in as{" "}
          <span className="font-medium">{user?.email}</span>
        </p>
      </div>
      <Button variant="outline" onClick={() => signOut()}>
        Logout
      </Button>
    </div>
  );
}
