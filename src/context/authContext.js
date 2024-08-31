import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCookie, deleteCookie, setCookie } from '../api/auth';
import { domain } from '../api/domain';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getCookie('token');
    setIsLoggedIn(!!token);
  }, []);

  const signOut = () => {
    const token = getCookie('token');
    const rtoken = getCookie('rtoken');

    axios.post(domain + 'accounts/logout/', {"refresh_token": rtoken}, {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    })
      .then((response) => {
        deleteCookie('token');
        deleteCookie("rtoken");
        setIsLoggedIn(false);
        router.push('/signin');
      })
      .catch((error) => {
        console.log(error?.response?.data?.message);
      });
  };

  const signIn = (token) => {
    setCookie('token', token, 7);
    setIsLoggedIn(true);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext easily
export const useAuth = () => {
  return useContext(AuthContext);
};

// Utility function to check if code is running in browser
const isBrowser = typeof window !== 'undefined';

// Modify these functions to be safe in both client and server environments
const safeGetCookie = (name) => {
  if (isBrowser) {
    return getCookie(name);
  }
  return null;
};

const safeSetCookie = (name, value, days) => {
  if (isBrowser) {
    setCookie(name, value, days);
  }
};

const safeDeleteCookie = (name) => {
  if (isBrowser) {
    deleteCookie(name);
  }
};

// Replace all instances of getCookie, setCookie, and deleteCookie with their safe versions