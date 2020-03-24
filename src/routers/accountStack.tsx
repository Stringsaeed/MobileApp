import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ProfileScreen} from '@screens';
import {useTheme} from '@theme';

const HomeStack = createStackNavigator<{
  '@TABS/STACK/ACCOUNT': {};
}>();

export default () => {
  const theme = useTheme();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        component={ProfileScreen}
        name={'@TABS/STACK/ACCOUNT'}
        options={{
          headerTitle: 'Profile',
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
