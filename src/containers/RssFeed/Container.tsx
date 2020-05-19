import React, { useCallback, useEffect, useState } from 'react';

import { List } from 'components/List/List';
import { ErrorComponent } from 'components/Error/ErrorComponent';
import { RSSList } from  'data/rssList';
import { api } from 'utils/api';
import { IRSSItem, parseItems } from 'utils/rss';

import { INVALID_URL, PAGINATION_PER_PAGE } from './constants';

import './styles.css';

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

    let resBody = '';

    try {
      const response = await api.request(url);

      resBody = await response.text();
    } catch (err) {
      setItems([]);
      reportError(err);
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

  const renderPredefinedFeedsDropdown = useCallback(() => {
    return (
      <div>
        <select defaultValue='#' className='control' onChange={onDropdownChange}>
          <option disabled value='#'>Select a feed source</option>
          {RSSList.map((source, index) => <option key={index} value={source.value}>{source.label}</option>)}
        </select>
      </div>
    )
  }, [onDropdownChange]);

  const renderForm = useCallback(() => {
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
  }, [onSubmit, onUrlChange, renderPredefinedFeedsDropdown]);

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