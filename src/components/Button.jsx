/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Button = ({ 
  to, 
  text, 
  variant = 'fill', 
  size = 'md', 
  disabled = false, 
  className = '' 
}) => {
  const baseClasses = 'btn font-semibold rounded focus:outline-none focus:ring-2 focus:ring-opacity-50';
  const sizeClasses = {
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg'
  };
  const variantClasses = {
    fill: 'bg-main hover:bg-main-600 text-white',
    outline: 'btn-outline border-main text-main hover:bg-main hover:text-white'
  };

  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `.trim();

  return (
    <Link
      to={to}
      className={buttonClasses}
      aria-disabled={disabled}
    >
      {text}
    </Link>
  );
};

export default Button;