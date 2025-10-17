import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { Menu } from "lucide-react";

export const Navbar = () => {
  interface NavbarLinksI {
    id: number;
    label: string;
    link: string;
    active?: boolean; // gonna use to help with showing the user which page they are on
  }

  const navbarLinks: NavbarLinksI[] = [
    { id: 1, label: "HOME", link: "/" },
    { id: 2, label: "DISCUSS", link: "/discuss" },
    { id: 3, label: "LIST", link: "/lists" },
    { id: 4, label: "SHOW", link: "/shows" },
    { id: 5, label: "COMMUNITIES", link: "/communities" },
    { id: 6, label: "GENRES", link: "/genres" },
  ];

  return (
    // NOTE: Space between the navbar and the rest of the content changable by the mt-4
    <nav className="flex pt-5 sticky top-0 w-full h-[2.875rem] items-center justify-between text-white">
      {" "}
      {/* TODO: replace with the real logo of the application */}
      <div>
        <div>LOGO</div>
      </div>
      {/* navlink section */}
      <div className="flex items-center flex-row">
        <ol className="flex flex-row">
          {navbarLinks.map((items: NavbarLinksI) => (
            // TODO: might make the spacing between the links slightly wider
            <li key={items.id} className="px-3">
              <Link to={items.link}>
                <p className="navbar-text">{items.label}</p>
              </Link>
            </li>
          ))}
        </ol>
        {/* add search box in here */}
        <SearchBar />
      </div>
      {/* TODO: Add User Icon */}
      <div className="flex items-center">
        <div className="flex flex-row mr-2">
          <Link to="auth/login">
            <button className="bg-[#0066a5] cursor-pointer font-semibold text-white px-3.5 py-1.5 rounded-4xl ml-2">
              Sign In
            </button>
          </Link>
        </div>
        <Menu size={30} />
      </div>
    </nav>
  );
};
