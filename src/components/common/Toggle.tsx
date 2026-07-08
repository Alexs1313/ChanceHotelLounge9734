import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Colors } from '../../theme';

interface Props {
  value: boolean;
  onValueChange: () => void;
}

export const Toggle: React.FC<Props> = ({ value, onValueChange }) => (
  <Pressable onPress={onValueChange} hitSlop={8}>
    <View
      style={[
        styles.ToggleTrackChassis,
        { backgroundColor: value ? Colors.toggleTrackOn : Colors.toggleTrackOff },
      ]}
    >
      <View
        style={[
          styles.ToggleKnobSigil,
          {
            backgroundColor: value ? Colors.toggleKnobOn : Colors.toggleKnobOff,
            alignSelf: value ? 'flex-end' : 'flex-start',
          },
        ]}
      />
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  ToggleTrackChassis: {
    width: 42,
    height: 25,
    borderRadius: 13,
    padding: 2,
    justifyContent: 'center',
  },
  ToggleKnobSigil: {
    width: 21,
    height: 21,
    borderRadius: 11,
  },
});
