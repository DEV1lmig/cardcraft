// app/protected/profile.js
"use client";

import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Profile() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">Profile Page</h1>
        <p className="text-lg text-gray-700">Welcome, {user.username}!</p>
        <p className="text-lg text-gray-700">Email: {user.email}</p>
        {/* Add more user details as needed */}
      </div>
    </div>
  );
}