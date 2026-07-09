import React, { useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Colors, Radius, Spacing } from '../../theme';
import { MenuCategory, MenuItem, MenuStackParamList } from '../../types';
import { menuCategories, menuItems } from '../../data/menu';
import { useCart } from '../../hooks/useCart';
import { MenuItemCard } from '../../components/menu/MenuItemCard';
import { PressableCard } from '../../components/common/PressableCard';

type Nav = NativeStackNavigationProp<MenuStackParamList, 'Menu'>;
type Filter = 'All' | MenuCategory;

export default function MenuScreen() {
  const navigation = useNavigation<Nav>();
  const { addItem, totalItems, totalPrice } = useCart();
  const [filter, setFilter] = useState<Filter>('All');

  const toastOpacity = useRef(new Animated.Value(0)).current;
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = () => {
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }
    Animated.timing(toastOpacity, {
      toValue: 1,
      duration: 160,
      useNativeDriver: true,
    }).start();
    toastTimer.current = setTimeout(() => {
      Animated.timing(toastOpacity, {
        toValue: 0,
        duration: 320,
        useNativeDriver: true,
      }).start();
    }, 1100);
  };

  const handleAdd = (item: MenuItem) => {
    addItem(item);
    showToast();
  };

  const data =
    filter === 'All' ? menuItems : menuItems.filter(m => m.category === filter);

  const renderHeader = () => (
    <View>
      <View style={styles.MenuScreenHeaderEnclave}>
        <View style={styles.MenuScreenHeaderTextEnclave}>
          <Text style={styles.MenuScreenEyebrowFiligree}>HOTEL DINING</Text>
          <Text style={styles.MenuScreenTitleFiligree}>Restaurant</Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate('Cart')}
          hitSlop={8}
          style={styles.MenuScreenCartIconEnclave}
        >
          <Text style={styles.MenuScreenCartIconSigil}>🛒</Text>
          {totalItems > 0 ? (
            <View style={styles.MenuScreenCartBadgeSigil}>
              <Text style={styles.MenuScreenCartBadgeFiligree}>
                {totalItems}
              </Text>
            </View>
          ) : null}
        </Pressable>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.MenuScreenChipsRowLintel}
      >
        {menuCategories.map(cat => {
          const active = cat === filter;
          return (
            <PressableCard
              key={cat}
              onPress={() => setFilter(cat)}
              style={[
                styles.MenuScreenChipChassis,
                active && styles.MenuScreenChipActiveChassis,
              ]}
            >
              <Text
                style={[
                  styles.MenuScreenChipFiligree,
                  active && styles.MenuScreenChipActiveFiligree,
                ]}
              >
                {cat}
              </Text>
            </PressableCard>
          );
        })}
      </ScrollView>
    </View>
  );

  const renderItem = ({ item }: { item: MenuItem }) => (
    <MenuItemCard
      item={item}
      action={
        <PressableCard
          onPress={() => handleAdd(item)}
          style={styles.MenuScreenAddChassis}
        >
          <Text style={styles.MenuScreenAddFiligree}>+ Add</Text>
        </PressableCard>
      }
    />
  );

  return (
    <View style={[styles.MenuScreenFacetChassis]}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.MenuScreenListContent}
      >
        {renderHeader()}
        {data.map((item, i) => (
          <View
            key={item.id}
            style={i > 0 ? styles.MenuScreenSeparator : undefined}
          >
            {renderItem({ item })}
          </View>
        ))}
      </ScrollView>

      {/* Added-to-cart toast */}
      <Animated.View
        pointerEvents="none"
        style={[styles.MenuScreenToastEnclave, { opacity: toastOpacity }]}
      >
        <View style={styles.MenuScreenToastChip}>
          <Text style={styles.MenuScreenToastFiligree}>🛒 Added to cart</Text>
        </View>
      </Animated.View>

      <View
        style={[styles.MenuScreenCartBarEnclave, { paddingBottom: Spacing.sm }]}
      >
        <PressableCard
          onPress={() => navigation.navigate('Cart')}
          style={styles.MenuScreenCartBarChassis}
        >
          <Text style={styles.MenuScreenCartSummaryFiligree}>
            {totalItems} items · ${totalPrice.toFixed(2)}
          </Text>
          <Text style={styles.MenuScreenViewCartFiligree}>View Cart</Text>
        </PressableCard>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  MenuScreenFacetChassis: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  MenuScreenListContent: {
    paddingHorizontal: 16,
    paddingBottom: 90,
    paddingTop: 55,
  },
  MenuScreenSeparator: {
    marginTop: 10,
  },

  // Header
  MenuScreenHeaderEnclave: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 5,
  },
  MenuScreenHeaderTextEnclave: {
    flex: 1,
  },
  MenuScreenEyebrowFiligree: {
    fontSize: 10.5,
    color: '#555555',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  MenuScreenTitleFiligree: {
    fontSize: 23,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 3,
  },

  // Cart icon + badge
  MenuScreenCartIconEnclave: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  MenuScreenCartIconSigil: {
    fontSize: 24,
  },
  MenuScreenCartBadgeSigil: {
    position: 'absolute',
    top: 2,
    right: 2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.alert,
    borderWidth: 1.5,
    borderColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  MenuScreenCartBadgeFiligree: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.white,
  },

  // Toast
  MenuScreenToastEnclave: {
    position: 'absolute',
    top: 66,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  MenuScreenToastChip: {
    backgroundColor: Colors.cardElevated,
    borderWidth: 1,
    borderColor: Colors.goldSoft,
    borderRadius: Radius.full,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  MenuScreenToastFiligree: {
    fontSize: 12.5,
    fontWeight: '600',
    color: Colors.textPrimary,
  },

  // Chips
  MenuScreenChipsRowLintel: {
    gap: 8,
    paddingBottom: 14,
    paddingHorizontal: 4,
  },
  MenuScreenChipChassis: {
    height: 31,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    backgroundColor: Colors.card,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  MenuScreenChipActiveChassis: {
    backgroundColor: Colors.gold,
    borderColor: Colors.gold,
  },
  MenuScreenChipFiligree: {
    fontSize: 11.5,
    fontWeight: '500',
    color: '#555555',
  },
  MenuScreenChipActiveFiligree: {
    color: Colors.textOnGold,
  },

  // Add button
  MenuScreenAddChassis: {
    height: 27,
    minWidth: 63,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  MenuScreenAddFiligree: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.white,
  },

  // Cart bar
  MenuScreenCartBarEnclave: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 6,
    backgroundColor: Colors.background,
  },
  MenuScreenCartBarChassis: {
    height: 54,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    backgroundColor: Colors.card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  MenuScreenCartSummaryFiligree: {
    fontSize: 12.5,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  MenuScreenViewCartFiligree: {
    fontSize: 12.5,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
});
