import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterParseType, FilterSliceState } from './types';

const initialState: FilterSliceState = {
  categoryId: 0,
  sortType: 0,
  currentPage: 1,
  orderSort: true,
  searchValue: '',
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortType(state, action: PayloadAction<number>) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setOrderSort(state, action: PayloadAction<boolean>) {
      state.orderSort = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterParseType>) {
      state.categoryId = Number(action.payload.categoryId);
      state.sortType = Number(action.payload.sortType);
      state.currentPage = Number(action.payload.currentPage);
      state.orderSort = JSON.parse(String(action.payload.orderSort));
    },
  },
});

export const {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setFilters,
  setOrderSort,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
