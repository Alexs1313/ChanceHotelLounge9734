import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { getImage } from '../../assets/images';

interface Props {
  location: string;
  date: string;
  time: string;
}

export const EventMetaRow: React.FC<Props> = ({ location, date, time }) => (
  <View style={styles.EventMetaRowLintel}>
    <View style={styles.EventMetaItemLintel}>
      <Image source={getImage('TabNearby')} style={styles.EventMetaIconSigil} />
      <Text style={styles.EventMetaTextFiligree}>{location}</Text>
    </View>
    <View style={styles.EventMetaItemLintel}>
      <Image source={getImage('TabEvents')} style={styles.EventMetaIconSigil} />
      <Text style={styles.EventMetaTextFiligree}>{date}</Text>
    </View>
    <View style={styles.EventMetaItemLintel}>
      <Text style={styles.EventMetaClockSigil}>◷</Text>
      <Text style={styles.EventMetaTextFiligree}>{time}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  EventMetaRowLintel: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    rowGap: 4,
    columnGap: 14,
  },
  EventMetaItemLintel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  EventMetaIconSigil: {
    width: 11,
    height: 11,
    resizeMode: 'contain',
    tintColor: '#666666',
  },
  EventMetaClockSigil: {
    fontSize: 11,
    color: '#666666',
  },
  EventMetaTextFiligree: {
    fontSize: 10.5,
    color: '#666666',
  },
});
