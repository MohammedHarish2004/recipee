import React, { useEffect, useState } from 'react'
import DashSidebar from '../Dashboard/DashSidebar'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Dash from '../Dashboard/Dash'
import DashCuisine from '../Dashboard/DashCuisine'
import DashMobileSidebar from '../Dashboard/DashMobileSidebar'

export default function Dashboard() {
  const {currentUser} = useSelector(state=>state.user)

  const [tab,setTab] = useState()

  const location = useLocation()
  
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    setTab(tabFromUrl)
  },[location.search])
 
  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      <div className='hidden md:inline'>
          <DashSidebar />
      </div>
      <div className='md:hidden'>
        <DashMobileSidebar />
      </div>
        {currentUser.isAdmin && tab=='dash' && <Dash /> }
        {currentUser.isAdmin && tab=='cuisine' && <DashCuisine /> }
    </div>
  )
}
