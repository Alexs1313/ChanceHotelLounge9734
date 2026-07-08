import React, { useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Layout, Spacing, Typography } from '../../theme';
import { getImage } from '../../assets/images';
import { onboardingSlides } from '../../data/onboarding';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { PressableCard } from '../../components/common/PressableCard';

interface Props {
  onFinish: () => void;
}

export default function OnboardingScreen({ onFinish }: Props) {
  const insets = useSafeAreaInsets();
  const [index, setIndex] = useState(0);

  const slide = onboardingSlides[index];
  const isLast = index === onboardingSlides.length - 1;

  const handleNext = () => {
    if (isLast) {
      onFinish();
    } else {
      setIndex(i => i + 1);
    }
  };

  return (
    <ImageBackground
      source={getImage(slide.image)}
      style={styles.OnboardingScreenFacetChassis}
    >
      <LinearGradient
        colors={[
          'rgba(9,13,24,0.92)',
          'rgba(9,13,24,0.45)',
          'rgba(9,13,24,0.20)',
          'rgba(9,13,24,0.72)',
          'rgba(9,13,24,0.96)',
        ]}
        locations={[0, 0.24, 0.5, 0.82, 1]}
        style={StyleSheet.absoluteFill}
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.OnboardingScreenBodyEnclave,
            { paddingTop: insets.top + Spacing.lg },
          ]}
        >
          {/* Progress dots */}
          <View style={styles.OnboardingScreenDotsRowLintel}>
            {onboardingSlides.map((s, i) => (
              <View
                key={s.key}
                style={[
                  styles.OnboardingScreenDotSigil,
                  i === index && styles.OnboardingScreenDotActiveSigil,
                ]}
              />
            ))}
          </View>

          {/* Copy */}
          <View style={styles.OnboardingScreenCopyEnclave}>
            {slide.eyebrow ? (
              <Text style={styles.OnboardingScreenEyebrowFiligree}>
                {slide.eyebrow}
              </Text>
            ) : null}
            <Text style={styles.OnboardingScreenTitleFiligree}>
              {slide.title}
            </Text>
            <Text style={styles.OnboardingScreenDescriptionFiligree}>
              {slide.description}
            </Text>
          </View>
        </View>

        {/* Footer controls */}
        <View
          style={[
            styles.OnboardingScreenFooterEnclave,
            { paddingBottom: insets.bottom + Spacing.lg },
          ]}
        >
          <PrimaryButton label={slide.cta} onPress={handleNext} />
          {slide.showSkip ? (
            <PressableCard
              onPress={onFinish}
              style={styles.OnboardingScreenSkipChassis}
            >
              <Text style={styles.OnboardingScreenSkipFiligree}>Skip</Text>
            </PressableCard>
          ) : null}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  OnboardingScreenFacetChassis: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  OnboardingScreenBodyEnclave: {
    flex: 1,
    paddingHorizontal: Layout.screenPaddingH,
  },
  OnboardingScreenDotsRowLintel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: Spacing.md,
    marginBottom: Spacing.xl,
  },

  OnboardingScreenDotSigil: {
    width: 6,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.dotInactive,
  },

  OnboardingScreenDotActiveSigil: {
    width: 24,
    backgroundColor: Colors.dotActive,
  },
  OnboardingScreenCopyEnclave: {
    marginTop: Spacing.xs,
  },
  OnboardingScreenEyebrowFiligree: {
    ...Typography.caption1,
    color: Colors.gold,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
  },
  OnboardingScreenTitleFiligree: {
    ...Typography.display,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  OnboardingScreenDescriptionFiligree: {
    ...Typography.subheadline,
    color: Colors.textPrimary,
    lineHeight: 24,
    opacity: 0.92,
  },
  OnboardingScreenFooterEnclave: {
    paddingHorizontal: Layout.screenPaddingH,
    paddingTop: Spacing.lg,
  },
  OnboardingScreenSkipChassis: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
    marginTop: Spacing.xs,
  },

  OnboardingScreenSkipFiligree: {
    ...Typography.callout,
    color: Colors.gold,
    fontWeight: '600',
  },
});
