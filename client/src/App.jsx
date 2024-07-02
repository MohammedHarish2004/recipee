import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Search from './Pages/Search'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Details from './Pages/Details'
import Header from './Components/Header'
import { ToastContainer } from 'react-toastify';
import Dashboard from './Pages/Dashboard'
import PrivateRoute from './Components/PrivateRoute'

export default function App() {
  return (
   <BrowserRouter>
   <Header />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/search' element={<Search />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/details' element={<Details />}/>
      <Route element={<PrivateRoute />}>
        <Route path='/dashboard' element={<Dashboard />}/>
      </Route>
    </Routes>
    <ToastContainer />
   </BrowserRouter>
  )
}
