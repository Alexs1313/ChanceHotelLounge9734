import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MenuStackParamList } from '../types';
import MenuScreen from '../screens/dining/MenuScreen';
import CartScreen from '../screens/dining/CartScreen';

const Stack = createNativeStackNavigator<MenuStackParamList>();

export const MenuStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Menu" component={MenuScreen} />
    <Stack.Screen name="Cart" component={CartScreen} />
  </Stack.Navigator>
);
