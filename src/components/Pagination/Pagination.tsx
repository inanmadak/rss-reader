import React, { useCallback } from 'react';

import './styles.css';

export interface IPaginationProps {
  currentPage: number;
  total: number;
  perPage: number;
  onPageChange: (toPage: number) => void;
}

export const Pagination: React.FC<IPaginationProps> = ({currentPage, total, perPage, onPageChange}) => {

  const onClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onPageChange(parseInt(e.currentTarget.value, 10));
  }, [onPageChange]);

  const renderPageButtons = useCallback(() => {
    const numberOfButtons = Math.round(total / perPage);
    const buttons: JSX.Element[] = [];

    for (let pageNumber = 1; pageNumber <= numberOfButtons; pageNumber++) {
      buttons.push(
        <button
          key={pageNumber}
          value={pageNumber}
          onClick={onClick}
          className={`control ${pageNumber === currentPage ? 'current' : ''}`}
        >
          {pageNumber}
        </button>
      )
    }

    return buttons;
  }, [perPage, currentPage, total]);

  return (
    <div className='pagination'>
      {renderPageButtons()}
    </div>
  )
}