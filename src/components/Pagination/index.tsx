import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

type PaginationProps = { currentPage: number; onChangePage: any };
export const Pagination: React.FC<PaginationProps> = React.memo(
  ({ currentPage, onChangePage }): JSX.Element => {
    return (
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={e => onChangePage(e.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={currentPage - 1}
        renderOnZeroPageCount={null}
      />
    );
  }
);
