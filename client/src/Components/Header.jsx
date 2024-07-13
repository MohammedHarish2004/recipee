import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { RiMenu2Line } from "react-icons/ri";
import { Drawer, Dropdown } from 'flowbite-react';
import {useDispatch, useSelector} from 'react-redux'
import profile from '../assets/profile.png'
import { Avatar } from "flowbite-react";
import Swal from "sweetalert2";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signOutSuccess } from "../redux/userSlice.js";
import { FaSignOutAlt, FaUserAlt } from "react-icons/fa";

export default function Header() {

    const [isOpen, setIsOpen] = useState(false);
    const {currentUser} = useSelector(state=>state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleClose = () => setIsOpen(false);
    
    const handleLogout = ()=>{
      Swal.fire({
        title: 'Are you sure?',
        text: "Want to logout!",
        icon: 'error',
        color:'#fff',
        background:"rgb(58, 58, 58)",
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, logout !',
      }).then(async(result)=>{
  
        if(result.isConfirmed){
          const res = await fetch('/api/auth/logout')
          const data = await res.json()
  
          if(data.success == false){
            return
          }
          dispatch(signOutSuccess(data))
          toast.success('Logged out successfully',{
            theme: "dark",
            autoClose:1500,
          });
          navigate('/login')
        }
      })
    }

  return (
    <header className='shadow-md bg-orange-500 py-2 sm:px-8'>
      <div className='flex justify-between md:justify-between'>

      <div className='flex justify-center items-center px-4 md:hidden' >
          <button onClick={() => setIsOpen(true)}>
              <RiMenu2Line className='w-7 h-7 text-white'/>
          </button>
        </div>

        <NavLink to='/' className='rounded-xl p-1 px-5'>
          <span className="self-center whitespace-nowrap text-2xl font-bold navbarLogo text-white">R</span>
          <span className="self-center whitespace-nowrap text-2xl font-semibold navbarLogo2 text-white">ecipee</span>
        </NavLink>

        <div className=' justify-center text-lg items-center gap-4  text-white navText hidden md:flex'>
          <NavLink 
            to='/' 
            className={({ isActive }) => isActive ? 'hover:underline text-black font-semibold' : 'hover:underline '}
          >
            Home
          </NavLink>
          <NavLink 
            to='/search' 
            className={({ isActive }) => isActive ? 'hover:underline text-black font-semibold' : 'hover:underline '}
          >
            Recipes
          </NavLink>
          <NavLink 
            to='/favorites' 
            className={({ isActive }) => isActive ? 'hover:underline text-black font-semibold' : 'hover:underline '}
          >
            Favorites
          </NavLink>
        </div>

        {
          currentUser ?
          (
          <Dropdown inline arrowIcon={false} label={<Avatar className='me-3' img={profile}/>} className="bg-gray-800 hover:text-black p-1 z-50">
            <Dropdown.Header className="text-white font-medium ">
              User : {currentUser.username}
            </Dropdown.Header>
            {
              currentUser.isAdmin &&
             <>
              <Dropdown.Item as={Link} to={'/dashboard?tab=dash'} className="text-white hover:text-black hover:bg-slate-600" icon={FaUserAlt}>
              Dashboard
              </Dropdown.Item>
              <Dropdown.Divider />
             </>
            }
            <Dropdown.Item as={'div'} className="text-white hover:text-black" icon={FaSignOutAlt}  onClick={handleLogout}>
              <span >
                Logout
              </span>
            </Dropdown.Item>
          </Dropdown>
          )
          :
          <div className='flex justify-center items-center navText'>
            <Link to='/login' className='justify-center items-center bg-transparent border-2 border-white p-1.5 px-4 rounded-xl text-white hover:bg-white hover:text-orange-500  me-3 sm:me-0'>
              Login
            </Link>
          </div>
        }

        <Drawer open={isOpen} onClose={handleClose} position='right'>
        <Drawer.Header title="Recipee" />
        <Drawer.Items>
        <div className='flex flex-col justify-center gap-4 font-semibold text-black text-base navText '>
          <NavLink 
            to='/' 
            className={({ isActive }) => isActive ? 'hover:underline text-orange-500' : 'hover:underline'}
            onClick={()=>setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink 
            to='/search' 
            className={({ isActive }) => isActive ? 'hover:underline text-orange-500 ' : 'hover:underline'}
            onClick={()=>setIsOpen(false)}
          >
            Recipes
          </NavLink>
          <NavLink 
            to='/favorites' 
            className={({ isActive }) => isActive ? 'hover:underline text-orange-500' : 'hover:underline'}
          >
            Favorites
          </NavLink>
        </div>
        </Drawer.Items>
      </Drawer>
      </div>
    </header>
  );
}
