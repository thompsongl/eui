import { CommonProps } from '../common';
import { IconType, IconSize } from '../icon'
import { EuiToggleProps, ToggleType } from '../toggle/toggle'

import { SFC, ButtonHTMLAttributes, AnchorHTMLAttributes, ChangeEventHandler, FieldsetHTMLAttributes, MouseEventHandler, HTMLAttributes } from 'react';

declare module '@elastic/eui' {
  type EuiButtonPropsForButtonOrLink<Props> = (
    (Props & { onClick: MouseEventHandler<HTMLButtonElement> } & ButtonHTMLAttributes<HTMLButtonElement>) |
    (Props & { href: string; onClick: MouseEventHandler<HTMLAnchorElement> } & AnchorHTMLAttributes<HTMLAnchorElement>) |
    (Props & AnchorHTMLAttributes<HTMLAnchorElement> & ButtonHTMLAttributes<HTMLButtonElement>)
  )

  /**
   * Normal button type defs
   *
   * @see './button.js'
   */

  export type ButtonIconSide = 'left' | 'right';
  export type ButtonColor =
    | 'primary'
    | 'secondary'
    | 'warning'
    | 'danger'
    | 'ghost';
  export type ButtonSize = 's' | 'l';

  export interface EuiButtonProps {
    iconType?: IconType;
    iconSide?: ButtonIconSide;
    fill?: boolean;
    color?: ButtonColor;
    size?: ButtonSize;
    isLoading?: boolean;
    isDisabled?: boolean;
    contentProps?: HTMLAttributes<HTMLSpanElement>;
    textProps?: HTMLAttributes<HTMLSpanElement>;
  }
  export const EuiButton: SFC<
    EuiButtonPropsForButtonOrLink<CommonProps & EuiButtonProps>
  >;

  /**
   * button icon type defs
   *
   * @see './button_icon/button_icon.js'
   */

  export type ButtonIconColor =
    | 'primary'
    | 'danger'
    | 'disabled'
    | 'ghost'
    | 'text';

  export interface EuiButtonIconProps {
    iconType?: IconType;
    color?: ButtonIconColor;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    isDisabled?: boolean;
    size?: ButtonSize;
    iconSize?: IconSize
  }
  export const EuiButtonIcon: SFC<
    EuiButtonPropsForButtonOrLink<CommonProps & EuiButtonIconProps>
  >;

  /**
   * empty button type defs
   *
   * @see './button_empty/button_empty.js'
   */

  export type EmptyButtonIconSide = 'left' | 'right';
  export type EmptyButtonColor =
    | 'primary'
    | 'danger'
    | 'disabled'
    | 'text'
    | 'ghost';
  export type EmptyButtonSizes = 'xs' | 's' | 'l';
  export type EmptyButtonFlush = 'left' | 'right';

  export type EuiButtonEmptyProps = EuiButtonPropsForButtonOrLink<CommonProps & {
    iconType?: IconType;
    iconSide?: EmptyButtonIconSide;
    color?: EmptyButtonColor;
    size?: EmptyButtonSizes;
    flush?: EmptyButtonFlush;
    isLoading?: boolean;
    isDisabled?: boolean;
    contentProps?: HTMLAttributes<HTMLSpanElement>;
    textProps?: HTMLAttributes<HTMLSpanElement>;
  }>

  export const EuiButtonEmpty: SFC<EuiButtonEmptyProps>;

  /**
   * button toggle type defs
   *
   * @see './button_toggle/button_toggle.js'
   */

  export type EuiButtonToggleProps = EuiToggleProps &
    EuiButtonProps & {
      isIconOnly?: boolean;
      isEmpty?: boolean;
      toggleClassName?: string;
    }

  export const EuiButtonToggle: SFC<EuiButtonToggleProps>;

  /**
   * button group type defs
   *
   * @see './button_group/button_group.js'
   */

  export type EuiButtonGroupIdToSelectedMap = { [id: string]: boolean };
  export type GroupButtonSize = 's' | 'm';

  export interface EuiButtonGroupOption {
    id: string,
    label: string,
    isDisabled?: boolean,
  }
  export type EuiButtonGroupProps = FieldsetHTMLAttributes<HTMLFieldSetElement> &
    EuiButtonToggleProps & {
      options: EuiButtonGroupOption[],
      buttonSize?: GroupButtonSize;
      isFullWidth?: boolean;
      idSelected?: string;
      idToSelectedMap?: EuiButtonGroupIdToSelectedMap;
      legend?: string,
    }

  export const EuiButtonGroup: SFC<EuiButtonGroupProps>;
}
