import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SavedStackParamList } from '../types';
import SavedScreen from '../screens/saved/SavedScreen';
import EventDetailScreen from '../screens/events/EventDetailScreen';
import NearbyDetailScreen from '../screens/nearby/NearbyDetailScreen';

const Stack = createNativeStackNavigator<SavedStackParamList>();

export const SavedStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Saved" component={SavedScreen} />
    <Stack.Screen name="EventDetail" component={EventDetailScreen} />
    <Stack.Screen name="NearbyDetail" component={NearbyDetailScreen} />
  </Stack.Navigator>
);
