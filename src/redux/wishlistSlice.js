// src/redux/wishlistSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('wishlistItems')) || [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      if (!state.items.find((product) => product.id === item.id)) {
        state.items.push(item);
        localStorage.setItem('wishlistItems', JSON.stringify(state.items));
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem('wishlistItems', JSON.stringify(state.items));
    },
    setItems: (state, action) => {
      state.items = action.payload;
      localStorage.setItem('wishlistItems', JSON.stringify(state.items));
    },
  },
});

export const { addItem, removeItem, setItems } = wishlistSlice.actions;
export default wishlistSlice.reducer;
