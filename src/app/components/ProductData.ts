'use client';

import { getProducts } from '@/lib/fetch';
import { useState, useEffect } from 'react';

export type Product = {
  id: number;
  title: string;
  image_url: string;
  body: string;
  prices: [{ net_price: number; member_price: number }];
};

const ProductData = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getProducts();
      setProducts(data.data);
    }
    fetchData();
  }, []);
  return products;
};
export default ProductData;
