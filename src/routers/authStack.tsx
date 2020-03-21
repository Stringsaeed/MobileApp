import * as React from 'react';
import {LoginScreen, RegisterScreen} from '@screens';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from '@theme';

type params = {
  LOGIN_SCREEN: {};
  REGISTER_SCREEN: {};
};
const AuthStack = createStackNavigator<params>();

export default () => {
  const theme = useTheme();
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen
        name="LOGIN_SCREEN"
        component={LoginScreen}
        initialParams={{}}
        options={{
          title: 'Login',
          headerTitleStyle: {...theme.fonts.bold, fontSize: 19},
        }}
      />
      <AuthStack.Screen
        name="REGISTER_SCREEN"
        component={RegisterScreen}
        initialParams={{}}
      />
    </AuthStack.Navigator>
  );
};
