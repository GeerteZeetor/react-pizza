import React from 'react';

type CategoriesProps = { value: number; onClickCategory: any };

export const Category: React.FC<CategoriesProps> = ({
  value,
  onClickCategory,
}): JSX.Element => {
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
};
