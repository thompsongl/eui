import React, { Component, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps, PropsOf } from '../common';
// @ts-ignore-next-line
import { EuiButton, EuiButtonIcon } from '../button';
import { EuiText } from '../text';

interface ButtonControl {
  controlType: 'button';
  id: string;
  color?: string;
  label: string;
  classNames?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

interface TabControl {
  controlType: 'tab';
  id: string;
  label: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

interface TextControl {
  controlType: 'text';
  id: string;
  label: string;
  color?: PropsOf<typeof EuiText>['color'];
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

interface SpacerControl {
  controlType: 'spacer';
  id: string;
}

interface DivideControl {
  controlType: 'divider';
  id: string;
}

interface IconControl {
  controlType: 'icon';
  id: string;
  iconType: string;
  label: string;
  classNames?: string;
  color?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export type Control =
  | ButtonControl
  | TabControl
  | TextControl
  | IconControl
  | DivideControl
  | SpacerControl;

export type EuiControlBarProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    /**
     * Show or hide the content well with your custom content inside
     */
    showContent?: boolean;

    /**
     * An array of controls, actions, and layout spacers to display
     */
    controls: Control[];
    /**
     * The maximum height of the overlay. Default is 90%, Medium is 75%, Small is 50%;
     */
    size?: 's' | 'm' | 'l';
  };

interface EuiControlBarState {
  selectedTab: string;
}

export class EuiControlBar extends Component<
  EuiControlBarProps,
  EuiControlBarState
> {
  state = {
    selectedTab: '',
  };

  render() {
    const {
      children,
      className,
      showContent,
      controls,
      size,
      ...rest
    } = this.props;

    const classes = classNames('euiControlBar', className, {
      'euiControlBar--open': showContent,
      'euiControlBar--large': size === 'l' || !size,
      'euiControlBar--medium': size === 'm',
      'euiControlBar--small': size === 's',
    });

    const tabClasses = classNames('euiControlBar__tab', {
      'euiControlBar__tab--active': showContent,
    });

    const handleTabClick = (
      control: TabControl,
      e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      this.setState(
        {
          selectedTab: control.id,
        },
        () => {
          control.onClick(e);
        }
      );
    };

    const controlItem = (control: Control, index: number) => {
      switch (control.controlType) {
        case 'button':
          return (
            <EuiButton
              key={control.id + index}
              aria-label={`Control Bar - ${control.label}`}
              onClick={control.onClick}
              data-test-subj={control.label}
              className={classNames(
                'euiControlBar__euiButton',
                control.classNames
              )}
              color={control.color ? control.color : 'ghost'}>
              <EuiText size="s">{control.label}</EuiText>
            </EuiButton>
          );
        case 'icon':
          return (
            <EuiButtonIcon
              key={control.id + index}
              iconType={control.iconType}
              data-test-subj={control.label}
              aria-label={control.label}
              onClick={control.onClick}
              className={classNames(
                'euiControlBar__euiButtonIcon',
                control.classNames
              )}
              color={control.color ? control.color : null}
            />
          );
        case 'divider':
          return <div key={control.id} className="euiControlBar__divider" />;
        case 'spacer':
          return (
            <div
              key={control.controlType + index}
              className="euiControlBar__spacer"
            />
          );
        case 'text':
          return (
            <EuiText
              color={control.color ? control.color : 'ghost'}
              className="euiControlBar__euiText"
              key={control.id + index}
              size="s">
              {control.label}
            </EuiText>
          );
        case 'tab':
          return (
            <div
              key={control.id + index}
              className={`euiControlBar__tab ${
                control.id === this.state.selectedTab ? tabClasses : ''
              }`}
              data-test-subj={control.label}
              aria-label={`Control Bar - ${control.label}`}
              onClick={event => handleTabClick(control, event)}>
              <EuiText size="s">{control.label}</EuiText>
            </div>
          );
      }
    };

    return (
      <div className={classes} aria-label="Control Bar" {...rest}>
        <div className="euiControlBar__controls">
          {controls.map((control, index) => {
            return controlItem(control, index);
          })}
        </div>
        {this.props.showContent ? (
          <div className="euiControlBar__content">{children}</div>
        ) : null}
      </div>
    );
  }
}
