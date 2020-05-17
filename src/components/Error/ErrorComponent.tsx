import React, { useEffect } from 'react';

import './styles.css';

interface IErrorProps {
  error?: Error;
}

export const ErrorComponent: React.FC<IErrorProps> = ({ error }) => {

  // tslint:disable-next-line
  useEffect(() => console.log(error), [error]);

  return error?.message
    ? <div className='error'>{error.message}</div>
    : null;
}