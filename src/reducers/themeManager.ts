import {ActionType, ThemeManager} from '@interfaces';
import {DarkTheme, LightTheme} from '@styles';

const initialState: ThemeManager = {
  theme: LightTheme,
  dark: false,
};

export default (state = initialState, action: ActionType) => {
  console.log(action);
  if (action.type === '@THEME/TOGGLE_DARK') {
    console.log();
    return {
      ...state,
      dark: true,
      theme: DarkTheme,
    };
  } else if (action.type === '@THEME/TOGGLE_LIGHT') {
    return {
      ...state,
      dark: false,
      theme: LightTheme,
    };
  } else {
    return state;
  }
};
