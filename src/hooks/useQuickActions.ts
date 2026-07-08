import { useEffect, useState } from 'react';
import { QuickActionsState } from '../types';
import { StorageKeys, loadJSON, saveJSON } from '../storage';

const DEFAULT: QuickActionsState = { doNotDisturb: false };

let _state: QuickActionsState = DEFAULT;
let _hydrated = false;
let _listeners: Array<() => void> = [];

const notify = () => _listeners.forEach(fn => fn());

const persist = () => saveJSON(StorageKeys.quickActions, _state);

const hydrate = async () => {
  if (_hydrated) {
    return;
  }
  _hydrated = true;
  _state = await loadJSON<QuickActionsState>(StorageKeys.quickActions, DEFAULT);
  notify();
};

export const useQuickActions = () => {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const listener = () => forceUpdate(n => n + 1);
    _listeners.push(listener);
    hydrate();
    return () => {
      _listeners = _listeners.filter(fn => fn !== listener);
    };
  }, []);

  const toggleDoNotDisturb = () => {
    _state = { ..._state, doNotDisturb: !_state.doNotDisturb };
    persist();
    notify();
  };

  return {
    quickActions: _state,
    toggleDoNotDisturb,
  };
};
