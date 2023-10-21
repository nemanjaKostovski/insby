import Link from 'next/link';

const Navbar = () => {
  const logout = () => {
    localStorage.removeItem('token');
  };

  return (
    <nav className='h-16 mt-5 border-b-2 text-right w-full'>
      <Link
        className='rounded-full border-2 pl-1.5 pr-1.5 m-10 text-3xl text-red-600 hover:text-red-400'
        href='/login'
        onClick={logout}
      >
        X
      </Link>
    </nav>
  );
};
export default Navbar;
