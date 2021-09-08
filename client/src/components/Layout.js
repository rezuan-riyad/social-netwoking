import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Sidenav } from 'materialize-css'
import { Link } from 'react-router-dom'

export default function Layout({ children }) {  
  const [username, setUsername] = useState('')
  /**
   * Materialize Sidenav is initialized once after each mounting.
   * return fn ensures Sidenav instance destroyed before component unmount.
   */ 
  useEffect( () => {
    var elem = document.querySelector('.sidenav')
    var instance = Sidenav.init(elem)

    return () => {
      instance.destroy()
    }
  },[])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    user ? setUsername(user) : setUsername('Profile')
  },[])

  const logoStyle = { fontSize: '22px'}
  
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  if(!localStorage.getItem('token')){
    return <Redirect to="/login" />
  }
  
  return (
    <>
      <nav>
        <div className="nav-wrapper container">
          <a href="#!" className="brand-logo" style={logoStyle} id="brand-logo">Social Network</a>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-small-only">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/authors">Authors</Link></li>
            <li>
              <Link to={`/authors/${username}`}>{username}</Link>
            </li>
            <li><Link to="#" onClick={handleLogout}>Logout</Link></li>
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo">
        <li><Link to={`/authors/${username}`}>{username}</Link></li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/authors">Authors</Link></li>
        <li><Link to="#" onClick={handleLogout}>Logout</Link></li>
      </ul>
      <div style={{ paddingTop: "2rem"}}>
      { children }
      </div>
    </>
  )
}