import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SunIcon from '@heroicons/react/24/solid/SunIcon';
import MoonIcon from '@heroicons/react/24/solid/MoonIcon';
import MenuIcon from '@heroicons/react/24/solid/Bars3Icon';
import XIcon from '@heroicons/react/24/solid/XMarkIcon';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';

function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const closeMobileMenu = () => setMenuOpen(false);

  return (
    <nav className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-900 dark:to-gray-800 shadow-md sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center w-full">
        <NavLink to="/" className="flex items-center gap-2">
          <PencilIcon className="w-6 h-6 text-white dark:text-blue-400" />
          <span className="text-xl font-semibold text-white font-poppins">
            SnippetGod
          </span>
        </NavLink>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {["/", "/pastes"].map((path, i) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `text-lg font-medium transition-colors ${
                  isActive ? "text-yellow-300" : "text-white hover:text-yellow-200"
                }`
              }
            >
              {i === 0 ? "Home" : "Pastes"}
            </NavLink>
          ))}

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <SunIcon className="w-6 h-6 text-yellow-300" />
            ) : (
              <MoonIcon className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile toggles */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <SunIcon className="w-6 h-6 text-yellow-300" />
            ) : (
              <MoonIcon className="w-6 h-6 text-white" />
            )}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded-md"
            aria-label="Toggle mobile menu"
          >
            {menuOpen ? <XIcon className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-screen opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        } bg-gradient-to-b from-indigo-600 to-purple-600 dark:from-gray-900 dark:to-gray-800`}
      >
        <div className="flex flex-col px-4 gap-3">
          {["/", "/pastes"].map((path, i) => (
            <NavLink
              key={path}
              to={path}
              onClick={closeMobileMenu}
              className="block text-lg font-medium text-white hover:text-yellow-200 transition-colors py-2 px-3 rounded-md"
            >
              {i === 0 ? "Home" : "Pastes"}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
