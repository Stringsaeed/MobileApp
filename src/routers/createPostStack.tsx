import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AddPostScreen} from '@screens';
import {useTheme} from '@theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Appbar} from 'react-native-paper';

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
          headerTitle: 'New Post',
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
        }}
      />
    </HomeStack.Navigator>
  );
};
