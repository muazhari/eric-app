import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import {
  Button,
  Container,
  Content,
  Form,
  Icon,
  Input,
  Item,
  Label,
  Spinner,
  Text,
  Image,
  Header,
  Body,
  Title,
  Right,
  Tabs,
  Tab,
  Footer,
  FooterTab,
  List,
  ListItem,
  Left,
  Thumbnail
} from "native-base";

import { NavigationActions, StackActions } from "react-navigation";
import axios from "axios";
import Utils from "./Utils"
import SocketsInit from "./SocketsInit"
import Sockets from "./Sockets"

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isloading: false,
      email: "",
      password: "",
      userId: "123123"
    };
  }

  componentWillMount(){
      SocketsInit()
  }

  componentDidMount(){
      Utils.setContainer("chats", this)
  }

  handleRoomCreate = () => {
      const { userId } = this.state
      Sockets.emitRoomCreate("Room1", userId)
  }

  render() {
    return (
      <Container>
        <Header hasTabs>
          <Body>
            <Title>Index Menu</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <List>
            <ListItem avatar>
              <Left>
                <Thumbnail
                  source={{
                    uri: "https://github.githubassets.com/favicon.ico"
                  }}
                />
              </Left>
              <Body>
                <Text>Kumar Pratik</Text>
                <Text note>
                  Doing what you like will always keep you happy . .
                </Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
          </List>
        </Content>
        <Button rounded primary
            onPress ={() => this.handleRoomCreate()}
            >
          <Icon name='plus' />
        </Button>
        <Footer>
          <FooterTab>
            <Button vertical active>
              <Icon name="apps" />
              <Text> Apps </Text>
            </Button>
            <Button vertical onPress={this.props.navigation.navigate("chat")}>
              <Icon name="chatboxes" />
              <Text> Chat </Text>
            </Button>
            <Button
              vertical
              onPress={this.props.navigation.navigate("timeline")}
            >
              <Icon name="paper" />
              <Text> TimeLine </Text>
            </Button>
            <Button
              vertical
              onPress={this.props.navigation.navigate("profile")}
            >
              <Icon name="person" />
              <Text> Profile </Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
