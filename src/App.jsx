import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/fixedComponents/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import NotFound from "./pages/NotFound";
import ShowJobs from "./pages/ShowJobs";
import ShowProposal from "./pages/ShowProposal";
import Footer from "./components/fixedComponents/Footer";
import Addjob from "./pages/Addjob";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import JobDetailsForApply from "./pages/JobDetailsForApply";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const userSchema = {
    name: "",
    email: "",
    token: "",
    isUserLoggedIn: false,
  };
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : userSchema;
  });
  const [redirectingUrl, setRedirectingUrl] = useState("/");
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode, redirectingUrl]);

  const handleLogin = (token, name, email) => {
    const newUser = {
      ...userSchema,
      email: email,
      name: name,
      token: token,
      isUserLoggedIn: true,
    };
    setUser(newUser);
  };

  const handleLogout = () => {
    setUser(userSchema);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  };
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleRedirectingUrl = (lastRedirectingUrl) => {
    setRedirectingUrl(lastRedirectingUrl);
  };

  return (
    <>
      <BrowserRouter>
        <NavBar
          user={user}
          handleLogout={handleLogout}
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
        />
        <Routes>
          <Route
            index
            element={
              <Home
                isDarkMode={isDarkMode}
                handleRedirectingUrl={handleRedirectingUrl}
              />
            }
          />
          <Route
            path="login"
            element={
              <Login
                redirectingUrl={redirectingUrl}
                handleLogin={handleLogin}
                isUserLoggedIn={user.isUserLoggedIn}
              />
            }
          />
          <Route
            path="registration"
            element={
              <Registration
                redirectingUrl={redirectingUrl}
                handleLogin={handleLogin}
                isUserLoggedIn={user.isUserLoggedIn}
              />
            }
          />






          <Route
            path="/showjobs"
            element={
              <PrivateRoute
                element={<ShowJobs isDarkMode={isDarkMode} />}
                handleRedirectingUrl={handleRedirectingUrl}
                isUserLoggedIn={user.isUserLoggedIn}
              />
            }
          />
          <Route
            path="/add-job"
            element={
              <PrivateRoute
                element={<Addjob token={user.token} />}
                handleRedirectingUrl={handleRedirectingUrl}
                isUserLoggedIn={user.isUserLoggedIn}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute
                element={<Profile user={user} />}
                isUserLoggedIn={user.isUserLoggedIn}
                handleRedirectingUrl={handleRedirectingUrl}
              />
            }
          />
          <Route
            path="/showproposal"
            element={
              <PrivateRoute
                element={<ShowProposal />}
                isUserLoggedIn={user.isUserLoggedIn}
                handleRedirectingUrl={handleRedirectingUrl}
              />
            }
          />

          <Route path="/job-details-for-apply" 
          
          element={<JobDetailsForApply />} />

          <Route
            path="*"
            element={<NotFound redirectingUrl={redirectingUrl} />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
