import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';
import { Colors } from '../theme';
import { TabParamList } from '../types';
import { getImage } from '../assets/images';
import HomeScreen from '../screens/home/HomeScreen';
import { MenuStack } from './MenuStack';
import { EventsStack } from './EventsStack';
import { NearbyStack } from './NearbyStack';
import ClimateScreen from '../screens/climate/ClimateScreen';
import { SavedStack } from './SavedStack';

const Tab = createBottomTabNavigator<TabParamList>();

const tabIcon =
  (imageKey: string) =>
  ({ color }: { color: string }) =>
    (
      <Image
        source={getImage(imageKey)}
        style={[tabStyles.icon, { tintColor: color }]}
      />
    );

export const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="HomeTab"
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: Colors.tabActive,
      tabBarInactiveTintColor: Colors.tabInactive,
      tabBarStyle: tabStyles.bar,
      tabBarLabelStyle: tabStyles.label,
      tabBarItemStyle: tabStyles.item,
    }}
  >
    <Tab.Screen
      name="HomeTab"
      component={HomeScreen}
      options={{ tabBarLabel: 'Home', tabBarIcon: tabIcon('TabHome') }}
    />
    <Tab.Screen
      name="DiningTab"
      component={MenuStack}
      options={{ tabBarLabel: 'Dining', tabBarIcon: tabIcon('TabDining') }}
    />
    <Tab.Screen
      name="EventsTab"
      component={EventsStack}
      options={{ tabBarLabel: 'Events', tabBarIcon: tabIcon('TabEvents') }}
    />
    <Tab.Screen
      name="NearbyTab"
      component={NearbyStack}
      options={{ tabBarLabel: 'Nearby', tabBarIcon: tabIcon('TabNearby') }}
    />
    <Tab.Screen
      name="ClimateTab"
      component={ClimateScreen}
      options={{ tabBarLabel: 'Climate', tabBarIcon: tabIcon('TabClimate') }}
    />
    <Tab.Screen
      name="SavedTab"
      component={SavedStack}
      options={{ tabBarLabel: 'Saved', tabBarIcon: tabIcon('TabSaved') }}
    />
  </Tab.Navigator>
);

const tabStyles = StyleSheet.create({
  bar: {
    backgroundColor: Colors.background,
    borderTopColor: Colors.cardBorder,
    borderTopWidth: 1,
    height: 88,
    paddingTop: 10,
  },
  item: {
    paddingTop: 2,
  },
  label: {
    fontSize: 9.5,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  icon: {
    width: 21,
    height: 21,
    resizeMode: 'contain',
  },
});
