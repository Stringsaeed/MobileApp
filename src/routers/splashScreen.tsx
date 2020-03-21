import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SplashScreen} from '@screens';

const SplashScreenStack = createStackNavigator();

export default () => {
  return (
    <SplashScreenStack.Navigator screenOptions={{headerShown: false}}>
      <SplashScreenStack.Screen
        name="@SPLASH_SCREEN"
        component={SplashScreen}
      />
    </SplashScreenStack.Navigator>
  );
};
