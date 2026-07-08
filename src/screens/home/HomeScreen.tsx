import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MapView, { Marker } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Radius, Spacing } from '../../theme';
import { getImage } from '../../assets/images';

import { defaultReservation, hotelAbout } from '../../data/reservation';
import { useQuickActions } from '../../hooks/useQuickActions';
import { Toggle } from '../../components/common/Toggle';

const RESORT_REGION = {
  latitude: 49.888,
  longitude: -119.496,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02,
};

const ReservationCell = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <View style={styles.HomeScreenReservationCellEnclave}>
    <Text style={styles.HomeScreenReservationCellLabelFiligree}>{label}</Text>
    <Text style={styles.HomeScreenReservationCellValueFiligree}>{value}</Text>
  </View>
);

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { quickActions, toggleDoNotDisturb } = useQuickActions();
  const reservation = defaultReservation;

  return (
    <View style={styles.HomeScreenFacetChassis}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        style={styles.HomeScreenFacetChassis}
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Spacing.lg }}
      >
        {/* Hero */}
        <ImageBackground
          source={getImage('HomeHero')}
          style={[styles.HomeScreenHeroEnclave, { paddingTop: insets.top }]}
        >
          <LinearGradient
            colors={[
              'rgba(21,21,21,0)',
              'rgba(21,21,21,0.6)',
              Colors.background,
            ]}
            locations={[0.35, 0.72, 1]}
            style={StyleSheet.absoluteFill}
          />
          <Text style={styles.HomeScreenHeroCaptionFiligree}>
            CHANCES CASINO HOTEL
          </Text>
        </ImageBackground>

        <View style={styles.HomeScreenBodyEnclave}>
          {/* Reservation */}
          <View style={styles.HomeScreenCardFacetChassis}>
            <View style={styles.HomeScreenReservationHeaderRowLintel}>
              <Text style={styles.HomeScreenSectionLabelFiligree}>
                RESERVATION
              </Text>
              <View style={styles.HomeScreenStatusRowLintel}>
                <View style={styles.HomeScreenStatusDotSigil} />
                <Text style={styles.HomeScreenStatusFiligree}>Active</Text>
              </View>
            </View>
            <View style={styles.HomeScreenReservationGridLintel}>
              <ReservationCell
                label="RESERVATION CODE"
                value={reservation.code}
              />
              <ReservationCell
                label="ROOM NUMBER"
                value={reservation.roomNumber}
              />
            </View>
            <View style={styles.HomeScreenReservationGridLintel}>
              <ReservationCell label="CHECK-IN" value={reservation.checkIn} />
              <ReservationCell label="CHECK-OUT" value={reservation.checkOut} />
            </View>
          </View>

          {/* Do Not Disturb */}
          <View
            style={[
              styles.HomeScreenCardFacetChassis,
              styles.HomeScreenDndFacetChassis,
            ]}
          >
            <View style={styles.HomeScreenDndTextEnclave}>
              <Text style={styles.HomeScreenDndTitleFiligree}>
                Do Not Disturb
              </Text>
              <Text
                style={[
                  styles.HomeScreenDndSubFiligree,
                  quickActions.doNotDisturb &&
                    styles.HomeScreenDndSubActiveFiligree,
                ]}
              >
                {quickActions.doNotDisturb ? 'Active' : 'Inactive'}
              </Text>
            </View>
            <Toggle
              value={quickActions.doNotDisturb}
              onValueChange={toggleDoNotDisturb}
            />
          </View>

          {/* About the Hotel */}
          <View style={styles.HomeScreenCardFacetChassis}>
            <Text style={styles.HomeScreenSectionLabelFiligree}>
              ABOUT THE HOTEL
            </Text>
            {hotelAbout.map((paragraph, i) => (
              <Text
                key={i}
                style={[
                  styles.HomeScreenAboutFiligree,
                  { marginTop: i === 0 ? Spacing.sm : 4 },
                ]}
              >
                {paragraph}
              </Text>
            ))}
          </View>

          {/* Map */}
          <View style={styles.HomeScreenMapFacetChassis}>
            <MapView
              style={StyleSheet.absoluteFill}
              initialRegion={RESORT_REGION}
              userInterfaceStyle="dark"
            >
              <Marker coordinate={RESORT_REGION}>
                <View style={styles.HomeScreenMapPinEnclave}>
                  <View style={styles.HomeScreenMapPinDotSigil} />
                </View>
              </Marker>
            </MapView>
            <View style={styles.HomeScreenMapLabelChip} pointerEvents="none">
              <Text style={styles.HomeScreenMapLabelFiligree}>DOWNTOWN BC</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  HomeScreenFacetChassis: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  HomeScreenHeroEnclave: {
    height: 210,
    justifyContent: 'flex-end',
  },
  HomeScreenHeroCaptionFiligree: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.65)',
    letterSpacing: 2.6,
    marginBottom: Spacing.md,
    marginLeft: Spacing.md + 4,
  },

  HomeScreenBodyEnclave: {
    paddingHorizontal: Spacing.md,
    paddingTop: 14,
    gap: 12,
  },

  HomeScreenCardFacetChassis: {
    backgroundColor: Colors.card,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    paddingHorizontal: 18,
    paddingVertical: 16,
  },

  HomeScreenSectionLabelFiligree: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.gold,
    letterSpacing: 2.4,
  },

  // Reservation
  HomeScreenReservationHeaderRowLintel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  HomeScreenStatusRowLintel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  HomeScreenStatusDotSigil: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Colors.success,
  },
  HomeScreenStatusFiligree: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.success,
  },
  HomeScreenReservationGridLintel: {
    flexDirection: 'row',
    marginTop: 4,
  },
  HomeScreenReservationCellEnclave: {
    flex: 1,
    marginBottom: 8,
  },

  HomeScreenReservationCellLabelFiligree: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.textLabel,
    letterSpacing: 1.2,
    marginBottom: 3,
  },
  HomeScreenReservationCellValueFiligree: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },

  // Do Not Disturb
  HomeScreenDndFacetChassis: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  HomeScreenDndTextEnclave: {
    flex: 1,
    marginRight: Spacing.md,
  },
  HomeScreenDndTitleFiligree: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  HomeScreenDndSubFiligree: {
    fontSize: 11,
    color: Colors.textLabel,
    marginTop: 3,
  },
  HomeScreenDndSubActiveFiligree: {
    color: Colors.textPrimary,
  },

  // About
  HomeScreenAboutFiligree: {
    fontSize: 12,
    color: Colors.textMuted,
    lineHeight: 18.5,
  },

  // Map
  HomeScreenMapFacetChassis: {
    height: 160,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    backgroundColor: Colors.mapBg,
    overflow: 'hidden',
  },
  HomeScreenMapPinEnclave: {
    width: 23,
    height: 23,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: 'rgba(245,182,66,0.3)',
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  HomeScreenMapPinDotSigil: {
    width: 8,
    height: 8,
    borderRadius: 2,
    backgroundColor: '#0A0A0A',
  },
  HomeScreenMapLabelChip: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: 'rgba(21,21,21,0.75)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  HomeScreenMapLabelFiligree: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.textSecondary,
    letterSpacing: 1.5,
  },
});
