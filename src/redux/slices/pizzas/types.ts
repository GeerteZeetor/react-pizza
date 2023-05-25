export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
export interface PizzaBlockState {
  status: 'loading' | 'success' | 'error';
  items: Pizza[];
}

export type Pizza = {
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
