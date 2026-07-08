import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors, Radius } from '../../theme';
import { EventItem } from '../../types';
import { getImage } from '../../assets/images';
import { PressableCard } from '../common/PressableCard';
import { EventMetaRow } from './EventMetaRow';

interface Props {
  event: EventItem;
  favorite: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
}

export const EventCard: React.FC<Props> = ({
  event,
  favorite,
  onPress,
  onToggleFavorite,
}) => (
  <PressableCard onPress={onPress} style={styles.EventCardFacetChassis}>
    <View style={styles.EventCardImageEnclave}>
      <Image source={getImage(event.image)} style={styles.EventCardImage} />
    </View>
    <View style={styles.EventCardBodyEnclave}>
      <View style={styles.EventCardTextEnclave}>
        <Text style={styles.EventCardNameFiligree} numberOfLines={1}>
          {event.name}
        </Text>
        <View style={styles.EventCardMetaWrap}>
          <EventMetaRow
            location={event.location}
            date={event.dateLabel}
            time={event.timeLabel}
          />
        </View>
        <Text style={styles.EventCardShortFiligree} numberOfLines={2}>
          {event.short}
        </Text>
      </View>
      <Pressable onPress={onToggleFavorite} hitSlop={10}>
        <Text
          style={[
            styles.EventCardHeartSigil,
            favorite && styles.EventCardHeartActiveSigil,
          ]}
        >
          {favorite ? '♥' : '♡'}
        </Text>
      </Pressable>
    </View>
  </PressableCard>
);

const styles = StyleSheet.create({
  EventCardFacetChassis: {
    backgroundColor: Colors.card,
    borderColor: Colors.cardBorder,
    borderWidth: 1,
    borderRadius: Radius.md,
    overflow: 'hidden',
  },
  EventCardImageEnclave: {
    height: 150,
    backgroundColor: Colors.backgroundRaised,
  },
  EventCardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  EventCardBodyEnclave: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 13,
    paddingBottom: 15,
  },
  EventCardTextEnclave: {
    flex: 1,
  },
  EventCardNameFiligree: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  EventCardMetaWrap: {
    marginTop: 7,
  },
  EventCardShortFiligree: {
    fontSize: 11.5,
    color: '#666666',
    lineHeight: 16.7,
    marginTop: 7,
  },
  EventCardHeartSigil: {
    fontSize: 18,
    color: '#555555',
  },
  EventCardHeartActiveSigil: {
    color: Colors.alert,
  },
});
