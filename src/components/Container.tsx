import './styles.css';

import * as fastXmlParser from 'fast-xml-parser';

import { IRSSItem, parseItems } from 'src/utils/common';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { List } from './List';
import { Pagination } from './Pagination';
import { Reader } from './Reader';

export const Container = (props) => {

  const [isRequesting, setIsRequesting] = useState(false);
  const [url, setUrl] = useState('');
  const [items, setItems] = useState([] as IRSSItem[]);
  const [currentPage, setCurrentPage] = useState(1);

  const getItems = useCallback(async() => {
    if (isRequesting) {
      return false;
    }

    setIsRequesting(true);
    console.log(isRequesting);

    const resBody = await (await fetch(url)).text();

    setItems(parseItems(resBody));
    setIsRequesting(false);
  }, [url]);

  const sendRequest = useEffect(() => {
    getItems();
  }, [getItems]);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  }

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // sendRequest();
  }

  const onDropdownChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUrl(e.currentTarget.value);
    console.log(e.currentTarget.value);
    // sendRequest();
  }

  const renderForm = () => {
    return (
      <div>
        <div className='controls-container'>
            <input className='control' placeholder='Enter the RSS url here...' onChange={handleUrlChange} />
            <button className='control' onClick={getItems}>Submit</button>
        </div>
      </div>
    )
  }

  // http://www.polygon.com/rss/index.xml
  // http://www.theverge.com/rss/index.xml
  // http://feeds.reuters.com/reuters/technologyNews
  // http://feeds.reuters.com/reuters/topNews
  // http://feeds.wired.com/wired/index
  // http://feeds.feedburner.com/Techcrunch
  // http://feeds.gawker.com/kotaku/full
  // https://www.buzzfeed.com/tasty.xml
  // skysports.com/rss/12040
  // https://api.foxsports.com/v1/rss?partnerKey=zBaFxRyGKCfxBagJG9b8pqLyndmvo7UU&tag=soccer

  const renderPredefinedFeedsDropdown = () => {
    return (
      <div>
        <select onChange={onDropdownChange}>
          <option value='http://feeds.bbci.co.uk/news/world/rss.xml#'>BBC | World News</option>
          <option value='http://www.polygon.com/rss/index.xml'>Polygon</option>
          <option value='hhttp://feeds.reuters.com/reuters/technologyNews'>Reuters | Technology News</option>
          <option value='http://feeds.reuters.com/reuters/topNews'>Reuters | Top News</option>
          <option value='http://feeds.wired.com/wired/index'>Wired</option>
          <option value='http://feeds.feedburner.com/Techcrunch'>Techcrunch</option>
          <option value='http://feeds.gawker.com/kotaku/full'>Kotaku</option>
          <option value='https://www.buzzfeed.com/tasty.xml'>Buzzfeed Tasty</option>
          <option value='https://skysports.com/rss/12040'>Sky Sports</option>
          <option value='https://api.foxsports.com/v1/rss?tag=soccer'>Fox Sports | Football</option>
        </select>
      </div>
    )
  }

  return (
    <div className='rss-reader'>
      {renderForm()}
      {renderPredefinedFeedsDropdown()}
      {isRequesting ? 'Loading...' : <List items={items} />}
      <Pagination currentPage={currentPage} total={25} perPage={10} onPageChange={onPageChange} />
    </div>
  );
}