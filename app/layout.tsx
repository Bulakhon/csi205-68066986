"use client";
import "./globals.css";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Button, buttonStyles } from "@/components/tailgrids/core/button";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createContext, useEffect, useState } from "react";
import { fetchProducts, Product } from "@/data/products";
import { Badge } from "@/components/tailgrids/core/badge";
import { doLogout } from "@/utils/login";
import User from "@/components/user";


export const globalDataContext = createContext<any>(null);

export default function RootLayout({ children }: LayoutProps<"/">) {
  const pathname = usePathname();
  const router = useRouter()
  // console.log(pathname)
  const [products, setProducts] = useState<Product[]>([]);
  const [carts, setCarts] = useState<Product[]>([]);

  // useEffect(() => {
  //   fetchProducts()
  //     .then((data) => setProducts(data as Product[]))
  //     .catch((error) => setProducts([] as Product[]));
  // }, []);

  
useEffect(() => {
  fetchProducts()
    .then((data) => setProducts(data as Product[]))
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}, []);


  useEffect(() => {
    console.log(products);
  }, [products]);

  const handleLogout = () => {
    doLogout(router, '/login')
  }

  return (
    <globalDataContext.Provider
      value={{ products, setProducts, carts, setCarts }}
    >
      <html>
        <body>
          <Header />
          <User />
          <nav className="mt-4 flex justify-center gap-4">
            <Link
              href={"/"}
              className={buttonStyles({
                appearance: pathname === "/" ? "fill" : "outline",
                variant: "primary",
                size: "sm",
              })}
            >
              Home
            </Link>

            <Link
              href={"/animetion"}
              className={buttonStyles({
                appearance: pathname === "/animetion" ? "fill" : "outline",
                variant: "primary",
                size: "sm",
              })}
            >
              Animetion
            </Link>

            <Link
              href={"/calculator"}
              className={buttonStyles({
                appearance: pathname === "/calculator" ? "fill" : "outline",
                variant: "primary",
                size: "sm",
              })}
            >
              Calculator
            </Link>

            <Link
              href={"/todos"}
              className={buttonStyles({
                appearance: pathname === "/todos" ? "fill" : "outline",
                variant: "primary",
                size: "sm",
              })}
            >
              Todos
            </Link>

            <Link
              href={"/products"}
              className={buttonStyles({
                appearance: pathname === "/products" ? "fill" : "outline",
                variant: "primary",
                size: "sm",
              })}
            >
              Products ({products.length})
            </Link>

            <div className="relative">
              <Link
                href={"/carts"}
                className={buttonStyles({
                  appearance: pathname === "/carts" ? "fill" : "outline",
                  variant: "primary",
                  size: "sm",
                })}
              >
                Carts
              </Link>
              <Badge
                size={"sm"}
                className="absolute -top-2 -right-2 bg-red-500 text-white"
              >
              {carts.length}
              </Badge>
            </div>
            <div className="relative">
              <Button
              appearance='outline'
              variant='danger'
              size='sm'
              className='ml-1'
              onClick={() => handleLogout()}
              >Logout</Button>
            </div>
          </nav>
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </globalDataContext.Provider>
  );
}
