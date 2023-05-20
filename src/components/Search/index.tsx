import React, { useCallback, useRef, useState } from 'react';
import { debounce } from 'lodash';

import styles from './Search.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

export const Search: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { searchValue } = useSelector(state => state.filters);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const updateSearchValue = useCallback(
    debounce(str => {
      dispatch(setSearchValue(str));
    }, 650),
    []
  );

  const onChangeInput = (ev: any) => {
    setValue(ev.target.value);
    updateSearchValue(ev.target.value);
  };

  const clearInput = () => {
    inputRef.current?.focus();
    dispatch(setSearchValue(''));
    setValue('');
  };

  return (
    <div className={styles.root}>
      <input
        ref={inputRef}
        placeholder="Поиск пиццы"
        className={styles.input}
        value={value}
        onChange={event => {
          onChangeInput(event);
        }}
      />
      <svg
        className={styles.icon}
        height="512"
        viewBox="0 0 512 512"
        width="512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title />
        <path d="M456.69,421.39,362.6,327.3a173.81,173.81,0,0,0,34.84-104.58C397.44,126.38,319.06,48,222.72,48S48,126.38,48,222.72s78.38,174.72,174.72,174.72A173.81,173.81,0,0,0,327.3,362.6l94.09,94.09a25,25,0,0,0,35.3-35.3ZM97.92,222.72a124.8,124.8,0,1,1,124.8,124.8A124.95,124.95,0,0,1,97.92,222.72Z" />
      </svg>
      {value && (
        <svg
          onClick={clearInput}
          className={styles.clearIcon}
          data-name="Capa 1"
          id="Capa_1"
          viewBox="0 0 20 19.84"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10.17,10l3.89-3.89a.37.37,0,1,0-.53-.53L9.64,9.43,5.75,5.54a.37.37,0,1,0-.53.53L9.11,10,5.22,13.85a.37.37,0,0,0,0,.53.34.34,0,0,0,.26.11.36.36,0,0,0,.27-.11l3.89-3.89,3.89,3.89a.34.34,0,0,0,.26.11.35.35,0,0,0,.27-.11.37.37,0,0,0,0-.53Z" />
        </svg>
      )}
    </div>
  );
};
