import React from 'react'
import { useState } from 'react';
import { TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as Actions from '../store/actions';
import { useDispatch } from 'react-redux'
import { EMAIL_REGEX, PASSWORD_REGEX } from '../constants/index';
const Signout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();



  const defaultValues = {
    userName: '',
    email: '',
    password: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues,
  });

  const [Error, setError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleRegisterForm = async (data) => {
    setError('');
    setIsLoading(false);
    try {
      setIsLoading(true);
      const response = await dispatch(Actions.registerAction(data.userName, data.email, data.password));

      if (response) throw response;

      setIsLoading(false);
      navigate('/Signin');
      setError('')
    } catch (error) {
      setIsLoading(false);
      setError('')
      if (typeof error === 'string') {
        setError(error);
      } 
    }
  };




  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit(handleRegisterForm)} className='flex flex-col gap-4'>
        <TextField
          style={{ width: '100%', margin: '5px' }}
          type="text"
          label="Name"
          variant="outlined"
          error={Boolean(errors.userName)}
          helperText={errors.userName ? errors.userName.message : ''}
          {...register('userName', {
            required: 'Please enter username',
          })}
        />
        <TextField
          style={{ width: '100%', margin: '5px' }}
          type="email"
          label="Email"
          variant="outlined"
          error={Boolean(errors.email)}
          helperText={errors.email ? errors.email.message : ''}
          {...register('email', {
            required: 'Please enter email address',
            pattern: {
              value: EMAIL_REGEX,
              message: 'Please enter a valid email address',
            },
          })}
        />

        <TextField
          style={{ width: '100%', margin: '5px' }}
          type="password"
          label="Password"
          variant="outlined"
          error={Boolean(errors.password)}
          helperText={errors.password ? errors.password.message : ''}
          {...register('password', {
            required: 'Please enter password',
            pattern: {
              value: PASSWORD_REGEX,
              message: 'Please enter a valid password',
            },
          })}
        />
        <button
          disabled={isLoading}
          type='submit'

          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'

        >
          {isLoading ? 'Loading...' : 'Sign Up'}
        </button>

      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {Error && <p className='text-red-500 mt-5'>{Error}</p>}
    </div>
  )
}

export default Signout