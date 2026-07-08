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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../theme';

import { EventsFilter, EventsStackParamList } from '../../types';

import { events } from '../../data/events';
import { useFavorites } from '../../hooks/useFavorites';
import { EventCard } from '../../components/events/EventCard';

type Nav = NativeStackNavigationProp<EventsStackParamList, 'Events'>;

const TODAY = 8;
const WEEK_END = TODAY + 6;

const FILTERS: EventsFilter[] = ['All', 'Today', 'This Week', 'Live'];

export default function EventsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [filter, setFilter] = useState<EventsFilter>('All');

  const data = events.filter(e => {
    switch (filter) {
      case 'Today':
        return e.day === TODAY;
      case 'This Week':
        return e.day >= TODAY && e.day <= WEEK_END;
      case 'Live':
        return e.category === 'Live Entertainment';
      default:
        return true;
    }
  });

  return (
    <View style={[styles.EventsScreenFacetChassis]}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.EventsScreenScrollContent}
      >
        <View style={styles.EventsScreenHeaderEnclave}>
          <Text style={styles.EventsScreenEyebrowFiligree}>HOTEL & LOCAL</Text>
          <Text style={styles.EventsScreenTitleFiligree}>Events</Text>
        </View>

        <View style={styles.EventsScreenTabsRowLintel}>
          {FILTERS.map(f => {
            const active = f === filter;
            return (
              <Pressable
                key={f}
                onPress={() => setFilter(f)}
                style={[
                  styles.EventsScreenTabChassis,
                  active && styles.EventsScreenTabActiveChassis,
                ]}
              >
                <Text
                  style={[
                    styles.EventsScreenTabFiligree,
                    active && styles.EventsScreenTabActiveFiligree,
                  ]}
                >
                  {f}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.EventsScreenListEnclave}>
          {data.length === 0 ? (
            <Text style={styles.EventsScreenEmptyFiligree}>
              No events in this view.
            </Text>
          ) : (
            data.map(event => (
              <EventCard
                key={event.id}
                event={event}
                favorite={isFavorite(event.id)}
                onPress={() =>
                  navigation.navigate('EventDetail', { eventId: event.id })
                }
                onToggleFavorite={() => toggleFavorite(event.id)}
              />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  EventsScreenFacetChassis: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  EventsScreenScrollContent: {
    paddingBottom: 24,
    paddingTop: 55,
  },

  EventsScreenHeaderEnclave: {
    paddingTop: 8,
    paddingBottom: 14,
    paddingHorizontal: 21,
  },

  EventsScreenEyebrowFiligree: {
    fontSize: 10.5,
    color: '#555555',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  EventsScreenTitleFiligree: {
    fontSize: 23,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 3,
  },

  // Tabs
  EventsScreenTabsRowLintel: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
    paddingLeft: 21,
    marginBottom: 16,
  },
  EventsScreenTabChassis: {
    paddingRight: 21,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  EventsScreenTabActiveChassis: {
    borderBottomColor: Colors.gold,
  },
  EventsScreenTabFiligree: {
    fontSize: 13.6,
    fontWeight: '500',
    color: '#444444',
  },

  EventsScreenTabActiveFiligree: {
    color: Colors.gold,
  },

  // List
  EventsScreenListEnclave: {
    paddingHorizontal: 16,
    gap: 14,
  },
  EventsScreenEmptyFiligree: {
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: 'center',
    paddingVertical: 60,
  },
});
