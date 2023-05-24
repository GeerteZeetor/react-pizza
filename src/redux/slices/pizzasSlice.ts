import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
interface PizzaBlockState {
  status: 'loading' | 'success' | 'error';
  items: Pizza[];
}

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export type FetchPizzaArg = {
  currentPage: number;
  category: string;
  typeArr: string[];
  sortType: number;
  kindOfSorting: string;
  search: string;
};

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async ({
    currentPage,
    category,
    typeArr,
    sortType,
    kindOfSorting,
    search,
  }: FetchPizzaArg) => {
    const { data } = await axios.get<Pizza[]>(
      `https://6451ed17a2860c9ed4fdac76.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${typeArr[sortType]}&order=${kindOfSorting}&${search}`
    );
    return data;
  }
);

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

// export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
