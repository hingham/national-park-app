import React from 'react';
import {
    View, 
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity}
 from 'react-native';

 import stateArr from '../parks/state-array.js';

import uuidV4 from 'uuid/v4';
import {colors } from '../theme';

 export default class ViewStates extends React.Component{
     constructor(props){
         super(props);
         this.state={
             visited: []
         }
     }


    submit = () =>{
        console.log('added visited');
    }

    onChangeText = (name)=>{
        this.setState({
            visited: [...this.state.visited, name]
        })
    }

     render() {
         console.log('props: ', this.props)
         return (
             <View style = {styles.container}>
             <Text style={styles.heading}>Add Park</Text>
             <TextInput
             placeholder = 'Park name'
             value = {this.state.city}
             onChangeText={val => this.onChangeText(val)}
             style={styles.input}
             />
             <TouchableOpacity onPress={this.submit}>
             <View style={styles.button}>
                <Text style={styles.buttonText}>Add Park</Text>
             </View>
             </TouchableOpacity>
           

             </View>
         )
     }
 }

 const styles = StyleSheet.create({
     input: {
         backgroundColor: 'white',
         margin: 10,
         paddingHorizontal: 8,
         height: 50
     },
     button: {
        height: 50,
        backgroundColor: colors.buttonColor,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10

     },
     buttonText: {
         
     },
    container: {
        backgroundColor: colors.primary,
        flex: 1,
        justifyContent: 'center'
    },
    heading: {
        fontSize: 39,
        margin: 20,
        color: colors.titles
    }
 })