import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [clientUsername, setClientUsername] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [clientPassword, setClientPassword] = useState('')
  const [employeeUsername, setEmployeeUsername] = useState('')
  const [employeeEmail, setEmployeeEmail] = useState('')
  const [employeePassword, setEmployeePassword] = useState('')
  const [btnC, setBtnC] = useState(false)
  const [btnE, setBtnE] = useState(false)
  const errorMessage = ''
  const nav = useNavigate()

  const handleClientSubmit = (e) => {
    e.preventDefault();
    const ClientData = {
      username: clientUsername,
      email: clientEmail,
      role: 'client',
      password: clientPassword
    }
    
    let existingData = JSON.parse(localStorage.getItem('user')) || []
    existingData = Array.isArray(existingData) ? existingData : []
    existingData.push(ClientData)
    localStorage.setItem('user', JSON.stringify(existingData));
    alert('Client Signup Successful!');
    nav('/Login')
   // console.log(existingData,'3131signUp')
  };

  const handleEmployeeSubmit = (e) => {
    e.preventDefault();
    const EmployeeData ={
      username: employeeUsername,
      email: employeeEmail,
      role: 'employee',
      password: employeePassword
    }
    
    let existingData = JSON.parse(localStorage.getItem('user')) || []
    existingData = Array.isArray(existingData) ? existingData : []
    existingData.push(EmployeeData)
    localStorage.setItem('user', JSON.stringify(existingData));
    alert('Employee Signup Successful!');
    nav('/Login')
  };
  const handleClickC = () =>{
    setBtnC(true)
    setBtnE(false)
  }
  const handleClickE = () => {
    setBtnE(true)
    setBtnC(false)
  }

  return (
    <div>
      <h2>Sign Up Page</h2>

      <button onClick={handleClickC}> Client </button>

      <button onClick={handleClickE}> Employee </button>
     
  {
      btnC ? 
        <form onSubmit={handleClientSubmit}>         
             <h3>Client Signup</h3>
        <div>
            <label>Username</label>
            <input
              type='username'
              value={clientUsername}
              onChange={(e) => setClientUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type='email'
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type='password'
              value={clientPassword}
              onChange={(e) => setClientPassword(e.target.value)}
              required
            />
          </div>
          <button type='submit'>Sign Up as Client</button>
        </form>
       : ''
  } 

  {  
       btnE ?
        <form onSubmit={handleEmployeeSubmit}>
           <h3>Employee Signup</h3>
        <div>
            <label>Username</label>
            <input
              type='username'
              value={employeeUsername}
              onChange={(e) => setEmployeeUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type='email'
              value={employeeEmail}
              onChange={(e) => setEmployeeEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type='password'
              value={employeePassword}
              onChange={(e) => setEmployeePassword(e.target.value)}
              required
            />
          </div>
          <button type='submit'>Sign Up as Employee</button>
        </form>
        : ''
}
      {errorMessage && <p className='error-message'>{errorMessage}</p>}

      <p>
        Already have an account? <Link to='/Login'>Login here</Link>
      </p>
    </div>
  );
};

export default SignUp;
