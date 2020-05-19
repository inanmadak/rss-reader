import React from 'react';

import { shorten } from 'utils/common';
import { IRSSItem } from 'utils/rss';

import './styles.css';

const DESCRIPTION_LENGTH = 240;

export interface IListItemProps {
  item: IRSSItem;
}

export const ListItem: React.FC<IListItemProps> = ({ item }) => {
  const { title, description, link } = item;

  return (
    <div className='list-item'>
      <span className='title'>{title}</span>
      <span className='description' title={description}>{shorten(description, DESCRIPTION_LENGTH)}</span>
      <a href={link} target='_blank'>read &#8599;</a>
    </div>
  )
}