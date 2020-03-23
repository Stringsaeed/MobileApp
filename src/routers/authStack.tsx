import * as React from 'react';
import {LoginScreen, RegisterScreen, VerificationCodeScreen} from '@screens';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from '@theme';
import {ParamsList} from '@interfaces';

const AuthStack = createStackNavigator<ParamsList>();

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
      <AuthStack.Screen
        name="VERIFY_CODE"
        component={VerificationCodeScreen}
        initialParams={{
          name: '',
          email: '',
          phone: '',
          password: '',
          password_confirmation: '',
        }}
      />
    </AuthStack.Navigator>
  );
};
