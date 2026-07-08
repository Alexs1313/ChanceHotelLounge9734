import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EventsStackParamList } from '../types';
import EventsScreen from '../screens/events/EventsScreen';
import EventDetailScreen from '../screens/events/EventDetailScreen';

const Stack = createNativeStackNavigator<EventsStackParamList>();

export const EventsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Events" component={EventsScreen} />
    <Stack.Screen name="EventDetail" component={EventDetailScreen} />
  </Stack.Navigator>
);
