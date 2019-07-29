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

interface EuiControlBarState {
  selectedTab: string;
}

export class EuiControlBar extends Component<
  EuiControlBarProps,
  EuiControlBarState
> {
  constructor(props: EuiControlBarProps) {
    super(props);
    this.state = {
      selectedTab: '',
    };
  }

  //  static getDerivedStateFromProps(props: any, current_state: any) {
  //    if (current_state.selectedTab !== '' && !props.showContent) {
  //      current_state.selectedTab = '';
  //    } else {
  //      return null;
  //    }
  //  }

  render() {
    const { children, className, showContent, controls, ...rest } = this.props;

    const classes = classNames(
      'euiControlBar',
      this.props.showContent ? 'euiControlBar--open' : null,
      className
    );

    const handleTabClick = (control: any) => {
      this.setState({
        selectedTab: control.id,
      });
      control.onClick();
    };

    const controlItem = (control: any, index: number) => {
      switch (control.controlType) {
        case 'button':
          return (
            <EuiButton
              key={control.id}
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
              key={control.id}
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
              color={control.color ? control.color : null}
              className="euiControlBar__euiText"
              key={control.id}
              size="s">
              {control.label}
            </EuiText>
          );
          break;
        case 'tab':
          const refName = `tabRef${index}`;
          const tab = (
            <div
              key={control.id}
              ref={refName}
              className={`euiControlBar__tab${
                control.id === this.state.selectedTab
                  ? ' euiControlBar__tab--active'
                  : ''
              }`}
              data-test-subj={control.label}
              aria-label={`Control Bar - ${control.label}`}
              onClick={() => handleTabClick(control)}>
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
