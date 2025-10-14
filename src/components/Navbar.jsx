import React from 'react'
//import logo from '../assets/logo.png'

export default function Navbar() {
  return (
    <>
    <nav className="navbar bg-body-tertiary rounded-4">
    <div className="container mx-4 ">
    <a className="navbar-brand fs-2 fw-bold text-secondary" href="#">
    {/* <img className='m-3' src={logo} alt="Logo" width="50"/> */}
      <i className="bi bi-lightning-charge-fill text-success"></i> ClaPos
    </a>
  </div>
</nav>
    </>
    
  )
}
