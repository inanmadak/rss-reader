import React, { useCallback, useEffect, useState } from 'react';

import { RSSList } from  'data/rssList';
import { IRSSItem, parseItems, isValidUrl } from 'utils/common';

import { List } from 'components/List/List';

import './styles.css';
import { ErrorComponent } from 'components/Error/ErrorComponent';
import { INVALID_URL, PAGINATION_PER_PAGE } from './constants';

export const Container: React.FC<any> = (props) => {

  const [isRequesting, setIsRequesting] = useState(false);
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [url, setUrl] = useState('');
  const [items, setItems] = useState([] as IRSSItem[]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<Error | undefined>(undefined);

  const reportError = useCallback((err: Error) => {
    setError(err);
    setIsRequesting(false);
  }, [setError, setIsRequesting]);

  const getItems = useCallback(async () => {
    const abortController = new AbortController();
    const timeout = setTimeout(() => {
      abortController.abort();
    }, 5000);

    let resBody = '';

    try {
      if (url !== '' && !isValidUrl(url)) {
        return reportError(new Error(INVALID_URL));
      }
      const response = await fetch(url, { signal: abortController.signal });

      if (!response.ok) {
        return reportError(new Error(`Error: ${response.statusText}`));
      }
      resBody = await response.text();
    } catch (err) {
      // Log, clear timeour and set is requesting to false
      // tslint:disable-next-line
      console.log(err);
      clearTimeout(timeout);
      reportError({ ...err, message: INVALID_URL });
      return;
    }

    const data = parseItems(resBody);

    if (!data) {
      return reportError(new Error(INVALID_URL));
    }

    setItems(data);
    setIsRequesting(false);
    setError(undefined);
  }, [url, setItems, setIsRequesting, setError, reportError]);

  const onSubmit = useCallback(() => {
    setIsEditingUrl(false);
    setCurrentPage(1);
  }, []);

  const onUrlChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEditingUrl(true);
    setUrl(e.target.value);
  }, [setUrl]);

  const onPageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, [setCurrentPage]);

  const onDropdownChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsEditingUrl(false);
    setCurrentPage(1);
    setUrl(e.currentTarget.value);
  }, [setUrl, setCurrentPage, setIsEditingUrl]);

  useEffect(() => {
    if (!isEditingUrl) {
      setIsRequesting(true);
      getItems();
    }
  }, [getItems, setIsRequesting, isEditingUrl]);

  const renderForm = () => {
    return (
      <div className='form-wrapper'>
        <div className='headline'>
          Simple RSS Reader <br/>
          with Hooks
        </div>
        <div className='controls-container'>
          {renderPredefinedFeedsDropdown()}
          <div>or</div>
          <input className='control' value={url} placeholder='Enter the RSS url here...' onChange={onUrlChange} />
          <button className='control' onClick={onSubmit}>Submit</button>
        </div>
      </div>
    )
  }

  const renderPredefinedFeedsDropdown = () => {
    return (
      <div>
        <select defaultValue='#' className='control' onChange={onDropdownChange}>
          <option disabled value='#'>Select a feed source</option>
          {RSSList.map((source, index) => <option key={index} value={source.value}>{source.label}</option>)}
        </select>
      </div>
    )
  }

  return (
    <div className='rss-reader'>
      {renderForm()}
      <ErrorComponent error={error} />
      {isRequesting
        ? 'Loading...'
        : <List items={items} currentPage={currentPage} perPage={PAGINATION_PER_PAGE} onPageChange={onPageChange} />
      }
    </div>
  );
}