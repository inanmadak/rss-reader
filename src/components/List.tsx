import './styles.css';

import * as React from 'react';

import { IRSSItem } from 'src/utils/common';
import { ListItem } from './ListItem';

interface IListProps {
  items: IRSSItem[];
}

export const List: React.FC<IListProps> = ({ items }) => {

  const renderItems = () => items.map((item, index) => <ListItem key={index} item={item} />);

  return (
    <div className='list'>
      <div>News</div>
      <div>
        {renderItems()}
      </div>
    </div>
  );
}

List.defaultProps = { items: [] };