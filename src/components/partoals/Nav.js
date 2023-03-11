import React from 'react'
import $ from 'jquery'
import Logo from './../../assets/img/hometex-logo.png'

export default function Nav() {
    const handleSidebar = () => {
       $('body').toggleClass('sb-sidenav-toggled') 
    }


  return (
    <nav class="sb-topnav navbar navbar-expand navbar-dark bg-theme">
            {/* <!-- Navbar Brand--> */}
            <a class="navbar-brand ps-3" href="index.html"><img src={Logo} alt={'Hometex Bangladesh'} className={'img-thumbnail w-25'}/></a>
            {/* <!-- Sidebar Toggle--> */}
            <button onClick={handleSidebar} class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>
            
            
            {/* <!-- Navbar--> */}
            <ul class="navbar-nav align-items-center ms-auto me-3 me-lg-4">
            <p className='text-white'>Admin</p>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="#!">Settings</a></li>
                        <li><a class="dropdown-item" href="#!">Activity Log</a></li>
                        <li><hr class="dropdown-divider" /></li>
                        <li><a class="dropdown-item" href="#!">Logout</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
  )
}
