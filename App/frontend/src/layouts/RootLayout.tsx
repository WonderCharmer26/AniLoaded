import React from "react";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="app">
      <header className="app-header">
        <nav>{/* TODO: Add navigation component */}</nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <footer className="app-footer">
        <p>&copy; 2024 AniLoaded. Your anime discovery platform.</p>
      </footer>
    </div>
  );
}
