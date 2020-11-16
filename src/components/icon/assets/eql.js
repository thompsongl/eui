import * as React from 'react';

const EuiIconEql = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M15.853 14.34L11.39 9.88l-.004-.004-.326-.326a.523.523 0 00-.739.739l.397.397.01.01 3.493 3.492h-2.164l-1.907-1.907-1.185-1.116a.53.53 0 00-.515-.121l-.765.23-.034.01a5.13 5.13 0 01-1.382.21 5.225 5.225 0 115.225-5.225.522.522 0 001.046 0l-.001-.003a6.27 6.27 0 10-8.132 5.992l.049.013a6.219 6.219 0 004.055-.152l1.89 1.891c.338.374.695.73 1.068 1.068.125.1.281.153.442.152.082.004.167.003.258.003h3.313a.527.527 0 00.37-.892z" />
    <path d="M9.258 4.276L6.503 2.685a.468.468 0 00-.466 0l-2.755 1.59a.466.466 0 00-.232.403V7.86a.466.466 0 00.232.402l2.755 1.59a.46.46 0 00.466 0l2.755-1.59a.466.466 0 00.232-.402V4.678a.466.466 0 00-.232-.402zm-.787.93V7.33a.36.36 0 01-.18.312L6.45 8.706a.359.359 0 01-.36 0L4.25 7.643a.36.36 0 01-.181-.312V5.206a.362.362 0 01.18-.312L6.09 3.831a.359.359 0 01.36 0l1.84 1.063a.362.362 0 01.181.312z" />
  </svg>
);

export const icon = EuiIconEql;
