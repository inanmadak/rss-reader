import './styles.css';

import * as React from 'react';

import { IRSSItem } from 'src/utils/common';
import { ListItem } from './ListItem';
import { Pagination } from './Pagination';

interface IListProps {
  items: IRSSItem[];
  onPageChange: (toPage: number) => void;
  currentPage: number;
  perPage: number;
}

export const List: React.FC<IListProps> = ({ items, currentPage, perPage, onPageChange }) => {

  const renderItems = () => items.map((item, index) => <ListItem key={index} item={item} />);

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