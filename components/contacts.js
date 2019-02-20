
import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Button, Text } from 'react-native';
import styled from 'styled-components/native';

class Contacts extends Component{

constructor(props){
    super(props); 
      this.state={
        permissions: false,
        contacts: []
      }
    }
  
  async componentDidMount(){
    const {status} = await Expo.Permission.askAsync(Expo.Permissions.CONTACTS);
    this.setState({permissions: status});
  }

  showContacts = async() =>{
    const contacts = await Expo.Contacts.getContactsAsync();
    this.setState({contacts: contacts.data});
  };

  render(){
      return (
          <View>
            <Button title="show contact" onPress={this.showContacts}/>

            <FlatList data={this.state.contacts} keyExtractor={this.keyExtractor} renderItem={ ( {item} )=> <Text>{item.firstName}</Text>} />
          </View>

      )
  }
}

export default Contacts;
