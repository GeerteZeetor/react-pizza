import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCategoryId,
  setSortType,
  setCurrentPage,
} from '../redux/slices/filterSlice';

import { SearchContext } from '../App';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Category } from '../components/Category';
import { Sort } from '../components/Sort';
import { Index } from '../components/PizzaBlock';
import { Pagination } from '../components/Pagination';

export const Home = () => {
  const { searchValue } = useContext(SearchContext);
  const [pizzaArr, setPizzaArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [orderSort, setOrderSort] = useState(true);

  const { categoryId, sortType, currentPage } = useSelector(
    state => state.filters
  );
  const dispatch = useDispatch();

  const typeArr = ['rating', 'price', 'title'];
  const category = categoryId ? `category=${categoryId}` : '';
  const kindOfSorting = orderSort ? 'desc' : 'asc';
  const search = searchValue ? `title=${searchValue}` : '';

  const getPizza = async () => {
    setIsLoading(true);
    try {
      await axios
        .get(
          `https://6451ed17a2860c9ed4fdac76.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${typeArr[sortType]}&order=${kindOfSorting}&${search}`
        )
        .then(res => {
          setPizzaArr(res.data.map(item => <Index {...item} key={item.id} />));
          setIsLoading(false);
        })
        .catch(reason => {
          throw new Error(reason);
        });
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getPizza().then();
    window.scrollTo(0, 0);
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
            setOrderSort={setOrderSort}
          />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
            : pizzaArr}
        </div>
        <Pagination
          currentPage={currentPage}
          onChangePage={number => dispatch(setCurrentPage(number))}
        />
      </div>
    </>
  );
};
