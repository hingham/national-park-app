import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Tabs from './src/index.js'

export default class App extends React.Component {
  state = {
    States: []
  }
  addCity = (city) =>{
    const States = this.state.States;
    States.push(city);
    this.setState({States});
  }

  addLocation = () =>{

  }
  render() {
    return (
    <Tabs
    screenProps={{
      States: this.state.States,
      addCity: this.addCity
    }}/>
    )
  }
}