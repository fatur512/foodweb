// components/ui/NavbarClient.js
"use client";

import Link from "next/link";

export default function Navbar({ pathname = "/", isLoggedIn = false }) {
  const showLoginButton = !isLoggedIn && pathname !== "/login";

  return (
    <nav className="py-5 bg-amber-400 text-white flex justify-around items-center px-8 md:px-16 shadow-md">
      <div>
        <h1 className="text-3xl font-extrabold tracking-wide cursor-pointer select-none">Makan Yuk</h1>
      </div>
      <div className="flex gap-12 items-center">
        <Link
          href="/"
          className={`text-lg font-semibold transition-colors duration-300 hover:text-yellow-200 ${
            pathname === "/" ? "underline decoration-yellow-300" : ""
          }`}
        >
          Home
        </Link>
        <Link
          href="/products"
          className={`text-lg font-semibold transition-colors duration-300 hover:text-yellow-200 ${
            pathname === "/products" ? "underline decoration-yellow-300" : ""
          }`}
        >
          Our Products
        </Link>

        {showLoginButton && (
          <>
            <Link
              href="/login"
              className="bg-blue-700 hover:bg-blue-800 px-6 py-3 rounded-lg font-semibold text-lg transition-shadow shadow-md hover:shadow-lg"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
