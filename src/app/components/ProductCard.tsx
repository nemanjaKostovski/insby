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
    <div className='flex m-4 max-h-96 relative'>
      <Image
        src={image}
        alt='product'
        width={544}
        height={368}
        className='rounded-3xl w-auto h-auto'
      />
      <div className='ml-12 mt-6'>
        <h2 className='text-2xl'>{name}</h2>
        <p className='opacity-50 mt-4 w-96'>{description}</p>
        <div className='mt-1 absolute bottom-2 left-50'>
          <div className='bg-black w-28 h-11 inline-block text-white text-center pt-2 rounded-full text-lg'>
            {price}
          </div>
          {token && (
            <div className='bg-red-600 w-28 h-11 inline-block ml-8 text-white text-center pt-2 rounded-full text-lg'>
              {member_price}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
