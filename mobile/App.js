import React, {Component} from 'react';
import {YellowBox} from 'react-native'
import {createStackNavigator,createAppContainer} from 'react-navigation'
import Index from './views'
import Login from './views/login'
import Register from './views/register'

const RootStack = createStackNavigator(
    {
        IndexPage: {screen: Index},
        LoginPage: {screen: Login},
        RegisterPage: {screen: Register}
    },
    {
        initialRouteName: 'LoginPage',
        headerMode: 'none'
    }
)
console.disableYellowBox = true;
const AppContainer = createAppContainer(RootStack)
export default class App extends Component {

    render() {
        return (
            <AppContainer />
        );
    }
}

