"use client";

import Loading from '@/components/Loading';
import { useAuth } from '@/context/authContext';
import Image from 'next/image';
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
        if (data) {
          setUserData(data);
        }
      };
      getUserData();
    }
  }, [user, router, fetchUserData]);

  if (!user || !userData) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">Perfil</h1>
        <p className="text-lg text-gray-700">Bienvenido, {userData.username}!</p>
        <div>
          <h2 className="text-2xl font-bold text-blue-700 mt-6">Cartas ganadas</h2>
          {userData.wonCards && userData.wonCards.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
              {userData.wonCards.map((card, index) => (
                <div key={index} className="relative w-full h-0 pb-[100%] rounded-lg overflow-hidden shadow-lg">
                  <Image 
                    src={`/images/${card.card_image_url}.webp`} 
                    alt={card.card_name} 
                    fill 
                    className='w-full h-full object-cover rounded-lg' 
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-gray-600">Sin cartas ganadas todavia.</p>
          )}
        </div>
      </div>
    </div>
  );
}
