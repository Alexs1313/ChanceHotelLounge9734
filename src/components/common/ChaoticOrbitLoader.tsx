import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import { Colors } from '../../theme';

interface Props {
  size?: number;
  speed?: number;
}

export const ChaoticOrbitLoader: React.FC<Props> = ({
  size = 26,
  speed = 1.5,
}) => {
  const dotA = useRef(new Animated.Value(0)).current;
  const dotB = useRef(new Animated.Value(0)).current;
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const orbitMs = speed * 1000;

    const loopA = Animated.loop(
      Animated.timing(dotA, {
        toValue: 1,
        duration: orbitMs,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    const loopB = Animated.loop(
      Animated.timing(dotB, {
        toValue: 1,
        duration: orbitMs,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    const loopSpin = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: orbitMs * 1.667,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    loopA.start();
    loopSpin.start();
    // second dot is half a period behind
    const t = setTimeout(() => loopB.start(), orbitMs / 2);

    return () => {
      loopA.stop();
      loopB.stop();
      loopSpin.stop();
      clearTimeout(t);
    };
  }, [dotA, dotB, spin, speed]);

  const range = [0, 0.25, 0.5, 0.75, 1];
  const half = size * 0.5;

  const dotStyle = (value: Animated.Value, color: string) => ({
    backgroundColor: color,
    width: size * 0.6,
    height: size * 0.6,
    borderRadius: (size * 0.6) / 2,
    opacity: value.interpolate({
      inputRange: range,
      outputRange: [0.65, 0.3, 0.65, 1, 0.65],
    }),
    transform: [
      {
        translateX: value.interpolate({
          inputRange: range,
          outputRange: [half, 0, -half, 0, half],
        }),
      },
      {
        scale: value.interpolate({
          inputRange: range,
          outputRange: [0.737, 0.474, 0.737, 1, 0.737],
        }),
      },
    ],
  });

  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        styles.ChaoticOrbitFacetChassis,
        { width: size, height: size, transform: [{ rotate }] },
      ]}
    >
      <Animated.View
        style={[styles.ChaoticOrbitDotSigil, dotStyle(dotA, Colors.loaderBlue)]}
      />
      <Animated.View
        style={[styles.ChaoticOrbitDotSigil, dotStyle(dotB, Colors.loaderGold)]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  ChaoticOrbitFacetChassis: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ChaoticOrbitDotSigil: {
    position: 'absolute',
  },
});
