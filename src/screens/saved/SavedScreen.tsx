import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Colors, Radius } from '../../theme';
import { SavedStackParamList } from '../../types';
import { events } from '../../data/events';

import { attractions } from '../../data/attractions';
import { useFavorites } from '../../hooks/useFavorites';
import { EventCard } from '../../components/events/EventCard';
import { AttractionCard } from '../../components/nearby/AttractionCard';
import { PrimaryButton } from '../../components/common/PrimaryButton';

type Nav = NativeStackNavigationProp<SavedStackParamList, 'Saved'>;
type SavedTab = 'Events' | 'Attractions';

const TABS: SavedTab[] = ['Events', 'Attractions'];

export default function SavedScreen() {
  const navigation = useNavigation<Nav>();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [tab, setTab] = useState<SavedTab>('Events');

  const savedEvents = events.filter(e => isFavorite(e.id));
  const savedAttractions = attractions.filter(a => isFavorite(a.id));
  const isEvents = tab === 'Events';
  const count = isEvents ? savedEvents.length : savedAttractions.length;

  const explore = () => {
    navigation
      .getParent()
      ?.navigate((isEvents ? 'EventsTab' : 'NearbyTab') as never);
  };

  return (
    <View style={styles.SavedScreenFacetChassis}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.SavedScreenScrollContent}
      >
        <View style={styles.SavedScreenHeaderEnclave}>
          <Text style={styles.SavedScreenEyebrowFiligree}>MY COLLECTION</Text>
          <Text style={styles.SavedScreenTitleFiligree}>Favorites</Text>
        </View>

        <View style={styles.SavedScreenTabsRowLintel}>
          {TABS.map(t => {
            const active = t === tab;
            return (
              <Pressable
                key={t}
                onPress={() => setTab(t)}
                style={[
                  styles.SavedScreenTabChassis,
                  active && styles.SavedScreenTabActiveChassis,
                ]}
              >
                <Text
                  style={[
                    styles.SavedScreenTabFiligree,
                    active && styles.SavedScreenTabActiveFiligree,
                  ]}
                >
                  {t}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {count === 0 ? (
          <View style={styles.SavedScreenEmptyEnclave}>
            <View style={styles.SavedScreenEmptyIconEnclave}>
              <Text style={styles.SavedScreenEmptyHeartSigil}>♡</Text>
            </View>
            <Text style={styles.SavedScreenEmptyTitleFiligree}>
              Nothing saved yet
            </Text>
            <Text style={styles.SavedScreenEmptySubFiligree}>
              Save events and attractions to access them quickly.
            </Text>
            <PrimaryButton
              label="Explore"
              onPress={explore}
              style={styles.SavedScreenExploreChassis}
            />
          </View>
        ) : (
          <View style={styles.SavedScreenListEnclave}>
            {isEvents
              ? savedEvents.map(event => (
                  <EventCard
                    key={event.id}
                    event={event}
                    favorite
                    onPress={() =>
                      navigation.navigate('EventDetail', { eventId: event.id })
                    }
                    onToggleFavorite={() => toggleFavorite(event.id)}
                  />
                ))
              : savedAttractions.map(attraction => (
                  <AttractionCard
                    key={attraction.id}
                    attraction={attraction}
                    favorite
                    onPress={() =>
                      navigation.navigate('NearbyDetail', {
                        attractionId: attraction.id,
                      })
                    }
                    onToggleFavorite={() => toggleFavorite(attraction.id)}
                  />
                ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  SavedScreenFacetChassis: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  SavedScreenScrollContent: {
    paddingTop: 55,
    paddingBottom: 24,
  },
  SavedScreenHeaderEnclave: {
    paddingTop: 8,
    paddingBottom: 14,
    paddingHorizontal: 21,
  },
  SavedScreenEyebrowFiligree: {
    fontSize: 10.5,
    color: '#555555',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  SavedScreenTitleFiligree: {
    fontSize: 23,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 3,
  },

  // Tabs
  SavedScreenTabsRowLintel: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
    paddingLeft: 21,
    marginBottom: 16,
  },

  SavedScreenTabChassis: {
    paddingRight: 21,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  SavedScreenTabActiveChassis: {
    borderBottomColor: Colors.gold,
  },
  SavedScreenTabFiligree: {
    fontSize: 13.6,
    fontWeight: '500',
    color: '#444444',
  },
  SavedScreenTabActiveFiligree: {
    color: Colors.gold,
  },

  // List
  SavedScreenListEnclave: {
    paddingHorizontal: 16,
    gap: 16,
  },

  // Empty
  SavedScreenEmptyEnclave: {
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 70,
  },
  SavedScreenEmptyIconEnclave: {
    width: 200,
    height: 175,
    borderRadius: Radius.xl,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SavedScreenEmptyHeartSigil: {
    fontSize: 64,
    color: Colors.textPrimary,
  },
  SavedScreenEmptyTitleFiligree: {
    fontSize: 19,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 26,
  },
  SavedScreenEmptySubFiligree: {
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 10,
  },
  SavedScreenExploreChassis: {
    alignSelf: 'stretch',
    marginTop: 30,
  },
});
