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
        autoRegister: true,
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
      <div className='bg-red-700 w-1/2 h-full flex flex-col items-center pt-24'>
        <Image src='/login_image.png' alt='Sign-up' width={512} height={512} />
      </div>

      <form
        className='flex flex-col justify-center items-center w-1/2'
        onSubmit={handleLogin}
      >
        <h2 className='text-2xl font-bold'>Log in</h2>
        <label className='opacity-75 mb-4 text-xs' htmlFor='email'>
          Email address
          <input
            className='block border-2 w-96 p-2 border-black rounded-2xl mt-4 mb-4'
            type='text'
            id='email'
            name='email'
            value={credentials.email}
            onChange={handleChange}
            placeholder='Enter your email address'
          />
        </label>
        <label className='opacity-75 mb-4 text-xs' htmlFor='password'>
          Enter password
          <input
            className='block border-2 w-96 p-2 border-black rounded-2xl mt-4 mb-4'
            type='password'
            id='password'
            name='password'
            value={credentials.password}
            onChange={handleChange}
            placeholder='Enter a strong password'
          />
        </label>
        <button
          className='bg-black w-96 rounded-2xl text-white p-2 font-bold'
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
