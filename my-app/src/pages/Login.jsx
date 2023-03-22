import React, { useState, useContext } from 'react'
import AuthContext from '../context/AuthContext';


export default function Login() {

  const { handleLogin, loginError } = useContext(AuthContext)
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(email && password){
      handleLogin(email,password)
    }
  }

  return (
    <div className='login'>
      <div className='login-img-container'>
        <img className='login-image' src='https://picsum.photos/800/850?grayscale' alt='random photos'/>
      </div>
      <div className='login-form'>
        <h1 className='form-title display-3'>Login</h1>
        <form id='login' onSubmit={(e) => handleSubmit(e)}>
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
          <div className={loginError ? 'alert alert-danger' : 'alert alert-danger d-none'} role='alert'>Please check your credentials</div>
        </form>
      </div>
    </div>
  )
}
