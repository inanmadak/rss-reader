import './styles.css';

import * as React from 'react';

import { IRSSItem, shorten } from 'src/utils/common';

const DESCRIPTION_LENGTH = 120;

export interface IListItemProps {
  item: IRSSItem;
}

export const ListItem: React.FC<IListItemProps> = ({ item }) => {
  const { title, description, guid, link } = item;

  return (
    <div className='list-item'>
      <span className='title'>{title}</span>
      <span className='description' title={description}>{shorten(description, DESCRIPTION_LENGTH)}</span>
      <a href={link} target='_blank'>read more</a>
    </div>

  )
}