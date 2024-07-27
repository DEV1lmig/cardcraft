"use client"

import { useState, useTransition } from "react";
import Image from "next/image";
import axios from "axios";
import { useAuth } from '@/context/authContext';
import Head from "next/head"; // Import Head for metadata handling
import { metadata } from './metadata'; // Import metadata
import { useRouter } from 'next/navigation';

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const formData = new FormData(e.target); // Automatically gather form data
  
        const response = await axios.post('https://grupo5.devcorezulia.lat/cardcraft-backend/public/login.php', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Response data:', response.data);
  
        if (response.data.token) {
          login(response.data.token);
          router.push('/profile');
        }
      } catch (error) {
        console.error('Error during form submission:', error);
      }
    });
  };

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-transparent p-6">
        {/* Image Section */}
        <div className="hidden md:block md:w-1/2 h-full">
          <div className="relative w-full h-full">
            <Image
              src="/images/backgroundLogin.png" // Ensure you have a relevant image for the login page.
              alt="CartCraft Login"
              className="w-full h-full object-cover"
              fill={true}
            />
          </div>
        </div>
        
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col items-center justify-center bg-white rounded-lg shadow-lg max-w-md">
          <h1 className="text-4xl font-bold text-blue-700 mb-4">
            Login to <span className="text-green-500">CartCraft</span>
          </h1>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
              <input 
                type="email" 
                name="email"
                placeholder="Email" 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <input 
                type="password" 
                name="password"
                placeholder="Password" 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button 
              type="submit" 
              className="w-full px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300"
              disabled={isPending}
            >
              {isPending ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}