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
import Profile from './Pages/Profile';
import AdminDashboard from './Pages/AdminDashboard';
import OrderManagment from './Pages/OrderManagment';
import UserManagment from './Pages/UserManagment';
import Protected_route from './Components/Protected_route';
import OverView from './Pages/OverView';
import Unauthorized from './Pages/Unauthorized';


function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/product' element={<Product />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/notfound' element={< Unauthorized />} />

        {/* /// admin routes //  */}
        
{/* not found page ata bar bar  */}

        <Route path="/admin" element={ <Protected_route role={"admin"} > <AdminDashboard/> </Protected_route> } >

        <Route index element={<OverView/>} />
        <Route path="/admin/ord_managment" element={<OrderManagment/>} />
        <Route path="/admin/user_managment" element={<UserManagment/>} />
        
        </Route>
        
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
          <ToastContainer position="top-right" autoClose={2000} theme="colored" />
        </Cart_Provider>
      </Auth_provider>
    </div>
  )
}

export default App
