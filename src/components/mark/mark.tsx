import React, { FunctionComponent, HTMLAttributes } from 'react';
import classnames from 'classnames';
import { css } from 'astroturf';
import { CommonProps } from '../common';

type EuiMarkProps = CommonProps &
  HTMLAttributes<HTMLElement> & {
    type?: 'mark' | 'strong' | 'em';
  };

const style = css`
  @import 'mark.module';
`;

export const EuiMark: FunctionComponent<EuiMarkProps> = ({
  children,
  className,
  type = 'mark',
}) => {
  const classes = classnames(
    style.euiMark,
    [style[`euiMark--${type}`]],
    className
  );
  return <mark className={classes}>{children}</mark>;
};
