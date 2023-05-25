import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pizza, PizzaBlockState, Status } from './types';
import { fetchPizzas } from './asyncActions';

const initialState: PizzaBlockState = {
  items: [],
  status: 'loading',
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPizzas.pending, state => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(
      fetchPizzas.fulfilled,
      (state, action: PayloadAction<Pizza[]>) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      }
    );
    builder.addCase(fetchPizzas.rejected, state => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export default pizzasSlice.reducer;
