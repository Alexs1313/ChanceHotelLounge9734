import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageKeys = {
  onboardingDone: '@chances/onboardingDone',
  quickActions: '@chances/quickActions',
  cart: '@chances/cart',
  favorites: '@chances/favorites',
  climate: '@chances/climate',
};

export async function loadJSON<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export async function saveJSON(key: string, value: unknown): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    // persistence is best-effort
  }
}
