import * as React from 'react';
import {useTheme} from '@theme';
import {HomeScreen} from '@screens';
import {createStackNavigator} from '@react-navigation/stack';
import {View} from 'react-native';
import {Button, Divider, Menu, IconButton} from 'react-native-paper';
import {useState} from 'react';
import {useSafeArea} from 'react-native-safe-area-context';

const HomeStack = createStackNavigator<{
  '@TABS/STACK/HOME': {};
}>();

export default () => {
  const theme = useTheme();
  const {top} = useSafeArea();
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
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
          headerRight: ({tintColor}) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  // paddingTop: 50,
                  flexDirection: 'row',
                  // justifyContent: 'center',
                }}>
                <Menu
                  visible={menuVisible}
                  theme={theme}
                  contentStyle={{
                    backgroundColor: theme.colors.background,
                  }}
                  statusBarHeight={top}
                  onDismiss={() => {
                    setMenuVisible(false);
                  }}
                  anchor={
                    <IconButton
                      theme={theme}
                      icon="filter"
                      onPress={() => {
                        setMenuVisible(true);
                      }}
                    />
                  }>
                  <Menu.Item
                    theme={theme}
                    onPress={() => {}}
                    // icon="help"
                    title="Offer help"
                  />
                  <Menu.Item theme={theme} onPress={() => {}} title="Item 2" />
                  <Divider />
                  <Menu.Item theme={theme} onPress={() => {}} title="Item 3" />
                </Menu>
              </View>
            );
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
