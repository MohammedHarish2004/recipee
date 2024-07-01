import React, { useState } from 'react'
import { FaEye,FaEyeSlash  } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';

export default function Register() {
  const [isClicked,setIsClicked] = useState(false)

  const handleClick = ()=>{
    setIsClicked(prevState => !prevState)
  }

  const showPassword = ()=>{
    var password = document.getElementById('password')

    if(password.type === 'password'){
      password.type = 'text'
    }
    else{
      password.type = 'password'
    }
  }

  return (
    <div className='w-full max-w-lg p-3 mx-auto'>
      <h1 className='navText text-orange-500 text-3xl py-7 md:text-center'>Register</h1>
      <form className='flex flex-col gap-7'>
        <input type="email" id="email" className='w-full bg-slate-100 border-0 rounded-lg' placeholder='Email'  autoComplete='off'/>
        <input type="text" id="username" className='w-full bg-slate-100 border-0 rounded-lg' placeholder='Username'  autoComplete='off'/>
        <div className='flex justify-center items-center relative'>
          <input type="password" id="password" className='w-full bg-slate-100 border-0 rounded-lg ' placeholder='Password'  autoComplete='off'/>
            <button type='button' onClick={()=>handleClick()} >
              {isClicked && <FaEyeSlash className='absolute right-3 top-3 cursor-pointer' onClick={showPassword}/>}
              {!isClicked && <FaEye className='absolute right-3 top-3 cursor-pointer' onClick={showPassword}/>}
            </button>
        </div>
        <button className='bg-orange-500 rounded-lg p-2 text-white font-semibold hover:shadow-lg uppercase'>
          Register
        </button>
      </form>
      <div className="flex justify-center items-center gap-3 mt-8 text-gray-500">
        <p className='border w-[50%] border-gray-500'></p>
        <p className='text-center text-gray-500 font-semibold'>OR</p>
        <p className='border w-[50%] border-gray-500'></p>
      </div>
      <div className='flex flex-col items-center justify-center mt-4'>
        <div className='flex justify-center items-center border-2 border-gray-800 rounded-full w-10 h-10 cursor-pointer hover:bg-gray-200'>
          <FcGoogle className='w-7 h-7'/>
        </div>
        <div className='flex mt-5 justify-center items-center gap-3'>
          <span className='text-gray-700'>Already have an account?</span>
          <Link to='/login' className='font-semibold text-gray-700 hover:underline cursor-pointer'>Login</Link>
        </div>
      </div>
    </div>
  )
}
