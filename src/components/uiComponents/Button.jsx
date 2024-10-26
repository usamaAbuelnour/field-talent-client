import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MotionButton = motion.button;
const MotionLink = motion(Link);

const Button = ({
  to,
  text,
  type,
  variant = "fill",
  size = "md",
  disabled = false,
  className = "",
  onClick = null
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
    outline: "border border-main text-main hover:border-teal-700"
  };
  
  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none bg-main"
    : "";
    
  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${disabledClasses}
    ${className}
  `.trim();

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {scale: 1.04, transition: { duration: 0.2 } },
    tap: { scale: 0.93, transition: { duration: 0.1 } }
  };

  if (to && !disabled) {
    return (
      <MotionLink
        to={to}
        className={buttonClasses}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
      >
        {text}
      </MotionLink>
    );
  }

  return (
    <MotionButton
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
    >
      {text}
    </MotionButton>
  );
};

export default Button;
