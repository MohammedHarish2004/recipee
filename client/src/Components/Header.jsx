import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { RiMenu2Line } from "react-icons/ri";
import { Drawer } from 'flowbite-react';
import {useSelector} from 'react-redux'
import profile from '../assets/profile.png'
import { Avatar } from "flowbite-react";

export default function Header() {

    const [isOpen, setIsOpen] = useState(false);
    const {currentUser} = useSelector(state=>state.user)
    const handleClose = () => setIsOpen(false);

  return (
    <header className='shadow-md bg-orange-500 py-2 sm:px-8'>
      <div className='flex justify-between md:justify-between'>

      <div className='flex justify-center items-center px-4 md:hidden' >
          <button onClick={() => setIsOpen(true)}>
              <RiMenu2Line className='w-7 h-7 text-white'/>
          </button>
        </div>

        <NavLink to='/' className='rounded-xl p-1 px-3'>
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
            to='/favorite' 
            className={({ isActive }) => isActive ? 'hover:underline text-black font-semibold' : 'hover:underline '}
          >
            Favorites
          </NavLink>
        </div>

        {
          currentUser ?
          <Link to='/dashboard' className='flex me-3 sm:me-0 justify-center items-center cursor-pointer'>
            <Avatar img={profile} alt="profile"  rounded />
          </Link>
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
            to='/favorite' 
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
