import qs from 'qs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setOrderSort,
  setFilters,
} from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';

import { SearchContext } from '../App';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Category } from '../components/Category';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import { Pagination } from '../components/Pagination';

export const Home = () => {
  const { searchValue } = useContext(SearchContext);

  const { categoryId, sortType, currentPage, orderSort } = useSelector(
    state => state.filters
  );
  const { items, status } = useSelector(state => state.pizzas);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const typeArr = ['rating', 'price', 'title'];
  const category = categoryId ? `category=${categoryId}` : '';
  const kindOfSorting = orderSort ? 'desc' : 'asc';
  const search = searchValue ? `title=${searchValue}` : '';

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

  const skeleton = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  const pizzas = items.map(item => <PizzaBlock {...item} key={item.id} />);

  //Если был первый рендер сохраняем URl параметры в редуксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(setFilters({ ...params }));
      isSearch.current = true;
    }
  }, []);

  //Если был первый рендер и были изменены параметры
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType,
        categoryId,
        currentPage,
        orderSort,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, orderSort, search, currentPage]);

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
          <Category
            value={categoryId}
            onClickCategory={id => dispatch(setCategoryId(id))}
          />
          <Sort
            value={sortType}
            onChangeSortType={type => dispatch(setSortType(type))}
            orderSort={orderSort}
            onChangeOrderSort={value => dispatch(setOrderSort(value))}
          />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {status === 'error' ? (
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
        ) : (
          <div className="content__items">
            {status === 'loading' ? skeleton : pizzas}
          </div>
        )}
        <Pagination
          currentPage={currentPage}
          onChangePage={number => dispatch(setCurrentPage(number))}
        />
      </div>
    </>
  );
};
