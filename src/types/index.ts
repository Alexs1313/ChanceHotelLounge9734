export interface OnboardingSlide {
  key: string;
  image: string;
  eyebrow?: string;
  title: string;
  description: string;
  cta: string;
  showSkip: boolean;
}

export interface Reservation {
  code: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
}

export interface QuickActionsState {
  doNotDisturb: boolean;
}

export type TabParamList = {
  HomeTab: undefined;
  DiningTab: undefined;
  EventsTab: undefined;
  NearbyTab: undefined;
  ClimateTab: undefined;
  SavedTab: undefined;
};

export type MenuCategory = 'Mains' | 'Starters' | 'Desserts' | 'Drinks';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  prepTime: number;
  category: MenuCategory;
  description: string;
  image: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export type MenuStackParamList = {
  Menu: undefined;
  Cart: undefined;
};

export type EventCategory =
  | 'Wine & Culinary'
  | 'Live Entertainment'
  | 'Wellness'
  | 'Outdoor Adventures';

export interface EventItem {
  id: string;
  name: string;
  category: EventCategory;
  location: string;
  day: number; // day of July 2026
  dateLabel: string;
  timeLabel: string;
  short: string;
  description: string[];
  image: string;
}

export type EventsFilter = 'All' | 'Today' | 'This Week' | 'Live';

export type EventsStackParamList = {
  Events: undefined;
  EventDetail: { eventId: string };
};

export interface Attraction {
  id: string;
  name: string;
  lat: number;
  lon: number;
  short: string;
  description: string[];
  image: string;
}

export type NearbyStackParamList = {
  Nearby: undefined;
  NearbyDetail: { attractionId: string };
};

export type ClimateMode = 'Cool' | 'Heat' | 'Fan' | 'Auto';
export type FanSpeed = 'Low' | 'Med' | 'High' | 'Auto';
export type TimerOption = 'Off' | '1h' | '2h' | '4h' | '8h';

export interface ClimateSettings {
  targetTemp: number;
  mode: ClimateMode;
  fanSpeed: FanSpeed;
  timer: TimerOption;
}

export type SavedStackParamList = {
  Saved: undefined;
  EventDetail: { eventId: string };
  NearbyDetail: { attractionId: string };
};
