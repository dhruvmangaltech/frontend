import React, { useState } from 'react'
import Sidebar from '../Sidebar'
import { useUserStore } from '../../store/store'
import useCheckPermission from '../../utils/checkPermission'
import hamburgerIcon from '../../assets/img/menu-hamburger.svg'
import crossIcon from '../../assets/img/cross.svg'
import './routewithsidebar.scss'
import siteLogo from '../../assets/img/gamma-logo.svg'

const RouteWithSidebar = ({ children }) => {
  const {userDetails} = useUserStore((state) => state)
  const { isHidden } = useCheckPermission()
  const [open, setOpen] = useState(false)

  return (
    <>
    <div className='p-1 d-flex justify-content-between'> 
      {/* <div className='site-logo'><img style={{ display : 'none' }} src={siteLogo} alt="" /></div> */}
      <button className='menu-btn' style={{zIndex : '999', position : 'relative'}} onClick={()=> setOpen((current)=> !current)}><img src={open ? crossIcon : hamburgerIcon} /></button>
    </div>
      <Sidebar open={open}/>

      <main className='content mt-3 px-1 px-sm-2' style={{ marginBottom: '100px' }}>
        {/* <Navbar /> */}
        {children}
      </main>
    </>
  )
}

export default RouteWithSidebar
