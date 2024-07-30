"use client"

import Link from 'next/link';
import { useAuth } from './../context/authContext';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-3xl font-bold">CardCraft</h1>
      <nav>
        <Link href="/">Inicio</Link>
        {user ? (
          <>
            <Link href="/profile" className="ml-4">Perfil</Link>
            <Link href="/hub" className='ml-4'>Hub</Link>
            <button onClick={logout} className="ml-4">Cerrar Sesión</button>
          </>
        ) : (
          <>
            <Link href="/login" className="ml-4">Iniciar Sesión</Link>
            <Link href="/register" className="ml-4">Registro</Link>
          </>
        )}
      </nav>
    </header>
  );
}