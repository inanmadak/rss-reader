import * as React from 'react';

export interface IReaderProps {
  url: string;
  isVisible: boolean;
}

export const Reader: React.FC<IReaderProps> = ({ url, isVisible }) => {
  return isVisible ?
    (
      <div className='reader'>
        <div className='wrapper'>
          <iframe className='content' allow='allow-top-origin' src={url}></iframe>
        </div>
      </div>
    )
    : null;
}