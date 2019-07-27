import React, {Component} from 'react'
import {
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
    StyleSheet,
    AsyncStorage,
    ScrollView,
    ToastAndroid,
} from 'react-native'
import {
    Spinner,
    Toast,
    Root
} from "native-base";
import axios from 'axios'

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            splashScreen: true,
            isLoading: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                splashScreen: false,
                showToast: false
            })
        }, 1500)

    }

    handleLogin = () => {
        this.setState({
            isLoading: true
        })
        const url = require('../global').url;
        axios.post(`http://192.168.88.11:3000/mobile/login`, {
            email: this.state.email,
            password: this.state.password
        }).then(res => {
            AsyncStorage.setItem('token',res.data._token);
            AsyncStorage.setItem('user',res.data.username);
            AsyncStorage.setItem('login',"asd");
            // alert(JSON.stringify(res))
            this.setState({
                isLoading: false
            })
            Toast.show({
                text: "Success Login",
                buttonText: "Okay",
                type: "success"
            })
        }).catch(err => {
            this.setState({
                isLoading: false
            })
            Toast.show({
                text: err.response.data.message,
                buttonText: "Okay",
                type: "danger"
            })

        })
    };
    onClickListener = (viewId) => {
        // Alert.alert("Alert", "Button pressed "+viewId);
    }

    render() {
        if (this.state.splashScreen) {
            return (
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%'
                }}>
                    <Image style={{width: 300, height: 400}} source={require('../img/logo-7queue.png')}/>
                </View>
            )
        } else {
            return (
                <Root>
                    <ScrollView style={{width: '100%', height: '100%'}}>
                    <View style={styles.container}>
                        <View>
                            <Image style={{width: 300, height: 300}} source={require('../img/logo-7queue.png')}/>
                        </View>
                        <View style={styles.inputContainer}>
                            <Image style={styles.inputIcon}
                                   source={require('../img/icons8-envelope-16.png')}/>
                            <TextInput style={styles.inputs}
                                       placeholder="Email"
                                       keyboardType="email-address"
                                       underlineColorAndroid='transparent'
                                       onChangeText={(email) => this.setState({email})}/>
                        </View>

                        <View style={styles.inputContainer}>
                            <Image style={styles.inputIcon}
                                   source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
                            <TextInput style={styles.inputs}
                                       placeholder="Password"
                                       secureTextEntry={true}
                                       underlineColorAndroid='transparent'
                                       onChangeText={(password) => this.setState({password})}/>
                        </View>

                        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}
                                            onPress={this.handleLogin}>
                            {this.state.isLoading ?<Spinner />:<Text style={styles.loginText}>Login</Text>}
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonContainer}
                                            onPress={() => this.props.navigation.navigate('ForgotPage')}>
                            <Text>Forgot your password?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('RegisterPage')}>
                            <Text>Register</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                </Root>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:250,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    inputIcon:{
        width:30,
        height:30,
        marginLeft:15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
    },
    loginButton: {
        backgroundColor: "#00b5ec",
    },
    loginText: {
        color: 'white',
    }
});
