import { useEffect, useState } from 'react';
import { ClimateSettings } from '../types';
import { StorageKeys, loadJSON, saveJSON } from '../storage';

export const CURRENT_ROOM_TEMP = 21;

const DEFAULT: ClimateSettings = {
  targetTemp: 22,
  mode: 'Cool',
  fanSpeed: 'Med',
  timer: 'Off',
};

let _settings: ClimateSettings = DEFAULT;
let _hydrated = false;
let _listeners: Array<() => void> = [];

const notify = () => _listeners.forEach(fn => fn());

const hydrate = async () => {
  if (_hydrated) {
    return;
  }
  _hydrated = true;
  _settings = await loadJSON<ClimateSettings>(StorageKeys.climate, DEFAULT);
  notify();
};

export const useClimate = () => {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const listener = () => forceUpdate(n => n + 1);
    _listeners.push(listener);
    hydrate();
    return () => {
      _listeners = _listeners.filter(fn => fn !== listener);
    };
  }, []);

  const applySettings = (next: ClimateSettings) => {
    _settings = next;
    saveJSON(StorageKeys.climate, _settings);
    notify();
  };

  return { settings: _settings, applySettings };
};
