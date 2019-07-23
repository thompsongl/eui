import React, { Component, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';
// @ts-ignore-next-line
import { EuiButton, EuiButtonIcon } from '../button';
import { EuiText } from '../text';
export type EuiControlBarProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    /**
     * Show or hide the content well with your custom content inside
     */
    showContent?: boolean;

    /**
     * An array of controls, actions, and layout spacers to display
     */
    controls: any[];
  };

export class EuiControlBar extends Component<EuiControlBarProps> {
  constructor(props: EuiControlBarProps) {
    super(props);
  }

  func() {
    console.log('Func != Funk');
  }

  render() {
    const { children, className, showContent, controls, ...rest } = this.props;

    const classes = classNames(
      'euiControlBar',
      this.props.showContent ? 'euiControlBar--open' : null,
      className
    );

    const controlItem = (control: any, index: number) => {
      switch (control.controlType) {
        case 'button':
          return (
            <EuiButton
              key={control.label}
              aria-label={`Control Bar - ${control.label}`}
              onClick={control.onClick}
              data-test-subj={control.label}
              className={`euiControlBar__euiButton ${
                control.classNames ? control.classNames : null
              }`}
              color={control.color ? control.color : 'ghost'}>
              <EuiText size="s">{control.label}</EuiText>
            </EuiButton>
          );
          break;
        case 'icon':
          return (
            <EuiButtonIcon
              key={control.label}
              iconType={control.iconType}
              data-test-subj={control.icon}
              aria-label={control.label}
              onClick={control.onClick}
              className={`euiControlBar__euiButtonIcon ${
                control.classNames ? control.classNames : null
              }`}
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
              color={control.color ? control.color : 'ghost'}
              className="euiControlBar__euiText"
              key={control.controlType + index}
              size="s">
              {control.label}
            </EuiText>
          );
          break;
        case 'tab':
          return (
            <div
              key={`tab-${control.label}`}
              className={`euiControlBar__tab ${
                control.isActive ? 'euiControlBar__tab--active' : null
              }`}
              data-test-subj={control.label}
              aria-label={`Control Bar - ${control.label}`}
              onClick={control.onClick}>
              <EuiText size="s">{control.label}</EuiText>
            </div>
          );
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
