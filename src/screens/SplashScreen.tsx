import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, Typography } from '../theme';
import { getImage } from '../assets/images';

import { ChaoticOrbitLoader } from '../components/common/ChaoticOrbitLoader';

interface Props {
  onFinish: () => void;
}

const LOADER_DURATION = 3000;

export default function SplashScreen({ onFinish }: Props) {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(onFinish, LOADER_DURATION);
    return () => clearTimeout(timer);
  }, [fadeAnim, onFinish]);

  return (
    <ImageBackground
      source={getImage('SplashBackground')}
      style={styles.SplashScreenFacetChassis}
    >
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={[
          'rgba(11,36,82,0.55)',
          'rgba(11,36,82,0.15)',
          'rgba(10,15,30,0.35)',
        ]}
        style={StyleSheet.absoluteFill}
      />

      <Animated.View
        style={[
          styles.SplashScreenContentEnclave,
          { opacity: fadeAnim, paddingTop: insets.top + Spacing.xxl },
        ]}
      >
        <Text style={styles.SplashScreenTitleFiligree}>
          Chance{'\n'}Hotel Lounge
        </Text>
        <Text style={styles.SplashScreenSubtitleFiligree}>
          Guest Services Hub
        </Text>
      </Animated.View>

      <Animated.View
        style={[styles.SplashScreenCardsEnclave, { opacity: fadeAnim }]}
        pointerEvents="none"
      >
        <Image
          source={getImage('SplashCards')}
          style={styles.SplashScreenCardsImage}
        />
      </Animated.View>

      <View
        style={[
          styles.SplashScreenFooterEnclave,
          { paddingBottom: insets.bottom + Spacing.xxl },
        ]}
      >
        <ChaoticOrbitLoader size={28} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  SplashScreenFacetChassis: {
    flex: 1,
    backgroundColor: Colors.splashNavy,
  },
  SplashScreenContentEnclave: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  SplashScreenTitleFiligree: {
    ...Typography.display,
    color: Colors.textOffwhite,
    textAlign: 'center',
    lineHeight: 38,
  },

  SplashScreenSubtitleFiligree: {
    ...Typography.callout,
    fontStyle: 'italic',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
  SplashScreenCardsEnclave: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  SplashScreenCardsImage: {
    width: 232,
    height: 232,
    borderRadius: 50,
  },
  SplashScreenFooterEnclave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});
