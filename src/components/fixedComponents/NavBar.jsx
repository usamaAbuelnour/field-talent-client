/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DarkModeSwitch } from "react-toggle-dark-mode";

import {
  UserPen,
  BriefcaseBusiness,
  LogIn,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import NavLink from "../uiComponents/NavLink";



export default function NavBar({
  handleLogout,
  user,
  toggleDarkMode,
  isDarkMode,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inLogin, setInLogin] = useState(false);
  const navigate = useNavigate();

  let location = useLocation();

  const { isUserLoggedIn, name, email, userType, profileImage } = user;
  const handleLogoutAndCloseModal=()=>
    {
      handleLogout()
      setModalOpen(false)
      navigate("login", { replace: true });

    }
    const handelOpenLogout = () => setModalOpen(true);
    const cancelLogout = () =>setModalOpen(false);

  const defaultAvatar = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
  useEffect(() => {
    setInLogin(
      location.pathname === "/login" || location.pathname === "/registration"
    );
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
    ${isDarkMode ? "dark" : ""}
    ${isScrolled
          ? "bg-white dark:bg-main-dark shadow-md dark:shadow-sm dark:shadow-light-dark"
          : "dark:bg-dark-light"
        }
    dark:text-s-light`}
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <DarkModeSwitch
              style={{ marginRight: "2rem", padding: "0", cursor: "pointer" }}
              checked={isDarkMode}
              onChange={toggleDarkMode}
              size={35}
            />
            <NavLink
              to="/"
              addicon={false}
              label="Field Talent"
              isfrommob={true}
            />
            {userType &&

              <div className=" md:ml-6 flex ">
                <NavLink
                  to={userType === "engineer" ? "/engineerProposals" : "/My-Job"}
                  icon={BriefcaseBusiness}
                  label={userType === "engineer" ? "show my proposals" : "my jobs"}
                  isfrommob={true}
                />
              </div>

            }

          </div>





          <div className="flex items-center">
            {isUserLoggedIn ? (
              <div className="relative hidden md:inline">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`flex items-center focus:outline-none transition-colors duration-300
                  ${isScrolled
                      ? "text-dark dark:text-s-light hover:text-main"
                      : "text-white hover:text-s-light"
                    }`}
                >
                  <img
                    className="h-8 w-8 rounded-full object-cover border-2 border-main"
                    src={profileImage || defaultAvatar}
                    alt="User avatar"
                  />
                  <span className="ml-2 hidden md:inline text-main dark:text-accent">
                    {name}
                  </span>
                  <ChevronDown size={20} className="ml-1 text-text dark:text-accent" />
                </button>
                {isDropdownOpen && (
                  <div
                    className="absolute mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-slate-700 ring-1 ring-black ring-opacity-5 transform scale-95 transition-all duration-200 ease-out origin-top-right"
                    style={{ animation: "fadeIn 0.2s ease-out forwards" }}
                  >
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <Link
                        to={userType === "engineer" ? "/profile" : "/ClientProfile"}
                        className="flex gap-1 px-4 py-2 text-sm text-text   dark:text-text-dark hover:bg-s-light dark:hover:bg-slate-600 transition-colors duration-150"
                        role="menuitem"
                      >
                        <UserPen size={15} />
                        <span> my Profile </span>
                      </Link>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-text  dark:text-text-dark hover:bg-s-light dark:hover:bg-slate-600 transition-colors duration-150"
                        role="menuitem"
                        onClick={handelOpenLogout}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className={`flex items-center ${inLogin ? "hidden" : ""
                  } gap-2 bg-main text-text-dark    px-4 py-2 rounded-md hover:bg-main-600 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md`}
              >
                <LogIn size={20} />
                <span>LogIn</span>
              </Link>
            )}
          </div>



          {isUserLoggedIn && (
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-md transition-colors duration-300
              ${isScrolled
                    ? "text-dark dark:text-s-light hover:text-main hover:bg-s-light dark:hover:bg-slate-700"
                    : "text-main dark:text-s-light hover:text-dark hover:bg-white hover:bg-opacity-20"
                  } focus:outline-none focus:ring-2 focus:ring-inset focus:ring-main`}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>{" "}
            </div>
          )}
        </div>
      </div>







      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-screen" : "max-h-0"
          }
        overflow-hidden`}
      >
        {isUserLoggedIn && (
          <>
            <div className="pt-4 pb-3 border-t border-s-light dark:border-slate-700 bg-white dark:bg-dark">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full border-2 border-main"
                    src={profileImage || defaultAvatar}
                    alt="User avatar"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-dark dark:text-accent">
                    {name}
                  </div>
                  <div className="text-sm font-medium text-s-dark dark:text-accent">
                    {email}
                  </div>
                </div>

              </div>
              <div className="px-2  space-y-1 sm:px-3 bg-white dark:bg-dark shadow-inner">


                <Link
                  to={userType === "engineer" ? "/profile" : "/ClientProfile"}
                  className="flex gap-1 px-4 py-2 text-sm text-text   dark:text-text-dark hover:bg-s-light dark:hover:bg-slate-600 transition-colors duration-150"
                  role="menuitem"
                >
                  <UserPen size={15} />
                  <span> my Profile </span>
                </Link>
              </div>
              <div className="px-2  space-y-1 sm:px-3 bg-white dark:bg-dark shadow-inner">
                <button
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-dark dark:text-accent hover:bg-s-light dark:hover:bg-slate-700 transition-colors duration-150"
                  onClick={handelOpenLogout}
                >
                  <LogOut size={20} className="inline mr-2" />
                  Logout
                </button>
              </div>
   
            </div>
          </>
        )}
    
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4"
          >
            <h2 className="text-xl font-semibold text-gray-900">
              Confirm Logout
            </h2>
            <p className="mt-2 text-gray-600">
              Are you sure you want to log out of your account?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutAndCloseModal}
                className="px-4 py-2 text-white bg-main hover:bg-main/90 rounded-lg transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
