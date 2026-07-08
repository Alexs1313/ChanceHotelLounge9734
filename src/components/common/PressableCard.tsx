import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';

interface Props {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const PressableCard: React.FC<Props> = ({
  children,
  onPress,
  disabled,
  style,
}) => (
  <Pressable
    onPress={onPress}
    disabled={disabled}
    style={({ pressed }) => [
      style,
      pressed && !disabled ? styles.PressableCardPressed : undefined,
    ]}
  >
    {children}
  </Pressable>
);

const styles = StyleSheet.create({
  PressableCardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.985 }],
  },
});
