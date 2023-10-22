"use client";
import ProductCard from "./components/ProductCard";
import ProductData from "./components/ProductData";
import Navbar from "./components/Navbar";

export default function Home() {
  const products = ProductData();
  return (
    <main>
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        {products.length > 0 &&
          products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.title}
              image={product.image_url}
              description={product.body}
              price={product.prices[0].net_price}
              member_price={product.prices[0].member_price}
            />
          ))}
      </div>
    </main>
  );
}
