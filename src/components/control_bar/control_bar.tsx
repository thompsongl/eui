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
    const { children, className, showContent, controls, ...rest } = this.props;

    const classes = classNames('euiControlBar', className, {
      'euiControlBar--open': this.props.showContent,
    });

    const tabClasses = classNames('euiControlBar__tab', {
      'euiControlBar__tab--active': this.props.showContent,
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
              key={control.id}
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
          break;
        case 'icon':
          return (
            <EuiButtonIcon
              key={control.id}
              iconType={control.iconType}
              data-test-subj={control.label}
              aria-label={control.label}
              onClick={control.onClick}
              className={classNames(
                'euiControlBar__euiButtonIcon',
                control.classNames
              )}
              color={control.color ? control.color : 'ghost'}
            />
          );
          break;
        case 'spacer':
          return (
            <div
              key={control.controlType + index}
              className="euiControlBar__spacer"
            />
          );
          break;
        case 'text':
          return (
            <EuiText
              color={control.color ? control.color : 'default'}
              className="euiControlBar__euiText"
              key={control.id}
              size="s">
              {control.label}
            </EuiText>
          );
          break;
        case 'tab':
          const tab = (
            <div
              key={control.id}
              className={`euiControlBar__tab ${
                control.id === this.state.selectedTab ? tabClasses : ''
              }`}
              data-test-subj={control.label}
              aria-label={`Control Bar - ${control.label}`}
              onClick={event => handleTabClick(control, event)}>
              <EuiText size="s">{control.label}</EuiText>
            </div>
          );
          return tab;
          break;
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
