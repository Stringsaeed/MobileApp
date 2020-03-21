import {Theme} from '@interfaces';
import {LightTheme} from '@styles';
import {createTheming} from '@callstack/react-theme-provider';

const {ThemeProvider, useTheme, withTheme} = createTheming<Theme>(LightTheme);

export {ThemeProvider, useTheme, withTheme};
