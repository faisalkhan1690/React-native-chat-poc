/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Button } from 'react-native';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';



var XMPP = require('react-native-xmpp');

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userEmail: 'tarun@192.168.14.75',
      userPassword:'tarun',
      chatMessage:'Hello web',
      recivedMessage:'Recived message will visibile here'
    };
  }
  
  login(){
    // console.warn("method","login")
    
    XMPP.trustHosts(['chat.google.com']);
    XMPP.connect(this.state.userEmail,this.state.userPassword);

    XMPP.on('message', (message) => console.warn('MESSAGE:' + JSON.stringify(message)));
    XMPP.on('iq', (message) => console.warn('IQ:' + JSON.stringify(message)));
    XMPP.on('presence', (message) => console.warn('PRESENCE:' + JSON.stringify(message)));
    XMPP.on('error', (message) => console.warn('ERROR:' + message));
    XMPP.on('loginError', (message) => console.warn('LOGIN ERROR:' + message));
    XMPP.on('login', (message) => console.warn('LOGGED!'));
    XMPP.on('connect', (message) => console.warn('CONNECTED!'));
    XMPP.on('disconnect', (message) => console.warn('DISCONNECTED!'));

  }


  logout(){
    // console.warn("method","logout")
    XMPP.disconnect();
    XMPP.removeListeners();
  }
  sendMessage(){
    // console.warn("method","sendMessage")
    XMPP.message(this.state.chatMessage, "damini@192.168.14.75");
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.inputField}
        onChangeText={(text) => this.setState({userEmail:text})}
        value={this.state.userEmail}/>

        <TextInput style={styles.inputField}
        onChangeText={(text) => this.setState({userPassword:text})}
        value={this.state.userPassword}/>

        <View style={styles.marginButton}>
          <Button
              onPress={() =>this.login()}
              color='#841584'
              margin='10'
              title="Login"/>
        </View>
        <View style={styles.marginButton}>
        <Button
            onPress={() =>this.logout()}
            color='#841584'
            margin='10'
            title="Logout"/>
        </View>

         <TextInput style={styles.inputChatField}
            onChangeText={(text) => this.setState({chatMessage:text})}
            value={this.state.chatMessage}/>

         <View style={styles.marginButton}>
           <Button
            onPress={() =>this.sendMessage()}
            color='#841584'
            margin='10'
            title="Send Message"/>
        </View>

        <Text style={styles.titleText}>
          Received Message
        </Text>
        <Text>
          {this.state.recivedMessage}
        </Text>
            
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputField:{
    borderColor: 'gray',
    marginTop:10,
    borderWidth: 1
  },

  inputChatField:{
    borderColor: 'gray',
    marginTop:30,
    borderWidth: 1
  },
  marginButton: {
    marginTop: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  }

  
});
