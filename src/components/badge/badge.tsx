import React, {
  FunctionComponent,
  MouseEventHandler,
  HTMLAttributes,
} from 'react';
import classNames from 'classnames';
import { css } from 'astroturf';
import { CommonProps, ExclusiveUnion, keysOf, PropsOf, Omit } from '../common';

import { isColorDark, hexToRgb } from '../../services/color';

import { EuiIcon, IconColor, IconType } from '../icon';

const light = css`
  @import 'badge_light.module';
`;

const dark = css`
  @import 'badge_dark.module';
`;

type IconSide = 'left' | 'right';

type WithButtonProps = {
  /**
   * Will apply an onclick to the badge itself
   */
  onClick: MouseEventHandler<HTMLButtonElement>;

  /**
   * Aria label applied to the iconOnClick button
   */
  onClickAriaLabel: string;
} & Omit<HTMLAttributes<HTMLButtonElement>, 'onClick' | 'color'>;

type WithSpanProps = Omit<HTMLAttributes<HTMLSpanElement>, 'onClick' | 'color'>;

interface WithIconOnClick {
  /**
   * Will apply an onclick to icon within the badge
   */
  iconOnClick: MouseEventHandler<HTMLButtonElement>;

  /**
   * Aria label applied to the iconOnClick button
   */
  iconOnClickAriaLabel: string;
}

export type EuiBadgeProps = {
  /**
   * Accepts any string from our icon library
   */
  iconType?: IconType;

  /**
   * The side of the badge the icon should sit
   */
  iconSide?: IconSide;

  /**
   * Accepts either our palette colors (primary, secondary ..etc) or a hex value `#FFFFFF`, `#000`.
   */
  color?: IconColor;

  /**
   * Props passed to the close button.
   */
  closeButtonProps?: Partial<PropsOf<EuiIcon>>;
  theme?: 'light' | 'dark';
} & CommonProps &
  ExclusiveUnion<WithIconOnClick, {}> &
  ExclusiveUnion<WithSpanProps, WithButtonProps>;

const colorToClassNameMap: { [color in IconColor]: string } = {
  default: light['euiBadge--default'],
  primary: light['euiBadge--primary'],
  secondary: light['euiBadge--secondary'],
  accent: light['euiBadge--accent'],
  warning: light['euiBadge--warning'],
  danger: light['euiBadge--danger'],
  hollow: light['euiBadge--hollow'],
};

export const COLORS = keysOf(colorToClassNameMap);

const iconSideToClassNameMap: { [side in IconSide]: string } = {
  left: light['euiBadge--iconLeft'],
  right: light['euiBadge--iconRight'],
};

export const ICON_SIDES = keysOf(iconSideToClassNameMap);

export const EuiBadge: FunctionComponent<EuiBadgeProps> = ({
  children,
  color = 'default',
  iconType,
  iconSide = 'left',
  className,
  onClick,
  iconOnClick,
  onClickAriaLabel,
  iconOnClickAriaLabel,
  closeButtonProps,
  theme = 'light',
  ...rest
}) => {
  const styles = theme !== 'dark' ? light : dark;
  const colorToClassNameMap: { [color in IconColor]: string } = {
    default: styles['euiBadge--default'],
    primary: styles['euiBadge--primary'],
    secondary: styles['euiBadge--secondary'],
    accent: styles['euiBadge--accent'],
    warning: styles['euiBadge--warning'],
    danger: styles['euiBadge--danger'],
    hollow: styles['euiBadge--hollow'],
  };

  const iconSideToClassNameMap: { [side in IconSide]: string } = {
    left: styles['euiBadge--iconLeft'],
    right: styles['euiBadge--iconRight'],
  };

  checkValidColor(color);

  let optionalColorClass = null;
  let optionalCustomStyles = undefined;
  let textColor = null;

  if (COLORS.indexOf(color) > -1) {
    optionalColorClass = colorToClassNameMap[color];
  } else {
    if (isColorDark(...hexToRgb(color))) {
      textColor = '#FFFFFF';
    } else {
      textColor = '#000000';
    }

    optionalCustomStyles = { backgroundColor: color, color: textColor };
  }

  const classes = classNames(
    styles.euiBadge,
    {
      [styles['euiBadge-isClickable']]: onClick && !iconOnClick,
    },
    iconSideToClassNameMap[iconSide],
    optionalColorClass,
    className
  );

  const closeClassNames = classNames(
    styles.euiBadge__icon,
    closeButtonProps && closeButtonProps.className
  );

  let optionalIcon = null;
  if (iconType) {
    if (iconOnClick) {
      if (!iconOnClickAriaLabel) {
        console.warn(
          'When passing the iconOnClick props to EuiBadge, you must also provide iconOnClickAriaLabel'
        );
      }
      optionalIcon = (
        <button
          className={styles.euiBadge__iconButton}
          aria-label={iconOnClickAriaLabel}
          onClick={iconOnClick}>
          <EuiIcon
            type={iconType}
            size="s"
            {...closeButtonProps}
            className={closeClassNames}
          />
        </button>
      );
    } else {
      optionalIcon = (
        <EuiIcon type={iconType} size="s" className={styles.euiBadge__icon} />
      );
    }
  }

  if (onClick && !onClickAriaLabel) {
    console.warn(
      'When passing onClick to EuiBadge, you must also provide onClickAriaLabel'
    );
  }

  if (onClick && iconOnClick) {
    return (
      <span className={classes} style={optionalCustomStyles}>
        <span className={styles.euiBadge__content}>
          <button
            className={styles.euiBadge__childButton}
            aria-label={onClickAriaLabel}
            onClick={onClick}
            {...rest}>
            {children}
          </button>
          {optionalIcon}
        </span>
      </span>
    );
  } else if (onClick) {
    return (
      <button
        aria-label={onClickAriaLabel}
        className={classes}
        onClick={onClick}
        style={optionalCustomStyles}
        {...rest}>
        <span className={styles.euiBadge__content}>
          <span>{children}</span>
          {optionalIcon}
        </span>
      </button>
    );
  } else {
    return (
      <span className={classes} style={optionalCustomStyles} {...rest}>
        <span className={styles.euiBadge__content}>
          <span className={styles.euiBadge__text}>{children}</span>
          {optionalIcon}
        </span>
      </span>
    );
  }
};

function checkValidColor(color: null | IconColor | string) {
  const validHex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;

  if (color != null && !validHex.test(color) && !COLORS.includes(color)) {
    console.warn(
      'EuiBadge expects a valid color. This can either be a three ' +
        `or six character hex value or one of the following: ${COLORS}`
    );
  }
}
