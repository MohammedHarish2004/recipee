import { Sidebar } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi"
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function DashSidebar() {

    const {currentUser} = useSelector(state=>state.user)

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
    <Sidebar aria-label="Dashboard sidebar" >
    <Sidebar.Items>
      <Sidebar.ItemGroup>
        <Sidebar.Item as={Link} to={'/dashboard?tab=dash'} active={tab == "dash"} icon={HiChartPie}>
          Dashboard
        </Sidebar.Item>
        <Sidebar.Item as={Link}  to={'/dashboard?tab=cuisine'} active={tab=='cuisine'} icon={HiShoppingBag}>
          Cuisine
        </Sidebar.Item>
        <Sidebar.Item onClick={handleLogout} className='cursor-pointer' icon={HiArrowSmRight}>
         <span>Logout</span>
        </Sidebar.Item>
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>
  )
}
