import './styles.css';

import * as fastXmlParser from 'fast-xml-parser';

import { IRSSItem, parseItems } from 'src/utils/common';
import React, { useCallback, useState } from 'react';

import { List } from './List';

export const Container = (props) => {

  const [isRequesting, setIsRequesting] = useState(false);
  const [url, setUrl] = useState('');
  const [items, setItems] = useState([] as IRSSItem[]);

  const sendRequest = useCallback(async () => {
    if (isRequesting) {
      return false;
    }

    setIsRequesting(true);

    const resBody = await (await fetch(url)).text();

    setItems(parseItems(resBody));
    setIsRequesting(false);

  }, [isRequesting]);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  }

  const renderForm = () => {
    return (
      <div>
        <div className='controls-container'>
            <input className='control' placeholder='Enter the RSS url here...' onChange={handleUrlChange} />
            <button className='control' onClick={sendRequest}>Submit</button>
        </div>

      </div>
    )
  }

  return (
    <div className='rss-reader'>
      {renderForm()}
      <List items={items} />
    </div>
  );
}