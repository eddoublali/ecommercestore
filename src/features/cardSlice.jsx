import { createSlice } from '@reduxjs/toolkit';

// Helper function to save cart state to localStorage
const saveCartToLocalStorage = (state) => {
  try {
    localStorage.setItem("cart", JSON.stringify(state.items));
    localStorage.setItem("totalQuantity", JSON.stringify(state.totalQuantity));
    localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
  }
};

// Load initial state from localStorage
const initialState = {
  items: JSON.parse(localStorage.getItem("cart")) || [],
  totalQuantity: JSON.parse(localStorage.getItem("totalQuantity")) || 0,
  totalAmount: JSON.parse(localStorage.getItem("totalAmount")) || 0,
};

// Cart slice definition
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add item to cart
    addToCart: (state, action) => {
      const { id, name, price, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        state.items.push({
          id,
          name,
          price,
          quantity,
          totalPrice: price * quantity,
        });
      }

      // Update totals
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);

      // Save to localStorage
      saveCartToLocalStorage(state);
    },

    // Remove item from cart
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);

      // Update totals
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);

      // Save to localStorage
      saveCartToLocalStorage(state);
    },

    // Update item quantity
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);

      if (item) {
        item.quantity = quantity;
        item.totalPrice = item.price * quantity;

        // Update totals
        state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);

        // Save to localStorage
        saveCartToLocalStorage(state);
      }
    },

    // Clear cart
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;

      // Save to localStorage
      saveCartToLocalStorage(state);
    },

    // Increment item quantity
    incrementQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find(item => item.id === id);

      if (item) {
        item.quantity += 1;
        item.totalPrice = item.price * item.quantity;

        // Update totals
        state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);

        // Save to localStorage
        saveCartToLocalStorage(state);
      }
    },

    // Decrement item quantity
    decrementQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find(item => item.id === id);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.totalPrice = item.price * item.quantity;

        // Update totals
        state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);

        // Save to localStorage
        saveCartToLocalStorage(state);
      }
    },
  },
});

// Export actions
export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalQuantity = (state) => state.cart.totalQuantity;
export const selectCartTotalAmount = (state) => state.cart.totalAmount;
export const selectCartItemById = (id) => (state) =>
  state.cart.items.find(item => item.id === id);

export default cartSlice.reducer;
