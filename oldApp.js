import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Button, Text } from 'react-native';
import styled from 'styled-components/native';
import Contacts from './components/contacts.js';

const StyledView = styled.View`
  background-color: papayawhip;
  marginTop: 100px;

`;

const StyledText = styled.Text`
  color: palevioletred;
  fontSize: 100px;
  marginTop: 100px;
  
`;

const RotatedBox = styled.View`
  transform: rotate(90deg);
  text-shadow-offset: 10px 5px;
  font-variant: small-caps;
  margin: 5px 7px 2px;
`;

export default class App extends Component {
  // constructor(props){
  //   super(props); 
  //     this.state={
  //       permissions: false,
  //       contacts: []
  //     }
  //   }
  
  // async componentDidMount(){
  //   const {status} = await Expo.Permission.askAsync(Expo.Permissions.CONTACTS);
  //   this.setState({permissions: status});
  // }

  // showContacts = async() =>{
  //   const contacts = await Expo.Contacts.getContactsAsync();
  //   this.setState({contacts: contacts.data});
  // };



  render() {
    return (
      <View style={styles.container}>
        <StyledView>
          <StyledText>Hello World!</StyledText>
        </StyledView>
        <RotatedBox />
        <Contacts/>
        {/* <Button title="show contact" onPress={this.showContacts}/> */}
        {/* <FlatList data={this.state.contacts} keyExtractor={this.keyExtractor} renderItem={ ( {item} )=> <Text>{item.firstName}</Text>} /> */}
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    backgroundColor: '#FAF1E6',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 300
  },
});
