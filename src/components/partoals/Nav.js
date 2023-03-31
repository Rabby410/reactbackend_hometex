import React from 'react';
import $ from 'jquery';
import Swal from 'sweetalert2';
import axios from 'axios';
import Logo from './../../assets/img/hometex-logo.png';
import Constants from '../../Constants';
import GlobalFunction from './../../assets/GlobalFunction';

export default function Nav() {

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logout from admin panel!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Logout!'
          }).then((result) => {
            if (result.isConfirmed) {
              let token=localStorage.getItem('token');
              if(token){
                var config = {
                  method: 'post',
                  maxBodyLength: Infinity,
                  url: `${Constants.BASE_URL}/logout`,
                  headers: { 
                    'Authorization': 'Bearer '+token+''
                  }
                };
                
                axios(config)
                .then(function (response) {
                    GlobalFunction.logOut();
                })
                .catch(function (error) {
                  console.log(error);
                });
              }
            }
          })
    }

    const handleSidebar = () => {
       $('body').toggleClass('sb-sidenav-toggled') 
    }


  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-theme">
            {/* <!-- Navbar Brand--> */}
            <a className="navbar-brand ps-3" href="index.html"><img src={Logo} alt={'Hometex Bangladesh'} className={'img-thumbnail w-25'}/></a>
            {/* <!-- Sidebar Toggle--> */}
            <button onClick={handleSidebar} className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i className="fas fa-bars"></i></button>
            
            
            {/* <!-- Navbar--> */}
            <ul className="navbar-nav align-items-center ms-auto me-3 me-lg-4">
            <p className='text-white'>{localStorage.name != undefined ? localStorage.name: null}</p>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" href="#!">Settings</a></li>
                        <li><a className="dropdown-item" href="#!">Activity Log</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><button onClick={handleLogout} className="dropdown-item">Logout</button></li>
                    </ul>
                </li>
            </ul>
        </nav>
  )
}
