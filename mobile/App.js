import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Index from "./views";
import Login from "./views/login";
import Register from "./views/register";
import SocketsInit from "./views/SocketsInit"

SocketsInit();

const RootStack = createStackNavigator(
  {
    IndexPage: { screen: Index },
    LoginPage: { screen: Login },
    RegisterPage: { screen: Register }
  },
  {
    initialRouteName: "LoginPage",
    headerMode: "none"
  }
);
console.disableYellowBox = true;
const AppContainer = createAppContainer(RootStack);
export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
