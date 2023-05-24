import React, { useCallback, useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  setCategoryId,
  setCurrentPage,
  setOrderSort,
  setSortType,
} from '../redux/slices/filterSlice';
import { fetchPizzas, Status } from '../redux/slices/pizzasSlice';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Category } from '../components/Category';
import { SortPopup } from '../components/SortPopup';
import { PizzaBlock } from '../components/PizzaBlock';
import { Pagination } from '../components/Pagination';
import { RootState, useAppDispatch } from '../redux/store';
import { useWhyDidYouUpdate } from 'ahooks';

export const Home = () => {
  const { categoryId, sortType, currentPage, orderSort, searchValue } =
    useSelector((state: RootState) => state.filters);
  const { items, status } = useSelector((state: RootState) => state.pizzas);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isSearch = useRef<boolean>(false);
  const isMounted = useRef<boolean>(false);

  const typeArr = ['rating', 'price', 'title'];
  const category = categoryId ? `category=${categoryId}` : '';
  const kindOfSorting = orderSort ? 'desc' : 'asc';
  const search = searchValue ? `title=${searchValue}` : '';

  useWhyDidYouUpdate('Home', {});
  const getPizza = async () => {
    dispatch(
      fetchPizzas({
        currentPage,
        category,
        typeArr,
        sortType,
        kindOfSorting,
        search,
      })
    );
  };

  const onClickCategory = useCallback(
    (id: number) => dispatch(setCategoryId(id)),
    []
  );

  const onChangeSortType = useCallback((type: number) => {
    dispatch(setSortType(type));
  }, []);
  const onChangeOrderSort = useCallback((value: boolean) => {
    dispatch(setOrderSort(value));
  }, []);

  const onChangePage = useCallback((num: number) => {
    dispatch(setCurrentPage(num));
  }, []);

  const skeleton = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  const pizzas = items.map((item: any) => (
    <PizzaBlock key={item.id} {...item} />
  ));

  //Если был первый рендер сохраняем URl параметры в редуксе
  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1));
  //     dispatch(setFilters({ ...(params as FilterParseType) }));
  //     isSearch.current = true;
  //   }
  // }, []);
  //
  // //Если был первый рендер и были изменены параметры
  // useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortType,
  //       categoryId,
  //       currentPage,
  //       orderSort,
  //     });
  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sortType, orderSort, search, currentPage]);

  //Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizza().then();
    }
    isSearch.current = false;
  }, [categoryId, sortType, orderSort, search, currentPage]);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Category value={categoryId} onClickCategory={onClickCategory} />
          <SortPopup
            value={sortType}
            onChangeSortType={onChangeSortType}
            orderSort={orderSort}
            onChangeOrderSort={onChangeOrderSort}
          />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {status === Status.ERROR ? (
          <div className="cart cart--empty cart--error">
            <h2>
              Произошла ошибка <span>😕</span>
            </h2>
            <p>
              Попробуйте перезагрузить страницу.
              <br />
              Если не получилось, попробуйте сделать это позднее.
            </p>
          </div>
        ) : pizzas.length === 0 && status === Status.SUCCESS ? (
          <div className="cart cart--empty cart--error">
            <h2>
              Пицц не найдено <span>😕</span>
            </h2>
            <p>Попробуйте поискать другие.</p>
          </div>
        ) : (
          <div className="content__items">
            {status === Status.LOADING ? skeleton : pizzas}
          </div>
        )}
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  );
};
