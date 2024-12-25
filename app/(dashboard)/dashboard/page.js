"use client";
import ElevatedButton from "@/components/ElevatedButton/ElevatedButton.component";
import { useAuthContext } from "@/contexts/AuthContext";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import styles from "./page.module.css";

export default function Dashboard() {
  const { isLoading } = useProtectedRoute();
  const { logout } = useAuthContext();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={`${styles["dashboard-container"]}`}>
      <ElevatedButton onClick={logout} variant="pill">Logout</ElevatedButton>
    </div>
  );
}
