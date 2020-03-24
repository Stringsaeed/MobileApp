import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '@screens';
import {useTheme} from '@theme';

const HomeStack = createStackNavigator<{
  '@TABS/STACK/HOME': {};
}>();

export default () => {
  const theme = useTheme();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        component={HomeScreen}
        name={'@TABS/STACK/HOME'}
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
    </HomeStack.Navigator>
  );
};
