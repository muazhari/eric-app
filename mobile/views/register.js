import React, {Component} from 'react'
import {Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,Dimensions} from 'react-native'
import {Spinner} from "native-base";


export default class App extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: false
        }
    }

    handleLogin = () => {
        this.setState({
            isLoading: true
        })
    };
    onClickListener = (viewId) => {
        Alert.alert("Alert", "Button pressed " + viewId);
    };

    render() {
        return (
            <ScrollView style={{width: '100%', height: '100%'}}>
                <View style={styles.container}>
                    <View>
                        <Image style={{width: 200,height:200}} source={require('../img/logo-7queue.png')}/>
                    </View>
                    <View style={styles.inputContainer}>
                        <Image style={styles.inputIcon}
                               source={require('../img/icons8-envelope-16.png')}/>
                        <TextInput style={styles.inputs}
                                   placeholder="Username"
                                   underlineColorAndroid='transparent'
                                   onChangeText={(email) => this.setState({email})}/>
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
                    <View style={styles.inputContainer}>
                        <Image style={styles.inputIcon}
                               source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
                        <TextInput style={styles.inputs}
                                   placeholder="Confirm Password"
                                   secureTextEntry={true}
                                   underlineColorAndroid='transparent'
                                   onChangeText={(cpassword) => this.setState({cpassword})}/>
                    </View>

                    <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}
                                      onPress={this.handleLogin}>
                        {this.state.isLoading ? <Spinner/> : <Text style={styles.loginText}>Register</Text>}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}
let ScreenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
        height:ScreenHeight
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: "#00b5ec",
    },
    loginText: {
        color: 'white',
    }
});
