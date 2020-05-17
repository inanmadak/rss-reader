import React, { useCallback } from 'react';

import { IRSSItem } from 'utils/common';

import { ListItem } from './ListItem';
import { Pagination } from '../Pagination/Pagination';

import './styles.css';

interface IListProps {
  items: IRSSItem[];
  onPageChange: (toPage: number) => void;
  currentPage: number;
  perPage: number;
}

export const List: React.FC<IListProps> = ({ items, currentPage, perPage, onPageChange }) => {

  const renderItems = useCallback(
    () => {
      const currentPageItems = [...items].splice((currentPage - 1) * perPage, perPage);
      return currentPageItems.map(
        (item, index) => <ListItem key={index} item={item} />
      );
    },
    [currentPage, items, perPage]
  );

  return (
    <div className='list'>
      <h3>Feed</h3>
      <div>
        {renderItems()}
      </div>
      <Pagination currentPage={currentPage} total={items.length} perPage={perPage} onPageChange={onPageChange} />
    </div>
  );
}

List.defaultProps = { items: [] };