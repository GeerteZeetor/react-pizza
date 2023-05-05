import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import Skeleton from '../components/PizzaBlock/Skeleton';
import { Category } from '../components/Category';
import { Sort } from '../components/Sort';
import { Index } from '../components/PizzaBlock';
import { Pagination } from '../components/Pagination';
import { SearchContext } from '../App';

export const Home = () => {
  const { searchValue } = useContext(SearchContext);
  const [pizzaArr, setPizzaArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderSort, setOrderSort] = useState(true);

  const typeArr = ['rating', 'price', 'title'];
  const category = categoryId ? `category=${categoryId}` : '';
  const orderType = orderSort ? 'desc' : 'asc';
  const search = searchValue ? `title=${searchValue}` : '';

  const getPizza = async () => {
    setIsLoading(true);
    try {
      await axios
        .get(
          `https://6451ed17a2860c9ed4fdac76.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${typeArr[sortType]}&order=${orderType}&${search}`
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
            onClickCategory={id => setCategoryId(id)}
          />
          <Sort
            value={sortType}
            onChangeSortType={type => setSortType(type)}
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
        <Pagination onChangePage={number => setCurrentPage(number)} />
      </div>
    </>
  );
};
