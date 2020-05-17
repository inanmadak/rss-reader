import './styles.css';

import * as fastXmlParser from 'fast-xml-parser';

import { IRSSItem, parseItems } from 'src/utils/common';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { List } from './List';
import { Pagination } from './Pagination';
import { RSSList } from 'src/data/rssList';
import { Reader } from './Reader';

const PER_PAGE = 10;

export const Container = (props) => {

  const [isRequesting, setIsRequesting] = useState(false);
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [url, setUrl] = useState('');
  const [items, setItems] = useState([] as IRSSItem[]);
  const [currentPage, setCurrentPage] = useState(1);

  const getItems = useCallback(async () => {
    const abortController = new AbortController();
    const timeout = setTimeout(() => {
      abortController.abort();
    }, 5000);

    let resBody = '';

    try {
      resBody = await (await fetch(url, { signal: abortController.signal })).text();
    } catch (err) {
      // Log, clear timeour and set is requesting to false
      // tslint:disable-next-line
      console.log(err);
      clearTimeout(timeout);
      setIsRequesting(false);
      return;
    }

    setItems(parseItems(resBody));
    setIsRequesting(false);
  }, [url, setItems, setIsRequesting]);

  const handleUrlChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEditingUrl(true);
    setUrl(e.target.value);
  }, [setUrl]);

  const onPageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, [setCurrentPage]);

  const onDropdownChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsEditingUrl(false);
    setUrl(e.currentTarget.value);
  }, [setUrl]);

  useEffect(() => {
    if (!isEditingUrl) {
      setIsRequesting(true);
      getItems();
    }
  }, [getItems, setIsRequesting, isEditingUrl]);

  const renderForm = () => {
    return (
      <div>
        <div className='controls-container'>
          {renderPredefinedFeedsDropdown()}
          <div>or</div>
          <input className='control' value={url} placeholder='Enter the RSS url here...' onChange={handleUrlChange} />
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
        <select className='control' onChange={onDropdownChange}>
          <option disabled selected value='#'>Select a feed source</option>
          {RSSList.map((source) => <option value={source.value}>{source.label}</option>)}
        </select>
      </div>
    )
  }

  return (
    <div className='rss-reader'>
      {renderForm()}
      {/* {renderPredefinedFeedsDropdown()} */}
      {isRequesting ? 'Loading...' : <List items={items} currentPage={currentPage} perPage={PER_PAGE} onPageChange={onPageChange} />}
      {/* <Pagination currentPage={currentPage} total={25} perPage={10} onPageChange={onPageChange} /> */}
    </div>
  );
}