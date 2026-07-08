import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors, Radius } from '../../theme';
import { MenuItem } from '../../types';
import { getImage } from '../../assets/images';

interface Props {
  item: MenuItem;
  action: React.ReactNode;
}

export const MenuItemCard: React.FC<Props> = ({ item, action }) => (
  <View style={styles.MenuItemCardFacetChassis}>
    <View style={styles.MenuItemCardThumbEnclave}>
      <Image source={getImage(item.image)} style={styles.MenuItemCardThumbImage} />
    </View>
    <View style={styles.MenuItemCardTextEnclave}>
      <Text style={styles.MenuItemCardNameFiligree} numberOfLines={1}>
        {item.name}
      </Text>
      <View style={styles.MenuItemCardMetaRowLintel}>
        <Text style={styles.MenuItemCardPriceFiligree}>${item.price}</Text>
        <View style={styles.MenuItemCardTimeRowLintel}>
          <Text style={styles.MenuItemCardClockSigil}>◷</Text>
          <Text style={styles.MenuItemCardTimeFiligree}>{item.prepTime} min</Text>
        </View>
      </View>
      <Text style={styles.MenuItemCardDescriptionFiligree} numberOfLines={1}>
        {item.description}
      </Text>
      <View style={styles.MenuItemCardActionRowLintel}>{action}</View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  MenuItemCardFacetChassis: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: Colors.card,
    borderColor: Colors.cardBorder,
    borderWidth: 1,
    borderRadius: Radius.md,
    padding: 13,
  },
  MenuItemCardThumbEnclave: {
    width: 75,
    height: 75,
    borderRadius: Radius.sm,
    backgroundColor: Colors.backgroundRaised,
    overflow: 'hidden',
  },
  MenuItemCardThumbImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  MenuItemCardTextEnclave: {
    flex: 1,
  },
  MenuItemCardNameFiligree: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  MenuItemCardMetaRowLintel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 3,
  },
  MenuItemCardPriceFiligree: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gold,
  },
  MenuItemCardTimeRowLintel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  MenuItemCardClockSigil: {
    fontSize: 10,
    color: '#555555',
  },
  MenuItemCardTimeFiligree: {
    fontSize: 10.5,
    color: '#555555',
  },
  MenuItemCardDescriptionFiligree: {
    fontSize: 11,
    color: '#555555',
    marginTop: 5,
  },
  MenuItemCardActionRowLintel: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
});
