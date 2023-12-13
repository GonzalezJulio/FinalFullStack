import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    setCart(state, action) {
      return action.payload;
    },
    addToCart(state, action) {
      state.push(action.payload);
    },
    removeFromCart: (state, action) => {
      return state.filter(item => item._id !== action.payload);
    },
    updateQty(state, action) {
      let index = state.findIndex(item => item._id === action.payload.id);
      state[index].qty = action.payload.qty;
    },
    },
  },
);

export const { addToCart, setCart, removeFromCart } = cartSlice.actions;
export const selectCart = (state) => state.cart;

export default cartSlice.reducer;