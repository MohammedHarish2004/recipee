import { Button, Drawer, Sidebar } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { CgMenuGridR } from "react-icons/cg";
import { HiArrowSmRight, HiChartPie, HiShoppingBag } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

export default function DashMobileSidebar() {

    const [isOpen, setIsOpen] = useState(false);
    const {currentUser} = useSelector(state=>state.user)
    const handleClose = () => setIsOpen(false);
    const [tab,setTab] = useState()
    const location = useLocation()
  
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    setTab(tabFromUrl)
  },[location.search])

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
    <div>
      <div className="flex ms-3 sm:ms-10 mt-5">
        <button className='' onClick={() => setIsOpen(true)}>{<CgMenuGridR className='w-10 h-10'/>}</button>
      </div>
      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Header title="Sidebar" />
        <Drawer.Items>
        <Sidebar aria-label="Dashboard sidebar">
            <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Sidebar.Item as={Link} to={'/dashboard?tab=dash'} onClick={()=>setIsOpen(false)} active={tab == "dash"} icon={HiChartPie}>
                Dashboard
                </Sidebar.Item>
                <Sidebar.Item as={Link}  to={'/dashboard?tab=cuisine'} onClick={()=>setIsOpen(false)} active={tab=='cuisine'} icon={HiShoppingBag}>
                Cuisine
                </Sidebar.Item>
                <Sidebar.Item  icon={HiArrowSmRight}>
                <span onClick={handleLogout} className='cursor-pointer'>Logout</span>
                </Sidebar.Item>
            </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
        </Drawer.Items>
      </Drawer>
    </div>
  )
}
