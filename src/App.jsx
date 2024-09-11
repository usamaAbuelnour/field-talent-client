import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import NotFound from './pages/NotFound'
import ShowJobs from './pages/ShowJobs'; 



import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
      <NavBar/>
      <Routes >
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration/>} />
          <Route path="show-jobs" element={<ShowJobs />} />
          <Route path="*" element={<NotFound />} />
       
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
