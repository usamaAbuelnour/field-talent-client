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
import FreelancerProposals from "./pages/FreelancerProposals";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import JobDetailsForApply from "./pages/JobDetailsForApply";
import Verification from "./pages/Verification";
import CategoryDetails from "./pages/CategoryDetails";
import ClientProfile from "./pages/ClientProfile";
import AddProfileData from "./pages/AddProfileData";

import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const userSchema = {
    name: "",
    email: "",
    token: "",
    userType: "",
    isUserLoggedIn: false,
    isVerified: false,
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

  const handleLogin = (token, name, email, userType, isVerified) => {
    const newUser = {
      ...userSchema,
      email: email,
      name: name,
      token: token,
      userType: userType,
      isVerified: isVerified,
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
  console.log(user);

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
                userType={user.userType}
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
                isVerified={user.isVerified}
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
                pageAllowFor={"engineer"}
                userType={user.userType}
              />
            }
          />

          <Route
            path="/freelancerproposals"
            element={
              <PrivateRoute
                element={<FreelancerProposals />}
                isUserLoggedIn={user.isUserLoggedIn}
                handleRedirectingUrl={handleRedirectingUrl}
                pageAllowFor={"engineer"}
                userType={user.userType}
              />
            }
          />

          <Route
            path="/job-details-for-apply"
            element={
              <PrivateRoute
                element={<JobDetailsForApply />}
                isUserLoggedIn={user.isUserLoggedIn}
                handleRedirectingUrl={handleRedirectingUrl}
                pageAllowFor={"engineer"}
                userType={user.userType}
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
                pageAllowFor={"client"}
                userType={user.userType}
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
                pageAllowFor={"client"}
                userType={user.userType}
              />
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute
                element={<Profile token={user.token} />}
                isUserLoggedIn={user.isUserLoggedIn}
                handleRedirectingUrl={handleRedirectingUrl}
                pageAllowFor={"engineer"}
                userType={user.userType}
              />
            }
          />

          <Route
            path="/ClientProfile"
            element={
              <PrivateRoute
                element={<ClientProfile token={user.token} />}
                isUserLoggedIn={user.isUserLoggedIn}
                handleRedirectingUrl={handleRedirectingUrl}
                pageAllowFor={"client"}
                userType={user.userType}
              />
            }
          />
          <Route
            path="/verification"
            element={
              <PrivateRoute
                element={
                  <Verification
                    userType={user.userType}
                    isVerified={user.isVerified}
                  />
                }
                isUserLoggedIn={user.isUserLoggedIn}
                handleRedirectingUrl={handleRedirectingUrl}
                pageAllowFor={user.userType}
                userType={user.userType}
              />
            }
          />
           <Route
            path="/AddProfileData"
            element={
              <PrivateRoute
                element={
                  <AddProfileData
                    userType={user.userType}
                    token={user.token}
                  />
                }
                isUserLoggedIn={user.isUserLoggedIn}
                handleRedirectingUrl={handleRedirectingUrl}
                pageAllowFor={user.userType}
                userType={user.userType}
              />
            }
          />

          <Route
            path="/CategoryDetails/:categoryId"
            element={<CategoryDetails />}
          />

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
