import React,{Component} from 'react'
import {AsyncStorage} from 'react-native'
import {Button, Container, Content, Form, Icon, Input, Item, Label, Spinner, Text,Image} from 'native-base'
import {NavigationActions,StackActions} from "react-navigation"
import axios from 'axios'

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            isloading: false,
            email: '',
            password: ''
        }
    }

    submitform = () => {
        this.setState({
            isloading: true,
        });
        axios.post('https://7queue.net/api/login', {
            email: this.state.email,
            password: this.state.password
        }).then(res => {
            this.setState({
                isloading: false
            });
            if (res.data.status == 0) {
                alert('Password Salah')
            } else {
                AsyncStorage.setItem('token', res.data.apiKey);
                const resetAction = StackActions.reset({
                    index: 0, // <-- currect active route from actions array
                    actions: [
                        NavigationActions.navigate({routeName: 'IndexPage'}),
                    ],
                });
                this.props.navigation.dispatch(resetAction)
            }
        }).catch(err => console.log(err));
    };

    render() {
        return (
            <Container style={{backgroundColor: '#fff', paddingTop: "50%", width: '100%', alignItems: 'center'}}>
                <Content style={{width: '90%'}}>
                    <Form style={{width: '90%'}}>
                        <Item floatingLabel>
                            <Label style={{marginBottom: 10}}> Username </Label>
                            <Input onChangeText={text => this.setState({email: text})} name={"username"}/>
                        </Item>
                        <Item floatingLabel last>
                            <Label style={{marginBottom: 10}}> Password </Label>
                            <Input onChangeText={text => this.setState({password: text})} name={"password"}
                                   secureTextEntry={!this.state.showpass}/>
                            <Icon active onPress={() => this.setState({showpass: !this.state.showpass})}
                                  name={this.state.showpass ? "eye-off" : "eye"}/>
                        </Item>
                        <Button style={{alignSelf: "center", marginTop: 30}}
                                onPress={this.submitform}>{this.state.isloading?<Spinner/>:<Text> Login </Text>}</Button>
                    </Form>
                </Content>
            </Container>

        );
    }
}
