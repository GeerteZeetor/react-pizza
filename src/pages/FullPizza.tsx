import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const FullPizza: React.FC = (): JSX.Element => {
  const { id } = useParams();
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `https://6451ed17a2860c9ed4fdac76.mockapi.io/items/${id}`
        );
        setPizza(data);
      } catch (e) {
        alert('Пиццы не найдено..');
        navigate('/');
      }
    }
    fetchData().then(r => r);
  }, []);

  if (!pizza) {
    return <>Loading...</>;
  }

  return (
    <div className="container">
      <div className="pizza-block-wrapper">
        <div className="pizza-block">
          <img
            className="pizza-block__image"
            src={pizza?.imageUrl}
            alt="Pizza"
          />
          <h4 className="pizza-block__title">{pizza?.title}</h4>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
            aliquid at cum dicta dolorem facilis, illo illum laboriosam
            molestiae molestias natus neque officiis possimus, rerum sapiente
            sequi sunt temporibus voluptatum!
          </div>
          <br />
          <div className="pizza-block__price">{pizza?.price} ₽</div>
        </div>
      </div>
    </div>
  );
};
