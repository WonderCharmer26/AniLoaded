// main layout for the base of the application
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export default function RootLayout() {
  return (
    <div className="app relative">
      <header className="app-header">
        <Navbar />
      </header>
      <main className="mt-[72px] ">
        <Outlet />
      </main>
      <footer className="bottom-0 w-full absolute flex items-center justify-center">
        <p>&copy; 2024 AniLoaded. Your anime discovery platform.</p>
      </footer>
    </div>
  );
}
