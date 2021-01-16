import React from 'react';
import { EUI_THEMES, EUI_THEME, DefaultEuiTheme } from '../../../../src/themes';
// @ts-ignore importing from a JS file
import { applyTheme } from '../../services';
import {
  // buildTheme,
  // computed,
  // useEuiTheme,
  EuiThemeProvider,
} from '../../../../src/services';

const THEME_NAMES = EUI_THEMES.map(({ value }) => value);

const defaultState = {
  theme: THEME_NAMES[0],
  changeTheme: (themeValue: EUI_THEME['value']) => {
    applyTheme(themeValue);
  },
};

interface State {
  theme: EUI_THEME['value'];
}

export const ThemeContext = React.createContext(defaultState);

export class ThemeProvider extends React.Component<object, State> {
  constructor(props: object) {
    super(props);

    let theme = localStorage.getItem('theme');
    if (!theme || !THEME_NAMES.includes(theme)) theme = defaultState.theme;
    applyTheme(theme);

    this.state = {
      theme,
    };
  }

  changeTheme = (themeValue: EUI_THEME['value']) => {
    this.setState({ theme: themeValue }, () => {
      localStorage.setItem('theme', themeValue);
      applyTheme(themeValue);
    });
  };

  render() {
    const { children } = this.props;
    const { theme } = this.state;
    return (
      <ThemeContext.Provider
        value={{
          theme,
          changeTheme: this.changeTheme,
        }}>
        <EuiThemeProvider
          theme={DefaultEuiTheme}
          colorMode={theme.includes('light') ? 'light' : 'dark'}>
          {children}
        </EuiThemeProvider>
      </ThemeContext.Provider>
    );
  }
}
