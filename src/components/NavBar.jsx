/* eslint-disable react/prop-types */
import { useState, useEffect
 } from 'react';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import { Home, PlusCircle, LogIn, LogOut, Menu, X,Sun, ChevronDown } from 'lucide-react';
import NavLink from './NavLink';
export default function NavBar({handleLogout,user}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inLogin, setInLogin] = useState(false);
  let location = useLocation();

 
  const { isUserLoggedIn, name, email } = user;
  useEffect(() => {

    setInLogin(location.pathname === "/login" || location.pathname ===  "/registration");
  }, [location.pathname]);
 
 
  useEffect(() => {

    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
 
    ///qution1 to eng yaasser
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);  
 
  ////////////
  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 10);
  //   };
  //   window.addEventListener('scroll', handleScroll);
 
  //   ///qution1 to eng yaasser
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [isScrolled]);  
  // console.log(isScrolled)
  ////////////
 
 
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50  transition-all duration-300 ease-in-out
      ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
 
 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" icon={Sun} label="Field Talent"  isfrommob={true}/>
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              <NavLink to="/add-job" icon={PlusCircle} label="Add Job" />
            </div>
          </div>
         
          <div className="flex items-center">
            {isUserLoggedIn ? (
              <div  className="relative hidden md:inline">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`flex items-center focus:outline-none transition-colors duration-300
                    ${isScrolled ? 'text-dark hover:text-main' : 'text-white hover:text-s-light'}`}
                >
                  <img
                    className="h-8 w-8 rounded-full object-cover border-2 border-main"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="User avatar"
                  />
                  <span className="ml-2 hidden md:inline text-main">{name}</span>
                  <ChevronDown size={20} className="ml-1 " />
                </button>
                {isDropdownOpen && (
                  <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transform  scale-95 transition-all duration-200 ease-out origin-top-right"
                       style={{ animation: 'fadeIn 0.2s ease-out forwards' }}>
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                      <Link to="/profile" className="block  px-4 py-2 text-sm text-dark hover:bg-s-light transition-colors duration-150" role="menuitem">Profile</Link>
                      <button className="block w-full text-left px-4 py-2 text-sm text-dark hover:bg-s-light transition-colors duration-150" role="menuitem"onClick={handleLogout}>logout</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className={`flex items-center ${inLogin?"hidden":""} gap-2 bg-main text-white px-4 py-2 rounded-md hover:bg-main-600 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md`}
              >
                <LogIn size={20} />
                <span>Log In</span>
              </Link>
            )}
          </div>
         
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md transition-colors duration-300
                ${isScrolled
                  ? 'text-dark hover:text-main hover:bg-s-light'
                  : 'text-main hover:text-dark hover:bg-white hover:bg-opacity-20'
                } focus:outline-none focus:ring-2 focus:ring-inset focus:ring-main`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
 
 
 
 
 
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen' : 'max-h-0'} overflow-hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-inner">
          <NavLink to="/" icon={Home} label="Home" isfrommob={true}/>
          <NavLink to="/addpost" icon={PlusCircle} isfrommob={true} label="Add Job" />
        </div>
        {isUserLoggedIn && (
          <div className="pt-4 pb-3 border-t border-s-light bg-white">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img className="h-10 w-10 rounded-full border-2 border-main" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="User avatar" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-dark">{name}</div>
                <div className="text-sm font-medium text-s-dark">{email}</div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-dark hover:bg-s-light transition-colors duration-150">Profile</Link>
              <button className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-dark hover:bg-s-light transition-colors duration-150" onClick={handleLogout}><LogOut size={20} />logout</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}