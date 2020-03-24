import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NotificationsScreen} from '@screens';
import {useTheme} from '@theme';

const HomeStack = createStackNavigator<{
  '@TABS/STACK/NOTIFICATIONS': {};
}>();

export default () => {
  const theme = useTheme();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        component={NotificationsScreen}
        name={'@TABS/STACK/NOTIFICATIONS'}
        options={{
          headerTitle: 'Notifications',
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
