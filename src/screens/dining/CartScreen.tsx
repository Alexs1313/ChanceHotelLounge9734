import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Colors, Radius, Spacing } from '../../theme';
import { useCart } from '../../hooks/useCart';
import { MenuItemCard } from '../../components/menu/MenuItemCard';
import { PressableCard } from '../../components/common/PressableCard';
import { PrimaryButton } from '../../components/common/PrimaryButton';

export default function CartScreen() {
  const navigation = useNavigation();
  const { cart, totalPrice, updateQuantity, clearCart } = useCart();

  const handleOrder = () => {
    clearCart();
    navigation.goBack();
  };

  return (
    <View style={[styles.CartScreenFacetChassis]}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.CartScreenScrollContent}
      >
        <View style={styles.CartScreenHeaderEnclave}>
          <Text style={styles.CartScreenEyebrowFiligree}>HOTEL DINING</Text>
          <Text style={styles.CartScreenTitleFiligree}>Cart</Text>
        </View>

        {cart.length === 0 ? (
          <View style={styles.CartScreenEmptyEnclave}>
            <Text style={styles.CartScreenEmptyFiligree}>
              Your cart is empty
            </Text>
          </View>
        ) : (
          <>
            {cart.map(({ item, quantity }) => (
              <View key={item.id} style={styles.CartScreenItemEnclave}>
                <MenuItemCard
                  item={item}
                  action={
                    <View style={styles.CartScreenStepperRowLintel}>
                      <PressableCard
                        onPress={() => updateQuantity(item.id, quantity - 1)}
                        style={styles.CartScreenStepChassis}
                      >
                        <Text style={styles.CartScreenStepFiligree}>−</Text>
                      </PressableCard>
                      <Text style={styles.CartScreenQtyFiligree}>
                        {quantity}
                      </Text>
                      <PressableCard
                        onPress={() => updateQuantity(item.id, quantity + 1)}
                        style={styles.CartScreenStepChassis}
                      >
                        <Text style={styles.CartScreenStepFiligree}>+</Text>
                      </PressableCard>
                    </View>
                  }
                />
              </View>
            ))}

            <View style={styles.CartScreenTotalChassis}>
              <Text style={styles.CartScreenTotalFiligree}>
                Total: ${totalPrice.toFixed(2)}
              </Text>
            </View>

            <PrimaryButton
              label="Order"
              onPress={handleOrder}
              style={styles.CartScreenOrderChassis}
            />
            <PressableCard
              onPress={() => navigation.goBack()}
              style={styles.CartScreenCancelChassis}
            >
              <Text style={styles.CartScreenCancelFiligree}>Cancel</Text>
            </PressableCard>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  CartScreenFacetChassis: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  CartScreenHeaderEnclave: {
    paddingTop: 8,
    paddingBottom: 12,
  },
  CartScreenEyebrowFiligree: {
    fontSize: 10.5,
    color: '#555555',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },

  CartScreenTitleFiligree: {
    fontSize: 23,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 3,
  },

  CartScreenEmptyEnclave: {
    alignItems: 'center',
    paddingVertical: 120,
  },
  CartScreenEmptyFiligree: {
    fontSize: 14,
    color: Colors.textMuted,
  },
  CartScreenScrollContent: {
    paddingHorizontal: 16,
    paddingBottom: Spacing.xl,
    paddingTop: 55,
  },
  CartScreenItemEnclave: {
    marginBottom: 10,
  },

  // Stepper
  CartScreenStepperRowLintel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  CartScreenStepChassis: {
    width: 27,
    height: 27,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  CartScreenStepFiligree: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textOnGold,
    lineHeight: 18,
  },
  CartScreenQtyFiligree: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textPrimary,
    minWidth: 10,
    textAlign: 'center',
  },

  // Total
  CartScreenTotalChassis: {
    height: 54,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 4,
  },
  CartScreenTotalFiligree: {
    fontSize: 12.5,
    fontWeight: '600',
    color: Colors.gold,
  },

  // Order / Cancel
  CartScreenOrderChassis: {
    marginTop: Spacing.xl,
  },
  CartScreenCancelChassis: {
    height: 54,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.sm,
  },
  CartScreenCancelFiligree: {
    fontSize: 12.5,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
});
