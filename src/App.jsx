import { BrowserRouter, Routes, Route } from "react-router-dom";


import NavBar from "./components/NavBar";
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import NotFound from './pages/NotFound'
import ShowJobs from './pages/ShowJobs';
import Footer from "./components/Footer";


import './App.css'
import { useState, useEffect } from "react";

function App() {
  const userSchema = {
    name: "",
    email: "",
    token: "",
    isUserLoggedIn: false,
  }

  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : userSchema;
  });

  useEffect(() => {
    sessionStorage.setItem('user', JSON.stringify(user));
  }, [user]);

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
  console.log (user)

  return (
    <>
      <BrowserRouter>
        <NavBar  user={user} handleLogout={handleLogout} />
        <Routes>
          <Route index element={<Home isUserLoggedIn={user.isUserLoggedIn} />} />
          <Route path="login" element={<Login handleLogin={handleLogin} isUserLoggedIn={user.isUserLoggedIn} />} />
          <Route path="registration" element={<Registration handleLogin={handleLogin} isUserLoggedIn={user.isUserLoggedIn} />} />
          <Route path="showjobs" element={<ShowJobs token={user.token} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App