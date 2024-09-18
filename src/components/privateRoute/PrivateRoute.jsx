/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const PrivateRoute = ({ element, isUserLoggedIn, handleRedirectingUrl }) => {
  const location = useLocation();

  useEffect(() => {
    handleRedirectingUrl(location.pathname); 
  }, [location.pathname, handleRedirectingUrl]);

  return isUserLoggedIn ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
