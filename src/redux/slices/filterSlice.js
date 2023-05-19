import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortType(state, action) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setOrderSort(state, action) {
      state.orderSort = action.payload;
    },
    setFilters(state, action) {
      state.categoryId = Number(action.payload.categoryId);
      state.sortType = Number(action.payload.sortType);
      state.currentPage = Number(action.payload.currentPage);
      state.orderSort = JSON.parse(action.payload.orderSort);
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
