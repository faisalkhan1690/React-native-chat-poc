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
      userEmail: 'tarun@storm-devdb.zoylo.com',
      userPassword:'tarun',
      receiver:'swapnil@storm-devdb.zoylo.com',
      chatMessage:'Hello web',
      recivedMessage:'Recived message will visibile here'
    };
  }
  
  login(){
    // console.disableYellowBox = true;
    // console.warn("method","login")
    
    XMPP.trustHosts(['storm-devdb.zoylo.com']);
    XMPP.connect(this.state.userEmail,this.state.userPassword);

    XMPP.on('message', (message) => {
        console.warn('MESSAGE:' + message.body);
        var oldMessage=this.state.recivedMessage;
        oldMessage=this.state.recivedMessage+"\n Other: "+message.body;
        this.setState({recivedMessage:oldMessage})
    });
  
    XMPP.on('error', (message) => console.warn('ERROR:' + message));
    XMPP.on('loginError', (message) => console.warn('LOGIN ERROR:' + message));
    XMPP.on('login', (message) => console.warn('LOGGED!'));
    XMPP.on('connect', (message) => console.warn('CONNECTED!'));
    XMPP.on('disconnect', (message) => console.warn('DISCONNECTED!'));
  }


  logout(){
    XMPP.disconnect();
    XMPP.removeListeners();
  }
  sendMessage(){
    var oldMessage=this.state.recivedMessage;
    oldMessage=this.state.recivedMessage+"\n You:  "+this.state.chatMessage;
    this.setState({recivedMessage:oldMessage})
    if(!XMPP.isConnected){
      alert("You are not logged in. Please login first")
    }else{
      XMPP.message(this.state.chatMessage, this.state.receiver);
    }
    
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

        <TextInput style={styles.inputField}
          onChangeText={(text) => this.setState({receiver:text})}
          value={this.state.receiver}/>

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
