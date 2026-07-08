import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../theme';
import { NearbyStackParamList } from '../../types';
import { attractions, formatCoords } from '../../data/attractions';
import { getImage } from '../../assets/images';
import { useFavorites } from '../../hooks/useFavorites';

type DetailRoute = RouteProp<NearbyStackParamList, 'NearbyDetail'>;

export default function NearbyDetailScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { params } = useRoute<DetailRoute>();
  const { isFavorite, toggleFavorite } = useFavorites();

  const attraction = attractions.find(a => a.id === params.attractionId);
  if (!attraction) {
    return null;
  }
  const favorite = isFavorite(attraction.id);

  return (
    <View style={[styles.NearbyDetailFacetChassis]}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.NearbyDetailScrollContent}
      >
        <View style={styles.NearbyDetailHeaderEnclave}>
          <Text style={styles.NearbyDetailEyebrowFiligree}>EXPLORE</Text>
          <View style={styles.NearbyDetailTitleRowLintel}>
            <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
              <Text style={styles.NearbyDetailBackSigil}>←</Text>
            </Pressable>
            <Text style={styles.NearbyDetailTitleFiligree} numberOfLines={1}>
              {attraction.name}
            </Text>
          </View>
        </View>

        <View style={styles.NearbyDetailHeroEnclave}>
          <Image
            source={getImage(attraction.image)}
            style={styles.NearbyDetailHeroImage}
          />
          <Pressable
            onPress={() => toggleFavorite(attraction.id)}
            hitSlop={10}
            style={styles.NearbyDetailHeartWrap}
          >
            <Text
              style={[
                styles.NearbyDetailHeartSigil,
                favorite && styles.NearbyDetailHeartActiveSigil,
              ]}
            >
              {favorite ? '♥' : '♡'}
            </Text>
          </Pressable>
        </View>

        <View style={styles.NearbyDetailBodyEnclave}>
          <Text style={styles.NearbyDetailNameFiligree}>{attraction.name}</Text>
          <View style={styles.NearbyDetailCoordsRowLintel}>
            <Image
              source={getImage('TabNearby')}
              style={styles.NearbyDetailCoordsIconSigil}
            />
            <Text style={styles.NearbyDetailCoordsFiligree}>
              {formatCoords(attraction.lat, attraction.lon)}
            </Text>
          </View>
          <Text style={styles.NearbyDetailShortFiligree}>
            {attraction.short}
          </Text>
          {attraction.description.map((para, i) => (
            <Text key={i} style={styles.NearbyDetailParagraphFiligree}>
              {para}
            </Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  NearbyDetailFacetChassis: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  NearbyDetailScrollContent: {
    paddingBottom: 32,
    paddingTop: 55,
  },

  NearbyDetailHeaderEnclave: {
    paddingTop: 8,
    paddingBottom: 18,
    paddingHorizontal: 21,
  },
  NearbyDetailEyebrowFiligree: {
    fontSize: 10.5,
    color: '#555555',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  NearbyDetailTitleRowLintel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 3,
  },

  NearbyDetailBackSigil: {
    fontSize: 24,
    color: Colors.textPrimary,
    lineHeight: 30,
  },
  NearbyDetailTitleFiligree: {
    flex: 1,
    fontSize: 23,
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  NearbyDetailHeroEnclave: {
    height: 215,
    backgroundColor: Colors.backgroundRaised,
  },
  NearbyDetailHeroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  NearbyDetailHeartWrap: {
    position: 'absolute',
    top: 10,
    right: 16,
  },

  NearbyDetailHeartSigil: {
    fontSize: 20,
    color: Colors.white,
  },
  NearbyDetailHeartActiveSigil: {
    color: Colors.alert,
  },

  NearbyDetailBodyEnclave: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  NearbyDetailNameFiligree: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  NearbyDetailCoordsRowLintel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 7,
  },
  NearbyDetailCoordsIconSigil: {
    width: 11,
    height: 11,
    resizeMode: 'contain',
    tintColor: Colors.gold,
  },
  NearbyDetailCoordsFiligree: {
    fontSize: 10.5,
    color: Colors.gold,
  },
  NearbyDetailShortFiligree: {
    fontSize: 11.5,
    color: '#666666',
    lineHeight: 16.7,
    marginTop: 12,
  },

  NearbyDetailParagraphFiligree: {
    fontSize: 11,
    color: Colors.textPrimary,
    lineHeight: 17.3,
    marginTop: 14,
  },
});
