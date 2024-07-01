import React, { useEffect, useState } from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import { TiDeviceDesktop } from "react-icons/ti";
import { IoNotificationsSharp } from "react-icons/io5";
import { BiSolidMessage } from "react-icons/bi";
import { Link } from 'react-router-dom';

function AdminNav(props) {
  const [navActive, setNavActive] = useState(props.current);

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
  );
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const element = document.documentElement;
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const options = [
    {
      icon: <IoSunnyOutline />,
      text: "light",
    },
    {
      icon: <FaMoon />,
      text: "dark",
    },
    {
      icon: <TiDeviceDesktop />,
      text: "system",
    },
  ];

  function onWindowMatch() {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && darkQuery.matches)
    ) {
      element.classList.add("dark");
      document.body.style.backgroundColor = "#1e1b4b";
    } else {
      element.classList.remove("dark");
    }
  }

  onWindowMatch();

  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark");
        document.body.style.backgroundColor = "#1e1b4b";
        localStorage.setItem("theme", "dark");
        break;
      case "light":
        element.classList.remove("dark");
        document.body.style.backgroundColor = "#ffffff";
        localStorage.setItem("theme", "light");
        break;
      default:
        localStorage.removeItem("theme");
        onWindowMatch();
        break;
    }
  }, [theme]);

  darkQuery.addEventListener("change", (e) => {
    if (!("theme" in localStorage)) {
      if (e.matches) {
        element.classList.add("dark");
        document.body.style.backgroundColor = "#1e1b4b";
      } else {
        element.classList.remove("dark");
        document.body.style.backgroundColor = "#ffffff";
      }
    }
  });

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-indigo-950">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              TalkToMe
            </span>
          </a>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="flex text-sm bg-gray-00 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              {/* User menu button content */}
            </button>
           
          </div>
          <div
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-indigo-950 dark:border-gray-700 md:dark:justify-end">
             

              <div className="fixed top-5 right-10 duration-100 dark:bg-slate-800 bg-gray-100 text-white rounded">
                {options?.map((opt) => (
                  <button
                    key={opt.text}
                    className={`w-8 h-8 leading-9 text-xl rounded-full m-1 text-sky-600 ml-1 ${theme === opt.text && "text-sky-50"
                      }`}
                    onClick={() => setTheme(opt.text)}
                  >
                    {opt.icon}
                  </button>
                ))}
              </div>

            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default AdminNav;
