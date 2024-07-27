"use client"

import Link from 'next/link';
import { useAuth } from './../context/authContext';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-3xl font-bold">CartCraft</h1>
      <nav>
        <Link href="/">Home</Link>
        {user ? (
          <>
            <Link href="/profile" className="ml-4">Protected Page</Link>
            <button onClick={logout} className="ml-4">Logout</button>
          </>
        ) : (
          <>
            <Link href="/login" className="ml-4">Login</Link>
            <Link href="/register" className="ml-4">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}