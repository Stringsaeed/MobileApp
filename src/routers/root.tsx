import * as React from 'react';
import {useTheme} from '@theme';
import {MyPostsScreen, PostScreen} from '@screens';
import {ParamsList} from '@interfaces';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import Tabs from './tabs';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Appbar} from 'react-native-paper';

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
          header: ({scene, navigation}) => (
            <SafeAreaView>
              <Appbar.Header>
                {navigation.canGoBack() ? (
                  <Appbar.BackAction onPress={() => navigation.goBack()} />
                ) : null}
                <Appbar.Content
                  title={scene.descriptor.options.title}
                  titleStyle={scene.descriptor.options.headerTitleStyle}
                />
              </Appbar.Header>
            </SafeAreaView>
          ),
          ...TransitionPresets.RevealFromBottomAndroid,
        })}
      />
      <RootStack.Screen
        name="MY_POSTS"
        component={MyPostsScreen}
        options={() => ({
          title: 'My Posts',
          headerTitleStyle: {
            ...theme.fonts.bold,
          },
          header: ({scene, navigation}) => (
            <SafeAreaView>
              <Appbar.Header>
                {navigation.canGoBack() ? (
                  <Appbar.BackAction onPress={() => navigation.goBack()} />
                ) : null}
                <Appbar.Content
                  title={scene.descriptor.options.title}
                  titleStyle={scene.descriptor.options.headerTitleStyle}
                />
              </Appbar.Header>
            </SafeAreaView>
          ),
          ...TransitionPresets.RevealFromBottomAndroid,
        })}
      />
    </RootStack.Navigator>
  );
};
