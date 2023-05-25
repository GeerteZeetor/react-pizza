import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../../utils/getCartFromLS';
import { calcTotalPrice } from '../../../utils/calcTotalPrice';
import { CartItem, CartSliceState } from './types';

const { items, totalPrice }: { items: CartItem[]; totalPrice: number } =
  getCartFromLS();

const initialState: CartSliceState = {
  totalPrice: totalPrice,
  items: items,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(obj => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },

    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find(obj => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
        state.totalPrice = calcTotalPrice(state.items);
      }
    },

    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(value => value.id !== action.payload);
      state.totalPrice = calcTotalPrice(state.items);
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
