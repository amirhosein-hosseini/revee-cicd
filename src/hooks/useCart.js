// hooks/useCart.js

import { useState, useEffect } from 'react';
import { getLocalStorage, setLocalStorage } from './localStorage';

const useCart = () => {
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedCart = getLocalStorage('cart', []);
    setCart(storedCart);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      setLocalStorage('cart', cart);
    }
  }, [cart, isLoaded]);

  const handleAddToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  return { cart, handleAddToCart, removeFromCart, isLoaded };
};

export default useCart;