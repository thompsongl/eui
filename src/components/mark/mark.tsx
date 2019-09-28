import React, { FunctionComponent, HTMLAttributes } from 'react';
import classnames from 'classnames';
import { CommonProps } from '../common';

type EuiMarkProps = CommonProps &
  HTMLAttributes<HTMLElement> & {
    type?: 'mark' | 'strong' | 'em';
  };

export const EuiMark: FunctionComponent<EuiMarkProps> = ({
  children,
  className,
  type = 'mark',
}) => {
  const classes = classnames('euiMark', [`euiMark--${type}`], className);
  return (
    <mark className={classes}>
      {children}
      <style jsx>{`
        @import 'mark';
      `}</style>
    </mark>
  );
};
