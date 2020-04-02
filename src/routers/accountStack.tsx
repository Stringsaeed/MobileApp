import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ProfileScreen} from '@screens';
import {useTheme} from '@theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Appbar} from 'react-native-paper';

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
