import React, { useState } from 'react'
import { FaEye,FaEyeSlash  } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from "flowbite-react";
import { useDispatch } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/userSlice';
import OAuth from '../Components/OAuth';

export default function Register() {
  const [isClicked,setIsClicked] = useState(false)
  const [formData,setFormData] = useState({
    username:'',
    email:'',
    password:''
  })
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
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

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    
    if(!formData?.email ){
      toast.error('All feilds are required',{autoClose:2000})
    }

     if(formData.password.length < 8){
      toast.error('Password must be minimum 8 characters')
    }

    else{
      try {

        dispatch(signInStart())
        const res = await fetch('/api/auth/login',{
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(formData)
        })
  
        const data = await res.json()
  
        if(data.success === false){
          toast.error(data.message,{autoClose:1500})
          dispatch(signInFailure(data))
        }

        dispatch(signInSuccess(data))
        toast.success('Logged In Successfully',{autoClose:1000})
        navigate('/')
      } 
      
      catch (error) {
        toast.error(error.message,{autoClose:1500}) 
        dispatch(signInFailure())
      }
    }
  }

  return (
    <div className='w-full max-w-lg p-3 mx-auto'>
      <h1 className='navText text-orange-500 text-3xl py-7 md:text-center'>Login</h1>
      <form className='flex flex-col gap-7' onSubmit={handleSubmit}>
        <input type="email" id="email" className='w-full bg-slate-100 border-0 rounded-lg' placeholder='Email'  autoComplete='off' onChange={handleChange}/>
        <div className='flex justify-center items-center relative'>
          <input type="password" id="password" className='w-full bg-slate-100 border-0 rounded-lg ' placeholder='Password'  autoComplete='off' onChange={handleChange}/>
            <button type='button' onClick={()=>handleClick()} >
              {isClicked && <FaEyeSlash className='absolute right-3 top-3 cursor-pointer' onClick={showPassword}/>}
              {!isClicked && <FaEye className='absolute right-3 top-3 cursor-pointer' onClick={showPassword}/>}
            </button>
        </div>
        <button className='bg-orange-500 rounded-lg p-2 text-white font-semibold hover:shadow-lg uppercase focus:shadow-lg'>
          {
            loading ?
            <div className='flex gap-2 justify-center items-center'>
            <Spinner color='gray'/> Loading...
            </div> 
            :<span>Login</span>
          }
        </button>
      </form>
      <div className="flex justify-center items-center gap-3 mt-8 text-gray-500">
        <p className='border w-[50%] border-gray-500'></p>
        <p className='text-center text-gray-500 font-semibold'>OR</p>
        <p className='border w-[50%] border-gray-500'></p>
      </div>
      <div className='flex flex-col items-center justify-center mt-4'>
        <OAuth />
        <div className='flex mt-5 justify-center items-center gap-3'>
          <span className='text-gray-700'>Don't have an account?</span>
          <Link to='/register' className='font-semibold text-gray-700 hover:underline cursor-pointer'>Register</Link>
        </div>
      </div>
    </div>
  )
}
