import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function Login() {

  const navigate = useNavigate();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(email && password){
      navigate('/')
    }
    else{
      document.getElementById("enter-password").hidden = false; 
    }
  }

  return (
    <div className='login'>
      <div className='login-img-container'>
        <img className='login-image' src='https://picsum.photos/800/850?grayscale' alt='random photos'/>
      </div>
      <div className='login-form'>
        <h1 className='form-title display-3'>Login</h1>
        <form id='login' onSubmit={handleSubmit}>
          <div className='mb-5'>
            <label htmlFor='email' className='form-label display-4'>
              Email
            </label>
            <input
              type='email'
              className='form-control'
              id='email'
              placeholder='Enter your Email adress..'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className='mb-5'>
            <label htmlFor='password' className='form-label display-4'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              id='password'
              placeholder='Enter your Password...'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <input
            type='submit'
            className='btn btn-outline-dark form-control'
            value='Login'

          />  
          <p hidden id='enter-password'>Please fill the form and then click Login again</p>
        </form>
      </div>
    </div>
  )
}
