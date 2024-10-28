import { BrowserRouter, Routes, Route ,useLocation } from "react-router-dom";
import NavBar from "./components/fixedComponents/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import NotFound from "./pages/NotFound";
import ShowJobs from "./pages/ShowJobs";
import MyJobForClient from "./pages/MyJobForClient";
import Footer from "./components/fixedComponents/Footer";
import Addjob from "./pages/Addjob";
import Profile from "./pages/Profile";
import EngineerProposals from "./pages/EngineerProposals";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import JobDetailsForApply from "./pages/JobDetailsForApply";
import Verification from "./pages/Verification";
import CategoryDetails from "./pages/CategoryDetails";
import ClientProfile from "./pages/ClientProfile";
import AddProfileData from "./pages/AddProfileData";
import JobDetailsForClientToSeeProposal from "./pages/JobDetailsForClientToSeeProposal";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const userSchema = {
    name: "",
    email: "",
    token: "",
    userType: "",
    isUserLoggedIn: false,
    verificationStatus: null,
    personalImgUrl: "personalEngineerImage.png",
  };
  function ScrollToTop() {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  }
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

  const handleLogin = (token, name, email, userType, verificationStatus) => {
    const newUser = {
      ...userSchema,
      email: email,
      name: name,
      token: token,
      userType: userType,
      verificationStatus: verificationStatus,
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
  const handlePersonalImgUrl = (personalImgUrl) => {
    const newUser = {
      ...user,
      personalImgUrl: personalImgUrl,
    };
    setUser(newUser);
  };
  console.log(user);

  return (
    <>
      <BrowserRouter>
      <ScrollToTop />

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
                verificationStatus={user.verificationStatus}
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
            path="/engineerProposals"
            element={
              <PrivateRoute
                element={<EngineerProposals token={user.token} />}
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
                element={<JobDetailsForApply user={user} />}
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
                element={<Addjob user={user} token={user.token} />}
                handleRedirectingUrl={handleRedirectingUrl}
                isUserLoggedIn={user.isUserLoggedIn}
                pageAllowFor={"client"}
                userType={user.userType}
              />
            }
          />

          <Route
            path="/My-Job"
            element={
              <PrivateRoute
                element={<MyJobForClient />}
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
                element={
                  <Profile
                    token={user.token}
                    handlePersonalImgUrl={handlePersonalImgUrl}
                  />
                }
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
                    token={user.token}
                    redirectingUrl={redirectingUrl}
                    verificationStatus={user.verificationStatus}
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
                  <AddProfileData userType={user.userType} token={user.token} />
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
            path="/job/:jobId"
            element={<JobDetailsForClientToSeeProposal />}
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
