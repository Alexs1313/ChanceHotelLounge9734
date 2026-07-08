import React from 'react';
import { StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { Colors, Radius, Shadows, Typography } from '../../theme';
import { PressableCard } from './PressableCard';

interface Props {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const PrimaryButton: React.FC<Props> = ({
  label,
  onPress,
  disabled,
  style,
}) => (
  <PressableCard
    onPress={onPress}
    disabled={disabled}
    style={[
      styles.PrimaryButtonFacetChassis,
      disabled ? styles.PrimaryButtonDisabled : undefined,
      style,
    ]}
  >
    <Text style={styles.PrimaryButtonLabelFiligree}>{label}</Text>
  </PressableCard>
);

const styles = StyleSheet.create({
  PrimaryButtonFacetChassis: {
    height: 56,
    backgroundColor: Colors.gold,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.button,
  },
  PrimaryButtonDisabled: {
    opacity: 0.4,
  },

  PrimaryButtonLabelFiligree: {
    ...Typography.title4,
    color: Colors.textOnGold,
    fontWeight: '600',
  },
});
