import React, { HTMLAttributes, FunctionComponent } from 'react';
import { CommonProps, keysOf } from '../common';
import classNames from 'classnames';
import css from 'styled-jsx/css';

import { isColorDark, hexToRgb } from '../../services/color';
import { VISUALIZATION_COLORS, toInitials } from '../../services';

const sizeToClassNameMap = {
  none: null,
  s: 'euiAvatar--s',
  m: 'euiAvatar--m',
  l: 'euiAvatar--l',
  xl: 'euiAvatar--xl',
};

export const SIZES = keysOf(sizeToClassNameMap);
export type EuiAvatarSize = keyof typeof sizeToClassNameMap;

const typeToClassNameMap = {
  space: 'euiAvatar--space',
  user: 'euiAvatar--user',
};

export const TYPES = keysOf(typeToClassNameMap);
export type EuiAvatarType = keyof typeof typeToClassNameMap;

export type EuiAvatarProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    /**
     * Full name of avatar for title attribute and calculating initial if not provided
     */
    name: string;

    /**
     * Accepts hex value `#FFFFFF`, `#000` otherwise a viz palette color will be assigned
     */
    color?: string;

    /**
     * Custom initials (max 2 characters).
     * By default will take the first character (of each word).
     */
    initials?: string;

    /**
     * Specify how many characters to show (max 2 allowed).
     * By default, will show based on number of words.
     */
    initialsLength?: 1 | 2;

    /**
     * The type of avatar this is displaying
     */
    type?: EuiAvatarType;
    imageUrl?: string;
    size?: EuiAvatarSize;
    theme?: any;
    themeColor?: string;
  };

export const EuiAvatar: FunctionComponent<EuiAvatarProps> = ({
  className,
  color,
  imageUrl,
  initials,
  initialsLength,
  name,
  size = 'm',
  type = 'user',
  theme = 'light',
  ...rest
}) => {
  // let themeVars;
  // if (theme === 'dark') {
  //   const darkTheme = css`
  //     @import '../../themes/eui/eui_colors_dark';
  //   `;
  //   themeVars = darkTheme;
  // } else if (theme !== 'light') {
  //   themeVars = '$euiColorFullShade: coral';
  // }
  // const { className: themeClass, styles: themeStyles } = css.resolve`
  //   @mixin rtl($theme) {
  //     $euiColorFullShade: if(map-get($theme, euiColorFullShade), map-get($theme, euiColorFullShade), $euiColorFullShade);
  //   }
  //
  //   //$theme: ();
  //   //$euiColorFullShadeMap: (euiColorFullShade: ${theme.euiColorFullShade});
  //   //$themeMap: map-merge($theme, $euiColorFullShadeMap);
  //   //@include rtl($themeMap);
  //   //$euiColorFullShade: if(map-get($euiColorFullShadeMap, euiColorFullShade), map-get($euiColorFullShadeMap, euiColorFullShade), $euiColorSave);
  //   @import 'avatar';
  // `;
  const { className: themeClass, styles: themeStyles } = css.resolve`
    @import 'avatar';
  `;
  const { className: darkThemeClass, styles: darkThemeStyles } = css.resolve`
    @import '../../themes/eui/eui_colors_dark';
    @import 'avatar';
  `;
  // TODO: React Hook?
  const styles = [themeStyles, darkThemeStyles];

  const classes = classNames(
    'euiAvatar',
    sizeToClassNameMap[size],
    typeToClassNameMap[type],
    className,
    { [themeClass]: theme === 'light' },
    { [darkThemeClass]: theme === 'dark' }
  );

  checkValidColor(color);
  checkValidInitials(initials);

  let optionalInitial;
  if (name && !imageUrl) {
    // Create the initials
    const calculatedInitials = toInitials(name, initialsLength, initials);
    optionalInitial = <span aria-hidden="true">{calculatedInitials}</span>;
  }

  const assignedColor =
    color ||
    VISUALIZATION_COLORS[Math.floor(name.length % VISUALIZATION_COLORS.length)];
  const textColor = isColorDark(...hexToRgb(assignedColor))
    ? '#FFFFFF'
    : '#000000';

  return (
    <div className={classes} aria-label={name} title={name} {...rest}>
      {optionalInitial}
      {styles}
      <style jsx>{`
        .euiAvatar {
          background-image: ${imageUrl ? `url(${imageUrl})` : 'none'};
          background-color: ${assignedColor};
          color: ${textColor};
        }
      `}</style>
    </div>
  );
};

// TODO: Migrate to a service
function checkValidColor(color: EuiAvatarProps['color']) {
  const validHex = color && /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
  if (color && !validHex) {
    throw new Error(
      'EuiAvatar needs to pass a valid color. This can either be a three ' +
        'or six character hex value'
    );
  }
}

function checkValidInitials(initials: EuiAvatarProps['initials']) {
  // Must be a string of 1 or 2 characters
  if (initials && initials.length > 2) {
    // tslint:disable-next-line:no-console
    console.warn(
      'EuiAvatar only accepts a max of 2 characters for the initials as a string. It is displaying only the first 2 characters.'
    );
  }
}
