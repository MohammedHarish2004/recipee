import { Button } from 'flowbite-react'
import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Search from './Pages/Search'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Details from './Pages/Details'
export default function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/search' element={<Search />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/details' element={<Details />}/>
    </Routes>
   </BrowserRouter>
  )
}
