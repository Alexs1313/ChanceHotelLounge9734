import { OnboardingSlide } from '../types';

export const onboardingSlides: OnboardingSlide[] = [
  {
    key: 'welcome',
    image: 'OnboardWelcome',
    eyebrow: 'CHANCE HOTEL EXPLORER',
    title: 'Welcome to Chance Hotel Explorer',
    description: 'Everything you need for a comfortable stay in one place.',
    cta: 'Continue',
    showSkip: true,
  },
  {
    key: 'events',
    image: 'OnboardEvents',
    title: 'Events & Attractions',
    description: 'Discover hotel events and nearby places worth visiting.',
    cta: 'Continue',
    showSkip: true,
  },
  {
    key: 'dining',
    image: 'OnboardDining',
    title: 'Dining Made Easy',
    description: 'Browse the restaurant menu and prepare your order before visiting.',
    cta: 'Continue',
    showSkip: true,
  },
  {
    key: 'stay',
    image: 'OnboardStay',
    title: 'Enjoy Your Stay',
    description: 'Control room climate, contact concierge and explore with ease.',
    cta: 'Get Started',
    showSkip: false,
  },
];
