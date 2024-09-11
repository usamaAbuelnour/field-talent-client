/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Home, PlusCircle, LogIn, Menu, X, ChevronDown ,Sun  } from 'lucide-react';
// بعد ما اخلص لوجيك 
// import { Home, PlusCircle, User, LogIn, LogOut, Menu, X, ChevronDown } from 'lucide-react';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const isUserLoggedIn = false;
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLink = ({ to, icon: Icon, label }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 ease-in-out
          ${isActive 
            ? 'bg-main text-white shadow-md' 
            : 'text-dark hover:bg-s-light hover:text-main'
          }`}
      >
        <Icon size={20} />
        <span className="hidden md:inline">{label}</span>
      </Link>
    );
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50  transition-all duration-300 ease-in-out
      ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
            <Sun size={20} />
              {/* <img className="h-10 w-auto" src="/path-to-your-logo.png" alt="Field Talent Logo" /> */}
              <span className={`ml-2 text-xl font-bold transition-colors duration-300
                ${isScrolled ? 'text-dark' : 'text-white'}`}>
                Field Talent
              </span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              <NavLink to="/" icon={Home} label="Home" />
              <NavLink to="/addpost" icon={PlusCircle} label="Add Job" />
            </div>
          </div>
          
          <div className="flex items-center">
            {isUserLoggedIn ? (
              <div className="relative">
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
                  <span className="ml-2 hidden md:inline">John Doe</span>
                  <ChevronDown size={20} className="ml-1" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transform opacity-0 scale-95 transition-all duration-200 ease-out origin-top-right"
                       style={{ animation: 'fadeIn 0.2s ease-out forwards' }}>
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                      <Link to="/profile" className="block px-4 py-2 text-sm text-dark hover:bg-s-light transition-colors duration-150" role="menuitem">Profile</Link>
                      <Link to="/settings" className="block px-4 py-2 text-sm text-dark hover:bg-s-light transition-colors duration-150" role="menuitem">Settings</Link>
                      <button className="block w-full text-left px-4 py-2 text-sm text-dark hover:bg-s-light transition-colors duration-150" role="menuitem">Sign out</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center gap-2 bg-main text-white px-4 py-2 rounded-md hover:bg-main-600 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
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
                  : 'text-white hover:text-s-light hover:bg-white hover:bg-opacity-20'
                } focus:outline-none focus:ring-2 focus:ring-inset focus:ring-main`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen' : 'max-h-0'} overflow-hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-inner">
          <NavLink to="/" icon={Home} label="Home" />
          <NavLink to="/addpost" icon={PlusCircle} label="Add Job" />
        </div>
        {isUserLoggedIn && (
          <div className="pt-4 pb-3 border-t border-s-light bg-white">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img className="h-10 w-10 rounded-full border-2 border-main" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="User avatar" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-dark">John Doe</div>
                <div className="text-sm font-medium text-s-dark">john@example.com</div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-dark hover:bg-s-light transition-colors duration-150">Profile</Link>
              <Link to="/settings" className="block px-3 py-2 rounded-md text-base font-medium text-dark hover:bg-s-light transition-colors duration-150">Settings</Link>
              <button className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-dark hover:bg-s-light transition-colors duration-150">Sign out</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}