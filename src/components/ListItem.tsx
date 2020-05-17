import './styles.css';

import * as React from 'react';

import { IRSSItem, shorten } from 'src/utils/common';

import { Reader } from './Reader';

const DESCRIPTION_LENGTH = 280;

export interface IListItemProps {
  item: IRSSItem;
}

export const ListItem: React.FC<IListItemProps> = ({ item }) => {
  const { title, description, guid, link } = item;

  const [isReaderVisible, toggleReaderVisibility] = React.useState(false);
  const [currentReaderUrl, setCurrentReaderUrl] = React.useState('');

  const onClick = () => toggleReaderVisibility(!isReaderVisible);

  return (
    <div className='list-item' onClick={onClick}>
      <span className='title'>{title}</span>
      <span className='description' title={description}>{shorten(description, DESCRIPTION_LENGTH)}</span>
      <a href={link} target='_blank'>read &#8599;</a>
      {/* <Reader isVisible={isReaderVisible} url={link} /> */}
    </div>
  )
}