'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { api } from '@/lib/fetch';
import { useRouter } from 'next/navigation';

const Register = () => {
  const [registration, setRegistration] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: { target: { value: string; name: string } }) => {
    const { value, name } = e.target;
    setRegistration((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const router = useRouter();

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await api.post('/session/customer-sign-in', {
        autoRegister: true,
        login: registration.email,
        password: registration.password,
        confirmPassword: registration.confirmPassword,
      });
      const token = response.data.data.token;
      localStorage.setItem('token', token);
      router.push('/');
    } catch (error: any) {
      console.log('Registration error: ', error.response);
    }
  };
  return (
    <div className='flex w-full h-screen'>
      <div className='hidden w-1/2 h-full sm:flex flex-col justify-center items-center'>
        <Image src='/signup_image.png' alt='Sign-up' width={512} height={512} />
      </div>

      <form
        className='flex flex-col items-center w-full sm:w-1/2'
        onSubmit={handleRegister}
      >
        <h2 className='mt-20 text-3xl font-bold text-center'>Sign-up</h2>
        <p className='mt-2 mb-40 opacity-75 text-center'>
          Enter your details to get started
        </p>
        <label className='opacity-75 mb-4 text-xs' htmlFor='email'>
          Email
          <input
            className='block border-2 w-60 lg:w-96 p-2 border-black rounded-2xl mt-4 mb-4'
            type='text'
            id='email'
            name='email'
            value={registration.email}
            onChange={handleChange}
            placeholder='Enter your email address'
            autoFocus
          />
        </label>
        <label className='opacity-75 mb-4 text-xs' htmlFor='password'>
          Create a password
          <input
            className='block border-2 w-60 lg:w-96 p-2 border-black rounded-2xl mt-4 mb-4'
            type='password'
            name='password'
            id='password'
            value={registration.password}
            onChange={handleChange}
            placeholder='Enter a strong password'
          />
        </label>
        <label className='opacity-75 mb-4 text-xs' htmlFor='confirm'>
          Confirm password
          <input
            className='block border-2 w-60 lg:w-96 p-2 border-black rounded-2xl mt-4 mb-4'
            type='password'
            name='confirmPassword'
            id='confirm'
            value={registration.confirmPassword}
            onChange={handleChange}
            placeholder='Confirm your password'
          />
        </label>
        <button
          className='bg-red-600 w-60 lg:w-96 rounded-2xl text-white p-2 font-bold'
          type='submit'
        >
          Sign up
        </button>
        <p className='text-xs mt-4'>
          Already have an account?{' '}
          <Link className='hover:text-blue-600' href='/login'>
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};
export default Register;
