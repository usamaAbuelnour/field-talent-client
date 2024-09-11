import { BrowserRouter, Routes, Route } from "react-router-dom";


import NavBar from "./components/NavBar";
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import NotFound from './pages/NotFound'
import ShowJobs from './pages/ShowJobs'; 



import './App.css'
import { useState } from "react";


function App() {
  const userScema={
    name:"",
    email:"",
    token:"",
    isUserLoggedIn:false,
  }

  const [user, setUser] = useState(userScema
);

// <---------------------------------handeling---------------------->

 const handleLogin  =(token,name,email)=>{
  let newUser={...user}
  newUser.email=email
  newUser.name=name
  newUser.token=token
  newUser.isUserLoggedIn=true
  setUser(newUser)
 } 
 const handleLoginOut=()=>{
  let defultUserScema={...userScema}
  setUser(defultUserScema)


 }


  console.log( "LOGIN",)

  return (
    <>
      <BrowserRouter>
      <NavBar  isUserLoggedIn={user.isUserLoggedIn} handleLoginOut={handleLoginOut}/>
      <Routes >
          <Route index element={<Home  isUserLoggedIn={user.isUserLoggedIn} />} />
          <Route path="login" element={<Login handleLogin={handleLogin}  isUserLoggedIn={user.isUserLoggedIn}  />} />
          <Route path="registration" element={<Registration/>} />
          <Route path="showjobs" element={<ShowJobs />} />
          <Route path="*" element={<NotFound />} />
       
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
