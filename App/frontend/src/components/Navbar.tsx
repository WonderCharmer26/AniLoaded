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
    { id: 1, label: "HOME", link: "/home" },
    { id: 2, label: "DISCUSS", link: "/discuss" },
    { id: 3, label: "LIST", link: "/lists" },
    { id: 4, label: "SHOW", link: "/shows" },
    { id: 5, label: "COMMUNITIES", link: "/communities" },
    { id: 6, label: "GENRES", link: "/genres" },
  ];

  return (
    // NOTE: Space between the navbar and the rest of the content changable by the mt-4
    <nav className="flex mt-4 sticky top-0 w-full h-[2.875rem] items-center justify-between ">
      {" "}
      {/* TODO: replace with the real logo of the application */}
      <div>
        <div>LOGO</div>
      </div>
      {/* navlink section */}
      <div className="flex items-center flex-row">
        <ol className="flex flex-row">
          {navbarLinks.map((items: NavbarLinksI) => (
            <li key={items.id} className="px-1.5">
              <Link to={items.link}>
                <p className="font-semibold font-[Inter] text-[0.75rem]">
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
      <Menu size={30} />
    </nav>
  );
};
