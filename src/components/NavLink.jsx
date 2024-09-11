/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */ 
// محتاجه تعديلات  يا مصطفى 
import { Link, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';



function NavLink ({ to, icon: Icon, label, className = '' }){
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 ease-in-out
        ${isActive 
          ? 'bg-main text-white shadow-md' 
          : 'text-dark hover:bg-s-light hover:text-main'
        }
        ${className}
      `}
    >
      <Icon size={20} />
      <span className="hidden md:inline">{label}</span>
    </Link>
  );
};

export default NavLink;
