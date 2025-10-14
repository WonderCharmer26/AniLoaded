import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#101114] text-gray-400 mt-auto">
      <div className="container mx-auto px-6 py-9 font-[Inter]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-7">
          <div className="col-span-2 md:col-span-1">
            {/* TODO: replace with the logo */}
            <h1 className="text-white text-2xl font-bold">AniLoaded</h1>
            <p className="mt-4">
              Your one-stop shop for all things anime. Stream the latest
              episodes, discover new series, and connect with other fans.
            </p>
          </div>
          <div>
            <h2 className="text-white font-bold mb-4">Navigation</h2>
            <ul>
              <li>
                <Link to="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-white font-bold mb-4">Legal</h2>
            <ul>
              <li>
                <Link to="/terms" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-white font-bold mb-4">Connect</h2>
            <ul>
              <li>
                <a href="#" className="hover:text-white">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p>
            &copy; {new Date().getFullYear()} AniLoaded. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

