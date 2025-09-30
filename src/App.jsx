import React from 'react'
import { Auth_provider } from "./Context/Auth"
import Navbar from './Components/Navbar'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './Pages/Home'
import Login from './Pages/Login';
import Register from './Pages/Register';
import Product from './Pages/Product';
import { AnimatePresence } from "framer-motion";
import Detail from './Pages/Detail';
import Cart from './Pages/Cart';
import { Cart_Provider } from './Context/Cartcontext';


function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/product' element={<Product />} />
        <Route path='/detail' element={<Detail />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <div className='select-none bg-gradient-to-tr from-gray-100 to-gray-300 '>
      <Auth_provider>
        <Cart_Provider>
          <Router>
            <AppRoutes />
          </Router>
          <ToastContainer position="top-right" autoClose={2500} theme="colored" />
        </Cart_Provider>
      </Auth_provider>
    </div>
  )
}

export default App
