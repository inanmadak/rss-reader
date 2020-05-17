import * as React from 'react';

export interface IPaginationProps {
  currentPage: number;
  total: number;
  perPage: number;
  onPageChange: (toPage: number) => void;
}

export const Pagination: React.FC<IPaginationProps> = ({currentPage, total, perPage, onPageChange}) => {

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onPageChange(parseInt(e.currentTarget.value, 10));
  }

  const renderPageButtons = () => {
    const numberOfButtons = Math.round(total / perPage);
    const buttons: JSX.Element[] = [];

    for (let i = 1; i <= numberOfButtons; i++) {
      buttons.push(
        <button
          key={i}
          value={i}
          onClick={onClick}
          className={`control ${i === currentPage ? 'current' : ''}`}
        >
          {i}
        </button>
      )
    }

    return buttons;
  }
  return (
    <div className='pagination'>
        {renderPageButtons()}
    </div>
  )
}