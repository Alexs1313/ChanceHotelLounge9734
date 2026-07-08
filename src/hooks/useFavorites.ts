import { useEffect, useState } from 'react';
import { StorageKeys, loadJSON, saveJSON } from '../storage';

let _favorites: string[] = [];
let _hydrated = false;
let _listeners: Array<() => void> = [];

const notify = () => _listeners.forEach(fn => fn());

const persist = () => saveJSON(StorageKeys.favorites, _favorites);

const hydrate = async () => {
  if (_hydrated) {
    return;
  }
  _hydrated = true;
  _favorites = await loadJSON<string[]>(StorageKeys.favorites, []);
  notify();
};

export const useFavorites = () => {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const listener = () => forceUpdate(n => n + 1);
    _listeners.push(listener);
    hydrate();
    return () => {
      _listeners = _listeners.filter(fn => fn !== listener);
    };
  }, []);

  const isFavorite = (id: string) => _favorites.includes(id);

  const toggleFavorite = (id: string) => {
    _favorites = _favorites.includes(id)
      ? _favorites.filter(f => f !== id)
      : [..._favorites, id];
    persist();
    notify();
  };

  return { favorites: _favorites, isFavorite, toggleFavorite };
};
