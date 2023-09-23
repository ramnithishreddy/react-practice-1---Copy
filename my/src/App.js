import './App.css'
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import {useState} from 'react'
import Home from './Resource/Home'
import Login from './Resource/Login'
import SignUp from './Resource/SignUp'
import Issue from './Resource/Issue'
import Tickets from './Resource/Tickets'
import Nav from './Resource/Nav'
import Logout from './Resource/Logout'

function App() {
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('user')) || null )
  //console.log(userInfo,'1212app')
  return (
    <BrowserRouter>
    <div className="App">
      <h1>Resource Support Team</h1>
      <Nav />
    {/*   <nav>
        {
          userInfo ?
          <>
          <Link to='/'> Home </Link>
          <Link to='/Logout'> Logout </Link>
          </>
          :
          <>
          <Link to='/Login'> Login </Link>
          <Link to='/Signup'> SignUp </Link>
          </>
        }
      </nav> */}
      {/* <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          {  userInfo  ? 
            <>
              <li>
                <Link to='/Login'>Login</Link>
              </li>
              <li>
                <Link to='/SignUp'>SignUp</Link>
              </li>
            </>
           : 
            <>
            { userInfo.role === 'employee' ?
            <li><Link to='/Tickets'>Tickets</Link></li>
            :
            <li><Link to='/Issue'>Issue</Link></li>
            }
              <li>Welcome, {userInfo.username} ({userInfo.role})</li>
              <li>
                <button ><LogoutIcon /></button>
              </li>
            </>
          }
        </ul>
      </nav> */}  
        <Routes>
          <Route path='/' element={<Home userInfo = {userInfo} />}/>
            <Route path='Login' element={<Login setUserInfo = {setUserInfo} />} />
            <Route path='SignUp' element={<SignUp />} />
            <Route path='Tickets' element={userInfo ? <Tickets /> : <Navigate to='/Login' />} />
            <Route path='Issue' element={userInfo ? <Issue /> : <Navigate to='/Login' />} />
            <Route path='Logout' element={<Logout />} />
          </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
