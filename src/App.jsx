import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import NotFound from './pages/NotFound'
import ShowJobs from './pages/ShowJobs';
import ShowProposal from './pages/ShowProposal';
import Footer from "./components/Footer";


import './App.css'
import { useState, useEffect } from "react";
import Addjob from "./pages/Addjob";

function App() {
  const userSchema = {
    name: "",
    email: "",
    token: "",
    isUserLoggedIn: false,
  }  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : false; 
  });
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : userSchema;
  });
  const [redirctuinUrl, setredirctuinUrl] = useState("/")
  useEffect(() => {
    sessionStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  
  useEffect(() => {
    console.log(redirctuinUrl)
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode,redirctuinUrl]);

  // <---------------------------------handling---------------------->
  const handleLogin = (token, name, email) => {
    const newUser = {
      ...userSchema,
      email: email,
      name: name,
      token: token,
      isUserLoggedIn: true
    }
    setUser(newUser);
  }

  const handleLogout = () => {
    setUser(userSchema);
    sessionStorage.removeItem('user');
  }
  const toggleDarkMode=()=>{

    setIsDarkMode(prevMode => !prevMode)

    
  }
  
  const handleRedirctuinUrl = (lastredirctuinUrl) => {
    setredirctuinUrl(lastredirctuinUrl);
  }
  console.log(isDarkMode)

  return (
    <>
      <BrowserRouter>
        <NavBar  user={user} handleLogout={handleLogout} toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
        <Routes>
          <Route index element={<Home isDarkMode={isDarkMode} handleRedirctuinUrl={handleRedirctuinUrl} />} />
          <Route path="login" element={<Login redirctuinUrl={redirctuinUrl} handleLogin={handleLogin} isUserLoggedIn={user.isUserLoggedIn} />} />
          <Route path="registration" element={<Registration  redirctuinUrl={redirctuinUrl} handleLogin={handleLogin} isUserLoggedIn={user.isUserLoggedIn} />} />
          <Route path="showjobs" element={<ShowJobs handleRedirctuinUrl={handleRedirctuinUrl} token={user.token} />} />
          <Route path="add-job" element={<Addjob handleRedirctuinUrl={handleRedirctuinUrl} token={user.token} />} />
          <Route path="showProposal" element={<ShowProposal />} />
          <Route path="*" element={<NotFound redirctuinUrl={redirctuinUrl}/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App