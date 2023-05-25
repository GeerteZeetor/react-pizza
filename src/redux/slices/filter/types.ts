export interface FilterSliceState {
  categoryId: number;
  sortType: number;
  currentPage: number;
  orderSort: boolean;
  searchValue: string;
}

export type FilterParseType = {
  categoryId: string;
  sortType: string;
  currentPage: string;
  orderSort: string;
  searchValue: string;
};
