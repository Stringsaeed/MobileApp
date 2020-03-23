import * as React from 'react';
import {useTheme} from '@theme';
import {MyPostsScreen, PostScreen} from '@screens';
import {ParamsList} from '@interfaces';
import {createStackNavigator} from '@react-navigation/stack';

import Tabs from './tabs';

const RootStack = createStackNavigator<ParamsList>();

export default () => {
  const theme = useTheme();
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="@TABS"
        component={Tabs}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="@POST_SCREEN"
        component={PostScreen}
        options={() => ({
          title: 'Post',
          headerTitleStyle: {
            ...theme.fonts.bold,
          },
          headerStyle: {
            backgroundColor: theme.colors.background,
            elevation: 0,
          },
          // headerTransparent: true,
        })}
      />
      <RootStack.Screen
        name="MY_POSTS"
        component={MyPostsScreen}
        options={{
          headerShown: false,
        }}
      />
    </RootStack.Navigator>
  );
};
