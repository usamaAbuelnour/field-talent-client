/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Button = ({
  to,
  text,
  type,
  variant = "fill",
  size = "md",
  disabled = false,
  className = "",
  onClick=null
}) => {
  const baseClasses =
    "btn font-semibold rounded focus:outline-none focus:ring-2 focus:ring-opacity-50";

  const sizeClasses = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-base",
    lg: "h-12 px-6 text-lg"
  };
  const variantClasses = {
    fill: "bg-main text-white hover:bg-teal-700",
    outline: " border  border-main text-main  ",
  };

  const disabledClasses = disabled

    ? "opacity-50 cursor-not-allowed pointer-events-none bg-main "
    : "";

  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${disabledClasses}
    ${className}
  `.trim();

  if (to && !disabled) {
    return (
      <Link to={to} className={buttonClasses}>
        {text}
      </Link>
    );
  }

  return (
    <button type={type} className={buttonClasses} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
