import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { addItem } from '../../redux/slices/cartSlice';
import { RootState } from '../../redux/store';

const typeNames = ['тонкое', 'традиционное'];

type PizzaBlockProps = {
  id: string;
  title: string;
  price: number;
  count: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  price,
  count,
  imageUrl,
  sizes,
  types,
}): JSX.Element => {
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const dispatch = useDispatch();

  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((obj: { id: string }) => obj.id === id)
  );

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      count,
      type: typeNames[activeType],
      size: sizes[activeSize],
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link key={id} to={`pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        </Link>
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type, i) => (
              <li
                key={i}
                onClick={() => setActiveType(type)}
                className={
                  type === activeType || types.length < 2 ? 'active' : ''
                }
              >
                {typeNames[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, i) => (
              <li
                onClick={() => setActiveSize(i)}
                key={i}
                className={i === activeSize ? 'active' : ''}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button
            className="button button--outline button--add"
            onClick={onClickAdd}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {cartItem && <i>{cartItem.count}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};
