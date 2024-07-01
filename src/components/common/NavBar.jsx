import React, { useEffect, useState } from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import { TiDeviceDesktop } from "react-icons/ti";
import { IoNotificationsSharp } from "react-icons/io5";
import { BiSolidMessage } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {logoutUser} from '../../features/auth/userSlice'
import Swal from 'sweetalert2'

function NavBar(props) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.data);

  // console.log(userData)
  const navigate = useNavigate();

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
  const handleLogout = () => {
    Swal.fire({
      title: "Logout Confirmation?",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logoutUser());
        navigate('/login')
        
      }
    });
  };

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

            </button>
            <button
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={() => setIsNavbarOpen(!isNavbarOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isNavbarOpen ? "flex" : "hidden"
              }`}
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-indigo-950 dark:border-gray-700 md:dark:justify-end">
              <li>
                <Link to={'/'} className={`block py-2 px-3 rounded ${navActive === "home"
                  ? "block py-2 px-3  text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  }`}>Home</Link>


              </li>
              <li>
                <Link to={'/posts'} className={`block py-2 px-3 rounded ${navActive === "posts"
                  ? "block py-2 px-3  text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  }`}>Posts</Link>

              </li>
              <li>

                <Link to={'/Subscription'} className={`block py-2 px-3 rounded ${navActive === "Subscription"
                  ? "block py-2 px-3  text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  }`}>Subscription</Link>

              </li>
              <li>

                <Link to={'/community'} className={`block py-2 px-3 rounded ${navActive === "community"
                  ? "block py-2 px-3  text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  }`}>Community</Link>

              </li>



              {
                userData ? (
                  <>
                    <li>

                      <Link to={'/profile'} className={`block py-2 px-3 rounded ${navActive === "profile"
                        ? "block py-2 px-3  text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                        : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        }`}>Profile</Link>

                    </li>
                    <li>

                      <Link to={'/messages'} className={`block py-2 px-3 rounded ${navActive === "messages"
                        ? "block py-2 px-3  text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                        : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        }`}><BiSolidMessage /></Link>

                    </li>
                    <li>
                      <Link to={'/notifications'} className={`block py-2 px-3 rounded ${navActive === "notificatioins"
                        ? "block py-2 px-3  text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                        : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        }`}><IoNotificationsSharp /></Link>

                    </li>


                    <li>
                      <Link onClick={handleLogout} className={`block py-2 px-3 rounded ${navActive === "nm"
                        ? "block py-2 px-3  text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                        : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        }`}>Logout</Link>

                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to={'/login'} className={`block py-2 px-3 rounded ${navActive === "notificatioins"
                        ? "block py-2 px-3  text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                        : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        }`}>Signin</Link>

                    </li>
                    <li>
                      <Link to={'/signup'} className={`block py-2 px-3 rounded ${navActive === "notificatioins"
                        ? "block py-2 px-3  text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                        : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        }`}>Signup</Link>

                    </li>
                  </>
                )
              }



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

export default NavBar;
