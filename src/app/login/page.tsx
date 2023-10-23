'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { api } from '@/lib/fetch';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: { target: { value: string; name: string } }) => {
    const { value, name } = e.target;
    setCredentials((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const router = useRouter();

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await api.post('/session/customer-sign-in', {
        login: credentials.email,
        password: credentials.password,
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
      <div className='bg-red-700 hidden w-1/2 h-full sm:flex flex-col justify-center items-center'>
        <Image src='/login_image.png' alt='Sign-up' width={512} height={512} />
      </div>

      <form
        className='flex flex-col justify-center items-center w-full sm:w-1/2'
        onSubmit={handleLogin}
      >
        <h2 className='text-2xl font-bold'>Log in</h2>
        <label className='opacity-75 mb-4 text-sm' htmlFor='email'>
          Email address
          <input
            className='block border-2 w-60 h-11 lg:w-96 p-2 border-black rounded-full mt-4 mb-4 placeholder-black'
            type='text'
            id='email'
            name='email'
            value={credentials.email}
            onChange={handleChange}
            placeholder='Enter your email address'
            autoFocus
          />
        </label>
        <label className='opacity-75 mb-4 text-sm' htmlFor='password'>
          Enter password
          <input
            className='block border-2 w-60 h-11 lg:w-96 p-2 border-black rounded-full mt-4 mb-4 placeholder-black'
            type='password'
            id='password'
            name='password'
            value={credentials.password}
            onChange={handleChange}
            placeholder='Enter your password'
          />
        </label>
        <button
          className='bg-black w-60 h-11 lg:w-96 rounded-full text-white p-2 font-bold'
          type='submit'
        >
          Log in
        </button>
        <p className='text-xs mt-6'>
          Don&apos;t have an account?&nbsp;
          <Link className='hover:text-blue-600' href='/register'>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};
export default Login;
