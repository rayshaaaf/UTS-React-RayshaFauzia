import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { calculateTotals, PROMO_CODES } from '../utils/pricing';

const CartContext = createContext();

const CART_STORAGE_KEY = 'kopiku_cart';
const PROMO_STORAGE_KEY = 'kopiku_promo';

const defaultInitialItems = [
  {
    id: 3,
    name: "Cafe Latte",
    category: "Kopi",
    price: 25000,
    stock: 12,
    image: "/images/cafe-latte.jpg",
    quantity: 2
  },
  {
    id: 9,
    name: "Croissant",
    category: "Makanan",
    price: 22000,
    stock: 8,
    image: "/images/croissant.jpg",
    quantity: 1
  }
];

const initialCartState = {
  items: defaultInitialItems,
  promoCode: 'UTS25',
};

function initCartState() {
  try {
    const savedItems = localStorage.getItem(CART_STORAGE_KEY);
    const savedPromo = localStorage.getItem(PROMO_STORAGE_KEY);
    return {
      items: savedItems !== null ? JSON.parse(savedItems) : defaultInitialItems,
      promoCode: savedPromo !== null ? JSON.parse(savedPromo) : 'UTS25',
    };
  } catch {
    return initialCartState;
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product } = action.payload;
      const existingIndex = state.items.findIndex((item) => item.id === product.id);

      if (existingIndex > -1) {
        const currentItem = state.items[existingIndex];
        // Batas stok: quantity tidak boleh melebihi stok
        if (currentItem.quantity >= product.stock) {
          return state;
        }
        const updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...currentItem,
          quantity: currentItem.quantity + 1,
          stock: product.stock // sinkronkan stok terbaru
        };
        return { ...state, items: updatedItems };
      } else {
        if (product.stock <= 0) return state;
        return {
          ...state,
          items: [
            ...state.items,
            {
              id: product.id,
              name: product.name,
              price: product.price,
              stock: product.stock,
              image: product.image,
              category: product.category,
              quantity: 1
            }
          ]
        };
      }
    }

    case 'UPDATE_QUANTITY': {
      const { productId, delta, currentStock } = action.payload;
      const updated = state.items
        .map((item) => {
          if (item.id === productId) {
            const stockLimit = currentStock !== undefined ? currentStock : item.stock;
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            if (newQty > stockLimit) return item; // Tolak jika melebihi stok
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter(Boolean);

      return { ...state, items: updated };
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.productId)
      };
    }

    case 'APPLY_PROMO': {
      const code = action.payload.code.toUpperCase().trim();
      if (PROMO_CODES[code]) {
        return { ...state, promoCode: code };
      }
      return state;
    }

    case 'REMOVE_PROMO': {
      return { ...state, promoCode: '' };
    }

    case 'CLEAR_CART': {
      return { ...state, items: [], promoCode: '' };
    }

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, null, initCartState);

  // Sync with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
      localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify(state.promoCode));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [state.items, state.promoCode]);

  // Derived state calculations
  const totals = calculateTotals(state.items, state.promoCode);
  const totalItemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const addItem = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: { product } });
  };

  const updateQuantity = (productId, delta, currentStock) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, delta, currentStock } });
  };

  const removeItem = (productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
  };

  const applyPromo = (code) => {
    dispatch({ type: 'APPLY_PROMO', payload: { code } });
  };

  const removePromo = () => {
    dispatch({ type: 'REMOVE_PROMO' });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        promoCode: state.promoCode,
        totals,
        totalItemCount,
        addItem,
        updateQuantity,
        removeItem,
        applyPromo,
        removePromo,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
