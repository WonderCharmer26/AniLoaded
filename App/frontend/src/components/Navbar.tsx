import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { Menu } from "lucide-react";
import AniLoadedLogo from "../assets/images/Ani-Loaded Logo.svg";

export const Navbar = () => {
  interface NavbarLinksI {
    id: number;
    label: string;
    link: string;
    active?: boolean; // gonna use to help with showing the user which page they are on
  }

  const navbarLinks: NavbarLinksI[] = [
    { id: 1, label: "HOME", link: "/" },
    { id: 2, label: "DISCUSSIONS", link: "/discussions" },
    { id: 3, label: "LISTS", link: "/lists" },
    { id: 4, label: "ANIME", link: "/anime" },
    { id: 5, label: "RECOMMENDATION", link: "/recommendations" },
  ];

  return (
    // NOTE: Space between the navbar and the rest of the content changable by the mt-4
    <nav className="flex relative pt-5 z-50 top-0 w-full h-[2.875rem] items-center justify-between text-white">
      {" "}
      {/* TODO: replace with the real logo of the application */}
      <div className="h-25 w-25">
        <img src={AniLoadedLogo} alt="Site Logo" />
      </div>
      {/* navlink section */}
      <div className="flex items-center flex-row">
        <ol className="flex flex-row">
          {navbarLinks.map((items: NavbarLinksI) => (
            // TODO: might make the spacing between the links slightly wider
            <li key={items.id} className="px-3">
              <Link to={items.link}>
                <p className="navbar-text hover:text-[#3CB4FF] transition-colors duration-300">
                  {items.label}
                </p>
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
