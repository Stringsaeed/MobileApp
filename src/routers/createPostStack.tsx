import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AddPostScreen} from '@screens';
import {useTheme} from '@theme';

const HomeStack = createStackNavigator<{
  '@TABS/STACK/CREATE_POST': {};
}>();

export default () => {
  const theme = useTheme();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        component={AddPostScreen}
        name={'@TABS/STACK/CREATE_POST'}
        options={{
          headerTitle: 'New Post:',
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
