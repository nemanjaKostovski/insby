'use client';
import Image from 'next/image';

type Product = {
  image: string;
  name: string;
  description: string;
  price: number;
  member_price: number | null;
};

const ProductCard = ({
  image,
  name,
  description,
  price,
  member_price,
}: Product) => {
  const token = localStorage.getItem('token');
  return (
    <div className='flex m-4 max-h-96 md:h-96'>
      <Image
        src={image}
        alt='product'
        width={544}
        height={368}
        className='rounded-3xl w-1/2'
      />
      <div className='ml-2 sm:ml-12 lg:mt-6 w-1/2 md:w-80 lg:w-[500px] relative'>
        <h2 className='text-2xl'>{name}</h2>
        <p className='hidden sm:block opacity-50 mt-4 overflow-hidden sm:h-32 md:h-48 lg:h-60'>
          {description}
        </p>
        <div className='mt-1 absolute bottom-2'>
          <div className='bg-black w-20 md:w-28 h-11 inline-block text-white text-center pt-2 rounded-full text-lg'>
            {price}
          </div>
        </div>
        <div className='mt-1 absolute bottom-2 left-14 sm:left-24'>
          {token && (
            <div className='bg-red-600 w-20 md:w-28 h-11 inline-block ml-8 text-white text-center pt-2 rounded-full text-lg'>
              {member_price}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
