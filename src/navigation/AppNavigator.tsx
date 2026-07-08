import React, { useState } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Colors } from '../theme';
import SplashScreen from '../screens/SplashScreen';

import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import { TabNavigator } from './TabNavigator';

type Phase = 'splash' | 'onboarding' | 'main';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
    card: Colors.backgroundElevated,
    text: Colors.textPrimary,
    border: Colors.divider,
    primary: Colors.gold,
    notification: Colors.gold,
  },
};

export default function AppNavigator() {
  const [phase, setPhase] = useState<Phase>('splash');

  const handleSplashFinish = () => setPhase('onboarding');

  const handleOnboardingFinish = () => setPhase('main');

  if (phase === 'splash') {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  if (phase === 'onboarding') {
    return <OnboardingScreen onFinish={handleOnboardingFinish} />;
  }

  return (
    <NavigationContainer theme={navTheme}>
      <TabNavigator />
    </NavigationContainer>
  );
}
