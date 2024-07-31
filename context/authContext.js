"use client"

import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  let tokenSent = null;

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (e) {
        console.error("Invalid token:", e);
        localStorage.removeItem('token');
      }
    }
  }, []);

  
  const login = (token) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    setUser(decoded);
  };
  
  const fetchUserData = async () => {
    tokenSent = localStorage.getItem('token')
    console.log('Token:', tokenSent)
    try {
      console.log(tokenSent)
      if (!tokenSent) {
        throw new Error('No token found');
      }

  
      const response = await axios.get('https://grupo5.devcorezulia.lat/cardcraft-backend/public/user-data.php', {
        headers: {
          'Authorization': `Bearer ${tokenSent}`
        }
      });
  
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };  
  const saveCard = async (card) => {
    tokenSent = localStorage.getItem('token');
    if (!tokenSent) {
      throw new Error('No token found');
    }

    try {
      const response = await axios.post('https://grupo5.devcorezulia.lat/cardcraft-backend/public/save-card.php', { card }, {
        headers: {
          Authorization: `Bearer ${tokenSent}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error guardando la carta:', error);
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    useEffect(() => {
      router.push('/login');
    }, []);
  };


  return (
    <AuthContext.Provider value={{ user, saveCard, login, logout, fetchUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};