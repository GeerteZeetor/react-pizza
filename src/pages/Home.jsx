import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Skeleton from '../components/PizzaBlock/Skeleton';
import { Category } from '../components/Category';
import { Sort } from '../components/Sort';
import { Index } from '../components/PizzaBlock';

export const Home = () => {
  const [pizzaArr, setPizzaArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState(0);
  const [orderSort, setOrderSort] = useState(true);
  const typeArr = ['rating', 'price', 'title'];

  const category = categoryId ? `category=${categoryId}` : '';
  const orderType = orderSort ? 'desc' : 'asc';

  const getPizza = async () => {
    setIsLoading(true);
    try {
      await axios
        .get(
          `https://6451ed17a2860c9ed4fdac76.mockapi.io/items?${category}&sortBy=${typeArr[sortType]}&order=${orderType}`
        )
        .then(res => {
          setPizzaArr(res.data.map(item => <Index {...item} key={item.id} />));
          setTimeout(() => {
            setIsLoading(false);
          }, 300);
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
  }, [categoryId, sortType, orderSort]);
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
      </div>
    </>
  );
};
