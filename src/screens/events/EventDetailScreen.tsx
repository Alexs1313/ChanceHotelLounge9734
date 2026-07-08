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

import { Colors } from '../../theme';
import { EventsStackParamList } from '../../types';
import { events } from '../../data/events';

import { getImage } from '../../assets/images';
import { useFavorites } from '../../hooks/useFavorites';
import { EventMetaRow } from '../../components/events/EventMetaRow';

type DetailRoute = RouteProp<EventsStackParamList, 'EventDetail'>;

export default function EventDetailScreen() {
  const navigation = useNavigation();
  const { params } = useRoute<DetailRoute>();
  const { isFavorite, toggleFavorite } = useFavorites();

  const event = events.find(e => e.id === params.eventId);
  if (!event) {
    return null;
  }
  const favorite = isFavorite(event.id);

  return (
    <View style={[styles.EventDetailFacetChassis]}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.EventDetailScrollContent}
      >
        <View style={styles.EventDetailHeaderEnclave}>
          <Text style={styles.EventDetailEyebrowFiligree}>EXPLORE</Text>
          <View style={styles.EventDetailTitleRowLintel}>
            <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
              <Text style={styles.EventDetailBackSigil}>←</Text>
            </Pressable>
            <Text style={styles.EventDetailTitleFiligree} numberOfLines={1}>
              {event.name}
            </Text>
          </View>
        </View>

        <View style={styles.EventDetailHeroEnclave}>
          <Image
            source={getImage(event.image)}
            style={styles.EventDetailHeroImage}
          />
          <Pressable
            onPress={() => toggleFavorite(event.id)}
            hitSlop={10}
            style={styles.EventDetailHeartWrap}
          >
            <Text
              style={[
                styles.EventDetailHeartSigil,
                favorite && styles.EventDetailHeartActiveSigil,
              ]}
            >
              {favorite ? '♥' : '♡'}
            </Text>
          </Pressable>
        </View>

        <View style={styles.EventDetailBodyEnclave}>
          <EventMetaRow
            location={event.location}
            date={event.dateLabel}
            time={event.timeLabel}
          />
          <Text style={styles.EventDetailShortFiligree}>{event.short}</Text>
          {event.description.map((para, i) => (
            <Text key={i} style={styles.EventDetailParagraphFiligree}>
              {para}
            </Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  EventDetailFacetChassis: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  EventDetailScrollContent: {
    paddingBottom: 32,
    paddingTop: 55,
  },

  EventDetailHeaderEnclave: {
    paddingTop: 8,
    paddingBottom: 18,
    paddingHorizontal: 21,
  },
  EventDetailEyebrowFiligree: {
    fontSize: 10.5,
    color: '#555555',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },

  EventDetailTitleRowLintel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 3,
  },
  EventDetailBackSigil: {
    fontSize: 24,
    color: Colors.textPrimary,
    lineHeight: 30,
  },
  EventDetailTitleFiligree: {
    flex: 1,
    fontSize: 23,
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  EventDetailHeroEnclave: {
    height: 215,
    backgroundColor: Colors.backgroundRaised,
  },

  EventDetailHeroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  EventDetailHeartWrap: {
    position: 'absolute',
    top: 10,
    right: 16,
  },
  EventDetailHeartSigil: {
    fontSize: 20,
    color: Colors.white,
  },
  EventDetailHeartActiveSigil: {
    color: Colors.alert,
  },

  EventDetailBodyEnclave: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  EventDetailShortFiligree: {
    fontSize: 11.5,
    color: '#666666',
    lineHeight: 16.7,
    marginTop: 12,
  },

  EventDetailParagraphFiligree: {
    fontSize: 11,
    color: Colors.textPrimary,
    lineHeight: 17.3,
    marginTop: 14,
  },
});
