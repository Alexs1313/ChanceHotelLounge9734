import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors, Radius } from '../../theme';
import { Attraction } from '../../types';
import { getImage } from '../../assets/images';
import { formatCoords } from '../../data/attractions';
import { PressableCard } from '../common/PressableCard';

interface Props {
  attraction: Attraction;
  favorite: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
}

export const AttractionCard: React.FC<Props> = ({
  attraction,
  favorite,
  onPress,
  onToggleFavorite,
}) => (
  <PressableCard onPress={onPress} style={styles.AttractionCardFacetChassis}>
    <View style={styles.AttractionCardImageEnclave}>
      <Image source={getImage(attraction.image)} style={styles.AttractionCardImage} />
    </View>
    <View style={styles.AttractionCardBodyEnclave}>
      <View style={styles.AttractionCardTextEnclave}>
        <Text style={styles.AttractionCardNameFiligree} numberOfLines={1}>
          {attraction.name}
        </Text>
        <View style={styles.AttractionCardCoordsRowLintel}>
          <Image
            source={getImage('TabNearby')}
            style={styles.AttractionCardCoordsIconSigil}
          />
          <Text style={styles.AttractionCardCoordsFiligree}>
            {formatCoords(attraction.lat, attraction.lon)}
          </Text>
        </View>
        <Text style={styles.AttractionCardShortFiligree} numberOfLines={2}>
          {attraction.short}
        </Text>
      </View>
      <Pressable onPress={onToggleFavorite} hitSlop={10}>
        <Text
          style={[
            styles.AttractionCardHeartSigil,
            favorite && styles.AttractionCardHeartActiveSigil,
          ]}
        >
          {favorite ? '♥' : '♡'}
        </Text>
      </Pressable>
    </View>
  </PressableCard>
);

const styles = StyleSheet.create({
  AttractionCardFacetChassis: {
    backgroundColor: Colors.card,
    borderColor: Colors.cardBorder,
    borderWidth: 1,
    borderRadius: Radius.md,
    overflow: 'hidden',
  },
  AttractionCardImageEnclave: {
    height: 150,
    backgroundColor: Colors.backgroundRaised,
  },
  AttractionCardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  AttractionCardBodyEnclave: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 13,
    paddingBottom: 15,
  },
  AttractionCardTextEnclave: {
    flex: 1,
  },
  AttractionCardNameFiligree: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  AttractionCardCoordsRowLintel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 6,
  },
  AttractionCardCoordsIconSigil: {
    width: 10.5,
    height: 10.5,
    resizeMode: 'contain',
    tintColor: Colors.gold,
  },
  AttractionCardCoordsFiligree: {
    fontSize: 10.5,
    color: Colors.gold,
  },
  AttractionCardShortFiligree: {
    fontSize: 11.5,
    color: '#666666',
    lineHeight: 17.3,
    marginTop: 7,
  },
  AttractionCardHeartSigil: {
    fontSize: 18,
    color: '#555555',
  },
  AttractionCardHeartActiveSigil: {
    color: Colors.alert,
  },
});
