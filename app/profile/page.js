// app/protected/profile.js
"use client";

import Loading from '@/components/Loading';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Profile() {

  const { user, fetchUserData } = useAuth();
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      const getUserData = async () => {
        const data = await fetchUserData();
        if (data){
          setUserData(data);
        }
      }
      getUserData();
    }
  }, [user, router, fetchUserData]);

  if (!user || !userData) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">Perfil</h1>
        <p className="text-lg text-gray-700">Bienvenido, {userData.username}!</p>
      </div>
    </div>
  );
}