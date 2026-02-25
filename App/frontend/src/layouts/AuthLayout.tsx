// This is the layout for the authentication pages
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";

export default function AuthLayout() {
  return (
    <div className="app relative">
      <header className="app-header">
        <Navbar />
      </header>
      <main className="mt-[72px] min-h-screen">
        <div className="auth-container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
