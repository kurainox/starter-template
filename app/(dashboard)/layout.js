"use client";
import Navbar from "@/components/Navbar/Navbar.component";
import styles from "./layout.module.css";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

export default function DashboardLayout({ children }) {
  const { isLoading } = useProtectedRoute();
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <main className={`${styles["dashboard-layout-container"]}`}>
      <Navbar />
      {children}
    </main>
  );
}
