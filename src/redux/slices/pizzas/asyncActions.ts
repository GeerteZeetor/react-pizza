import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchPizzaArg, Pizza } from './types';
import axios from 'axios';

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
