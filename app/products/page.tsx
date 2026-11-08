"use client";

import { useContext, useEffect } from "react";
import { globalDataContext } from "../layout";
import { type Product } from "@/data/products";
import Image from "next/image";
import { buttonStyles } from "@/components/tailgrids/core/button";
import { useRouter } from "next/navigation";
import { checkLogin } from "@/utils/login";

export default function Page() {
    const router = useRouter()
    useEffect(() => checkLogin(router, '/products'), [router])
  const { products, setProducts, carts, setCarts } = useContext(globalDataContext);

  const addToCart = (product: Product) => {
    // remove product from product
    setProducts(products.filter((p: Product) => p.id !== product.id))

    // append product to carts
    setCarts([ ... carts, product])
  }


  return (
    <div className="mt-4 bg-cyan-50 w-3xl mx-auto h-100 overflow-y-auto border border-gray-300">
      <div className="grid grid-cols-5 gap-4">
        {products.map((product: Product) => (
          <div key={product.id}>
          <div className="relative w-37.5 h-37.5">
            <Image
              src={product.thumnailUrl}
              alt="image"
              width={150}
              height={150}
            />
            <div className="absolute bottom-0 inset-x-0 bg-black/30 text-white text-sm px-1 line-clamp-2">
            {product.title}
            </div>
            <div className="absolute top-0 right-0 bg-black/30 text-white text-ssm px-1">
              ${product.price}
            </div>
          </div>
          <div className={buttonStyles({className: 'bg-green-500'})}
          onClick={() => addToCart(product)}>
              Add to Carts
            </div>
            </div>
        ))}
      </div>
    </div>
  );
}
