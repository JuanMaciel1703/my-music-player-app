import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import GlobalStyle from './styles/global';

import Login from './pages/Login';
import SpotifyLogin from './pages/SpotifyLogin';
import Main from './pages/Main';

const RootRoutes = createStackNavigator({
    Login,
    SpotifyLogin: {
        screen: SpotifyLogin,
        navigationOptions: {
            title: "Login"
        }
    }
}, {
    defaultNavigationOptions: {
        headerTintColor: "#FFF",
        headerStyle: {
            backgroundColor: GlobalStyle.colors.PRIMARY_COLOR
        },
        cardStyle: {
            backgroundColor: GlobalStyle.colors.SECOUNDARY_COLOR
        }
    }
});

const AppRoutes = createBottomTabNavigator({
    Home: {
        screen: Main,
        navigationOptions: {
            tabBarIcon: <MaterialIcons name={'home'} size={22} color="#eee" />
        }
    },
    PlayLists: {
        screen: Main,
        navigationOptions: {
            tabBarIcon: <MaterialIcons name={'list'} size={22} color="#eee" />
        }
    },
    Settings: {
        screen: Main,
        navigationOptions: {
            tabBarIcon: <MaterialIcons name={'settings'} size={22} color="#eee" />
        }
    }
}, {
    tabBarOptions: {
        style: {
            backgroundColor: GlobalStyle.colors.SECOUNDARY_COLOR
        },
        labelStyle: {
            color: '#eee'
        }
    }
});

const Routes = createAppContainer(createSwitchNavigator(
    {
        Root: RootRoutes,
        App: AppRoutes
    },
    {
      initialRouteName: 'Root',
    }
  ));

export default Routes;