// main layout for the base of the application
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";

export default function RootLayout() {
  return (
    <div className="app relative">
      <header className="app-header">
        <Navbar />
      </header>
      <main className="mt-[72px] ">
        <Outlet />
      </main>
      {/* TODO: add something here to separate the footer from the rest of the content */}
      <Footer />
    </div>
  );
}
