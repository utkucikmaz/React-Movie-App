import React, {useContext, useState} from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../auth/firebase-config';
import { async } from '@firebase/util';

export default function Register() {

  const navigate = useNavigate();
  const { credentials, handleCredentials } = useContext(AuthContext);
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ alertSuccess, setAlertSuccess] = useState ('alert alert-success d-none')
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    let displayName = firstName + ' ' +lastName
    try{
      let user = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName : displayName })
      navigate('/')
    }catch(err){
      alert(err);
    }
  }

  return (
    <div className='register'>
      <div className='register-form'>
        <h1 className='form-title display-3'>Register</h1>
        <form id='register' onSubmit={(e) => handleSubmit(e)}>
          <div className='mb-3'>
            <label htmlFor='first-name' className='form-label display-4'>First Name</label>
            <input type='text' className='form-control' id='first-name' placeholder='Enter your first name...'
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            required
            /> 
          </div>
          <div className='mb-3'>
            <label htmlFor='last-name' className='form-label display-4'>Last Name</label>
            <input type='text' className='form-control' id='last-name' placeholder='Enter your last name...'
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            required
            /> 
          </div>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label display-4'>Email</label>
            <input type='email' className='form-control' id='email' placeholder='Enter your email...'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            /> 
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label display-4'>Password</label>
            <input type='password' className='form-control' id='password' placeholder='Enter your password...'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            />  
          </div>
          <input type='submit' className='btn btn-outline-dark form-control' value='Register'/>
          <div className={alertSuccess} role='alert'>You have registered successfully</div>
        </form>
      </div>
      <div className='form-image register-img-container'>
       <img className='register-image' src='https://picsum.photos/800/850?grayscale' alt='random photos'/>
      </div>

    </div>
  )
}
