import React, { useEffect, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Colors, Radius } from '../../theme';
import {
  ClimateMode,
  ClimateSettings,
  FanSpeed,
  TimerOption,
} from '../../types';
import { CURRENT_ROOM_TEMP, useClimate } from '../../hooks/useClimate';
import { PressableCard } from '../../components/common/PressableCard';
import { PrimaryButton } from '../../components/common/PrimaryButton';

const HVAC_MODES: ClimateMode[] = ['Cool', 'Heat', 'Fan', 'Auto'];
const FAN_SPEEDS: FanSpeed[] = ['Low', 'Med', 'High', 'Auto'];
const TIMERS: TimerOption[] = ['Off', '1h', '2h', '4h', '8h'];

const MIN_TEMP = 16;
const MAX_TEMP = 30;

const statusFor = (mode: ClimateMode): { label: string; color: string } => {
  switch (mode) {
    case 'Heat':
      return { label: 'Heating Active', color: Colors.warning };
    case 'Fan':
      return { label: 'Fan Running', color: Colors.textSecondary };
    case 'Auto':
      return { label: 'Auto Mode', color: Colors.climateBlue };
    default:
      return { label: 'Cooling Active', color: Colors.climateBlue };
  }
};

const Segment = ({
  label,
  active,
  variant,
  onPress,
}: {
  label: string;
  active: boolean;
  variant: 'blue' | 'neutral';
  onPress: () => void;
}) => {
  const activeStyle =
    variant === 'blue'
      ? styles.ClimateSegBlueActiveChassis
      : styles.ClimateSegNeutralActiveChassis;
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.ClimateSegChassis,
        active ? activeStyle : styles.ClimateSegInactiveChassis,
      ]}
    >
      <Text
        style={[
          styles.ClimateSegFiligree,
          active ? styles.ClimateSegActiveFiligree : undefined,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const CardLabel = ({ children }: { children: string }) => (
  <Text style={styles.ClimateCardLabelFiligree}>{children}</Text>
);

export default function ClimateScreen() {
  const { settings, applySettings } = useClimate();
  const [draft, setDraft] = useState<ClimateSettings>(settings);

  useEffect(() => {
    setDraft(settings);
  }, [settings]);

  const status = statusFor(settings.mode);

  const setTemp = (delta: number) =>
    setDraft(d => ({
      ...d,
      targetTemp: Math.max(MIN_TEMP, Math.min(MAX_TEMP, d.targetTemp + delta)),
    }));

  const handleApply = () => {
    applySettings(draft);
    Alert.alert(
      'Climate Updated',
      'Your room climate settings have been applied.',
    );
  };

  return (
    <View style={styles.ClimateScreenFacetChassis}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ClimateScreenScrollContent}
      >
        <View style={styles.ClimateScreenHeaderEnclave}>
          <Text style={styles.ClimateScreenEyebrowFiligree}>ROOM 1204</Text>
          <Text style={styles.ClimateScreenTitleFiligree}>Climate Control</Text>
        </View>

        {/* Current room */}
        <View style={styles.ClimateCurrentCardFacetChassis}>
          <View style={styles.ClimateGaugeEnclave}>
            <Text style={styles.ClimateGaugeValueFiligree}>
              {CURRENT_ROOM_TEMP}°
            </Text>
            <Text style={styles.ClimateGaugeUnitFiligree}>C</Text>
          </View>
          <View style={styles.ClimateCurrentTextEnclave}>
            <CardLabel>CURRENT ROOM</CardLabel>
            <Text style={styles.ClimateCurrentValueFiligree}>
              {CURRENT_ROOM_TEMP}°C
            </Text>
            <View style={styles.ClimateStatusRowLintel}>
              <View
                style={[
                  styles.ClimateStatusDotSigil,
                  { backgroundColor: status.color },
                ]}
              />
              <Text
                style={[styles.ClimateStatusFiligree, { color: status.color }]}
              >
                {status.label}
              </Text>
            </View>
          </View>
        </View>

        {/* Target temperature */}
        <View style={styles.ClimateCardFacetChassis}>
          <CardLabel>TARGET TEMPERATURE</CardLabel>
          <View style={styles.ClimateTargetRowLintel}>
            <PressableCard
              onPress={() => setTemp(-1)}
              style={styles.ClimateStepChassis}
            >
              <Text style={styles.ClimateStepFiligree}>−</Text>
            </PressableCard>
            <Text style={styles.ClimateTargetValueFiligree}>
              {draft.targetTemp}°C
            </Text>
            <PressableCard
              onPress={() => setTemp(1)}
              style={styles.ClimateStepChassis}
            >
              <Text style={styles.ClimateStepFiligree}>+</Text>
            </PressableCard>
          </View>
        </View>

        {/* HVAC mode */}
        <View style={styles.ClimateCardFacetChassis}>
          <CardLabel>HVAC MODE</CardLabel>
          <View style={styles.ClimateSegRowLintel}>
            {HVAC_MODES.map(m => (
              <Segment
                key={m}
                label={m}
                active={draft.mode === m}
                variant="blue"
                onPress={() => setDraft(d => ({ ...d, mode: m }))}
              />
            ))}
          </View>
        </View>

        {/* Fan speed */}
        <View style={styles.ClimateCardFacetChassis}>
          <CardLabel>FAN SPEED</CardLabel>
          <View style={styles.ClimateSegRowLintel}>
            {FAN_SPEEDS.map(f => (
              <Segment
                key={f}
                label={f}
                active={draft.fanSpeed === f}
                variant="neutral"
                onPress={() => setDraft(d => ({ ...d, fanSpeed: f }))}
              />
            ))}
          </View>
        </View>

        {/* Auto off timer */}
        <View style={styles.ClimateCardFacetChassis}>
          <CardLabel>AUTO OFF TIMER</CardLabel>
          <View style={styles.ClimateSegRowLintel}>
            {TIMERS.map(t => (
              <Segment
                key={t}
                label={t}
                active={draft.timer === t}
                variant="neutral"
                onPress={() => setDraft(d => ({ ...d, timer: t }))}
              />
            ))}
          </View>
        </View>

        <PrimaryButton
          label="Apply Changes"
          onPress={handleApply}
          style={styles.ClimateApplyChassis}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  ClimateScreenFacetChassis: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  ClimateScreenScrollContent: {
    paddingTop: 55,
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 10,
  },
  ClimateScreenHeaderEnclave: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 5,
  },
  ClimateScreenEyebrowFiligree: {
    fontSize: 10.5,
    color: '#555555',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },

  ClimateScreenTitleFiligree: {
    fontSize: 23,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 3,
  },

  // Shared card
  ClimateCardFacetChassis: {
    backgroundColor: Colors.card,
    borderColor: Colors.cardBorder,
    borderWidth: 1,
    borderRadius: Radius.md,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  ClimateCardLabelFiligree: {
    fontSize: 9.5,
    color: '#444444',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },

  // Current room
  ClimateCurrentCardFacetChassis: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 21,
    backgroundColor: Colors.card,
    borderColor: Colors.cardBorder,
    borderWidth: 1,
    borderRadius: Radius.lg,
    paddingHorizontal: 22,
    paddingVertical: 20,
  },
  ClimateGaugeEnclave: {
    width: 126,
    height: 126,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ClimateGaugeValueFiligree: {
    fontSize: 29,
    fontWeight: '600',
    color: Colors.textPrimary,
    letterSpacing: -1,
  },
  ClimateGaugeUnitFiligree: {
    fontSize: 9.5,
    color: '#555555',
    letterSpacing: 1,
    marginTop: 3,
  },
  ClimateCurrentTextEnclave: {
    flex: 1,
  },
  ClimateCurrentValueFiligree: {
    fontSize: 27,
    fontWeight: '600',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
    marginTop: 8,
  },
  ClimateStatusRowLintel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },

  ClimateStatusDotSigil: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  ClimateStatusFiligree: {
    fontSize: 11.5,
    fontWeight: '500',
  },

  // Target temperature
  ClimateTargetRowLintel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  ClimateStepChassis: {
    width: 38,
    height: 38,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },

  ClimateStepFiligree: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textOnGold,
    lineHeight: 22,
  },
  ClimateTargetValueFiligree: {
    fontSize: 29,
    fontWeight: '600',
    color: Colors.gold,
    letterSpacing: -0.5,
  },

  // Segments
  ClimateSegRowLintel: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  ClimateSegChassis: {
    flex: 1,
    height: 33,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  ClimateSegInactiveChassis: {
    backgroundColor: Colors.segInactiveBg,
    borderColor: Colors.cardBorder,
  },
  ClimateSegBlueActiveChassis: {
    backgroundColor: Colors.climateBlue,
    borderColor: Colors.climateBlue,
  },
  ClimateSegNeutralActiveChassis: {
    backgroundColor: Colors.segNeutralBg,
    borderColor: Colors.segNeutralBorder,
  },
  ClimateSegFiligree: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4A4A4A',
  },

  ClimateSegActiveFiligree: {
    color: Colors.textPrimary,
  },

  ClimateApplyChassis: {
    height: 58,
    marginTop: 6,
  },
});
