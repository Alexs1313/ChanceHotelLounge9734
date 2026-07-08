import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { Colors } from '../../theme';
import { NearbyStackParamList } from '../../types';
import { attractions } from '../../data/attractions';
import { useFavorites } from '../../hooks/useFavorites';
import { AttractionCard } from '../../components/nearby/AttractionCard';

type Nav = NativeStackNavigationProp<NearbyStackParamList, 'Nearby'>;

export default function NearbyScreen() {
  const navigation = useNavigation<Nav>();
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <View style={[styles.NearbyScreenFacetChassis]}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.NearbyScreenScrollContent}
      >
        <View style={styles.NearbyScreenHeaderEnclave}>
          <Text style={styles.NearbyScreenEyebrowFiligree}>EXPLORE</Text>
          <Text style={styles.NearbyScreenTitleFiligree}>
            Nearby Attractions
          </Text>
        </View>

        <View style={styles.NearbyScreenListEnclave}>
          {attractions.map(attraction => (
            <AttractionCard
              key={attraction.id}
              attraction={attraction}
              favorite={isFavorite(attraction.id)}
              onPress={() =>
                navigation.navigate('NearbyDetail', {
                  attractionId: attraction.id,
                })
              }
              onToggleFavorite={() => toggleFavorite(attraction.id)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  NearbyScreenFacetChassis: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  NearbyScreenScrollContent: {
    paddingBottom: 24,
    paddingTop: 55,
  },

  NearbyScreenHeaderEnclave: {
    paddingTop: 8,
    paddingBottom: 18,
    paddingHorizontal: 21,
  },
  NearbyScreenEyebrowFiligree: {
    fontSize: 10.5,
    color: '#555555',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  NearbyScreenTitleFiligree: {
    fontSize: 23,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 3,
  },

  NearbyScreenListEnclave: {
    paddingHorizontal: 16,
    gap: 16,
  },
});
