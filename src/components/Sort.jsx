import React, { useEffect, useRef, useState } from 'react';

export function Sort({
  value,
  onChangeSortType,
  onChangeOrderSort,
  orderSort,
}) {
  const [open, setOpen] = useState(false);
  const sortNames = ['популярности', 'цене', 'алфавиту'];
  const sortRef = useRef();

  const sortActive = () => {
    return sortNames.map((item, i) => (
      <li
        className={value === i ? 'active' : ''}
        onClick={() => {
          setOpen(false);
          onChangeSortType(i);
        }}
        key={i}
      >
        {item}
      </li>
    ));
  };

  useEffect(() => {
    const handleClickOutside = e => {
      if (!e.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <div
          onClick={() => {
            onChangeOrderSort(!orderSort);
          }}
        >
          <svg
            style={
              orderSort
                ? {
                    transform: 'rotate(180deg)',
                  }
                : {}
            }
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#fe5f1e"
            />
          </svg>
          <b>Сортировка по:</b>
        </div>
        <span
          onClick={() => {
            setOpen(!open);
          }}
        >
          {sortNames[value]}
        </span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>{sortActive()}</ul>
        </div>
      )}
    </div>
  );
}
