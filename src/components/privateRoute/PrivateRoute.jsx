/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const PrivateRoute = ({ element, isUserLoggedIn, handleRedirectingUrl,pageAllowFor,userType }) => {
  const location = useLocation();

  useEffect(() => {
    handleRedirectingUrl(location.pathname); 
  }, [location.pathname, handleRedirectingUrl]);

  return isUserLoggedIn ?( pageAllowFor === userType ? element : <Navigate to="/NotFound"/> ): <Navigate to="/login" />;
};

export default PrivateRoute;
