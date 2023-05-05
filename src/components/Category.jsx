import React, { useState } from 'react';

export function Category({ value, onClickCategory }) {
  const arrTitle = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  const renderCategory = () => {
    return arrTitle.map((item, i) => {
      return (
        <li
          className={value === i ? 'active' : ''}
          onClick={() => onClickCategory(i)}
          key={i}
        >
          {item}
        </li>
      );
    });
  };

  return (
    <div className="categories">
      <ul>{renderCategory()}</ul>
    </div>
  );
}
