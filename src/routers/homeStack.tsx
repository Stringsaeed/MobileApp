import * as React from 'react';
import {useTheme} from '@theme';
import {HomeScreen} from '@screens';
import {
  createStackNavigator,
  TransitionPresets,
  useHeaderHeight,
} from '@react-navigation/stack';
import {View} from 'react-native';
import {Button, Divider, Menu, IconButton, Appbar} from 'react-native-paper';
import {useState} from 'react';
import {SafeAreaView, useSafeArea} from 'react-native-safe-area-context';

const HomeStack = createStackNavigator<{
  '@TABS/STACK/HOME': {};
}>();

export default () => {
  const theme = useTheme();
  return (
    <HomeStack.Navigator mode="modal">
      <HomeStack.Screen
        component={HomeScreen}
        name={'@TABS/STACK/HOME'}
        options={{
          headerTitle: 'Help!',
          headerTitleStyle: {
            ...theme.fonts.bold,
          },
          header: ({scene}) => (
            <SafeAreaView>
              <Appbar.Header>
                <Appbar.Content
                  title={scene.descriptor.options.headerTitle}
                  titleStyle={scene.descriptor.options.headerTitleStyle}
                />
              </Appbar.Header>
            </SafeAreaView>
          ),
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
    </HomeStack.Navigator>
  );
};
