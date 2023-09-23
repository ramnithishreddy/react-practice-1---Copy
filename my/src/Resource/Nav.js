import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import LogoutIcon from '@mui/icons-material/Logout'

export default function Nav() {
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('user')) || null )
  return (
     <div className="container">
        <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/" ><HomeIcon fontSize='large' color='Dark' /></Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                { !userInfo ?
                <>
              <li className="nav-item">
                <Link className="nav-link" to="/Login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Signup">SignUp</Link>
              </li>
              </>
              :
              <>
              <li className="nav-item">
                <Link className="nav-link" to="/Tickets">Tickets</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Issue">Issue</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Logout"><LogoutIcon/></Link>
              </li>
              {/* <Outlet /> */}
             </>
              }
            </ul>
          </div>
        </nav>
        </div>
  )
}
