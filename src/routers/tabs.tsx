import * as React from 'react';
import {Icons} from '@theme/icons';
import {
  AddPostScreen,
  HomeScreen,
  NotificationsScreen,
  ProfileScreen,
} from '@screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tabs = createBottomTabNavigator();

export default () => {
  // const theme = useTheme();
  const Home = Icons.home;
  const HomeOutlined = Icons.homeOutlined;
  const FocusedAddPost = Icons.addFocused;
  const OutlinedAddPost = Icons.addOutlined;
  const Notifications = Icons.notification;
  const OutlinedNotifications = Icons.notificationOutlined;
  const Account = Icons.account;
  const OutlinedAccount = Icons.accountOutlined;
  return (
    <Tabs.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          elevation: 6,
        },
      }}>
      <Tabs.Screen
        name="@TABS/HOME"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, focused}) =>
            focused ? (
              <Home fill={color} width={20} height={20} />
            ) : (
              <HomeOutlined fill={color} width={20} height={20} />
            ),
        }}
      />
      <Tabs.Screen
        name="@TABS/CREATE_POST"
        component={AddPostScreen}
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Post',
          tabBarIcon: ({color, focused}) =>
            focused ? (
              <FocusedAddPost fill={color} width={20} height={20} />
            ) : (
              <OutlinedAddPost fill={color} width={20} height={20} />
            ),
        }}
      />
      <Tabs.Screen
        name="@TABS/NOTIFICATIONS"
        component={NotificationsScreen}
        options={{
          tabBarLabel: 'notifications',
          tabBarIcon: ({color, focused}) =>
            focused ? (
              <Notifications fill={color} width={20} height={20} />
            ) : (
              <OutlinedNotifications fill={color} width={20} height={20} />
            ),
        }}
      />
      <Tabs.Screen
        name="@TABS/PROFILE"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({color, focused}) =>
            focused ? (
              <Account fill={color} width={20} height={20} />
            ) : (
              <OutlinedAccount fill={color} width={20} height={20} />
            ),
        }}
      />
    </Tabs.Navigator>
  );
};
