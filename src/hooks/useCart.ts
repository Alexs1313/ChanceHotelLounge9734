import { useEffect, useState } from 'react';
import { CartItem, MenuItem } from '../types';
import { StorageKeys, loadJSON, saveJSON } from '../storage';

let _cart: CartItem[] = [];
let _hydrated = false;
let _listeners: Array<() => void> = [];

const notify = () => _listeners.forEach(fn => fn());

const persist = () => saveJSON(StorageKeys.cart, _cart);

const hydrate = async () => {
  if (_hydrated) {
    return;
  }
  _hydrated = true;
  _cart = await loadJSON<CartItem[]>(StorageKeys.cart, []);
  notify();
};

export const useCart = () => {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const listener = () => forceUpdate(n => n + 1);
    _listeners.push(listener);
    hydrate();
    return () => {
      _listeners = _listeners.filter(fn => fn !== listener);
    };
  }, []);

  const addItem = (item: MenuItem) => {
    const existing = _cart.find(c => c.item.id === item.id);
    if (existing) {
      _cart = _cart.map(c =>
        c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c,
      );
    } else {
      _cart = [..._cart, { item, quantity: 1 }];
    }
    persist();
    notify();
  };

  const removeItem = (itemId: string) => {
    _cart = _cart.filter(c => c.item.id !== itemId);
    persist();
    notify();
  };

  const updateQuantity = (itemId: string, qty: number) => {
    if (qty <= 0) {
      removeItem(itemId);
      return;
    }
    _cart = _cart.map(c =>
      c.item.id === itemId ? { ...c, quantity: qty } : c,
    );
    persist();
    notify();
  };

  const clearCart = () => {
    _cart = [];
    persist();
    notify();
  };

  const totalItems = _cart.reduce((sum, c) => sum + c.quantity, 0);
  const totalPrice = _cart.reduce(
    (sum, c) => sum + c.item.price * c.quantity,
    0,
  );

  return {
    cart: _cart,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
};
