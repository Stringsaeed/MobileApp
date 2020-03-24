import * as React from 'react';
import {useTheme} from '@theme';
import {ParamsList} from '@interfaces';
import {LoginScreen, RegisterScreen} from '@screens';
import {createStackNavigator} from '@react-navigation/stack';

const AuthStack = createStackNavigator<ParamsList>();

export default () => {
  const theme = useTheme();

  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="LOGIN_SCREEN"
        component={LoginScreen}
        initialParams={{}}
        options={{
          headerTitle: 'Help!',
          headerTitleStyle: {
            ...theme.fonts.bold,
          },
          headerStyle: {
            backgroundColor: theme.colors.background,
            elevation: 0,
          },
        }}
      />
      <AuthStack.Screen
        name="REGISTER_SCREEN"
        component={RegisterScreen}
        initialParams={{}}
        options={{
          headerTitle: 'Help!',
          headerTitleStyle: {
            ...theme.fonts.bold,
          },
          headerStyle: {
            backgroundColor: theme.colors.background,
            elevation: 0,
          },
        }}
      />
    </AuthStack.Navigator>
  );
};
