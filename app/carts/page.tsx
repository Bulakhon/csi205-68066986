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
    useEffect(() => checkLogin(router, '/carts'), [router])
  const { products, setProducts, carts, setCarts } = useContext(globalDataContext);

  const removeFromCart = (product: Product) => {
    // remove product from carts 
    setCarts(carts.filter((p: Product) => p.id !== product.id))

    // append product back to products
    setProducts([ ... products, product])
  }


  return (
    <div className="mt-4 bg-cyan-50 w-3xl mx-auto h-100 overflow-y-auto border border-gray-300">
      <div className="grid grid-cols-5 gap-4">
        {carts.map((product: Product) => (
          <div key={product.id}>
          <div className="relative w-37.5 h-37.5">
            <Image
              src={product.thumbnailUrl}
              alt="image"
              width={150}
              height={150}
            />
            <div className="absolute bottom-0 inset-x-0 bg-black/30 text-white text-sm px-1 line-clamp-2">
            {product.title}
            </div>
            <div className="absolute top-0 right-0 bg-black/30 text-white text-sm px-1">
              ${product.price}
            </div>
          </div>
          <div className={buttonStyles({className: 'bg-red-500'})}
          onClick={() => removeFromCart(product)}>
              Remove
            </div>
            </div>
        ))}
      </div>
    </div>
  );
}