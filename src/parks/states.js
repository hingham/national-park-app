import React from 'react';
import allStates from './state-array.js'

import superagent from 'superagent';
import {
    View, 
    Text,
    StyleSheet,
    ScrollView,
    TouchableWithoutFeedback
}

 from 'react-native'
 import {colors} from '../theme'

class States extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            USstates: allStates
        }
    }

     static navigationOptions = {
         title: 'States',
         headerTitleStyle: {
             color: colors.titles,
             fontSize: 20,
             fontWeight: '400'
         }
     }

     viewStateParks = (usState) =>{
        let URL = `https://developer.nps.gov/api/v1/parks?limit=496&api_key=${process.env.API_NP_KEY}`;
        superagent.get(URL)
        .then(parks=>{
            console.log('sliced state', usState.slice(0, 2));
            let filteredParks = parks.body.data.filter((parks, idx)=>{
                return (parks.states === usState.slice(0, 2)) && (parks.designation === "National Park");  
            })
            return filteredParks;
        })
        .then((filteredParks)=>{
            console.log('filterd Park', filteredParks);
            this.props.navigation.navigate('Parks', {usState, filteredParks})
        });
     }

     render() {
         return (
             <ScrollView>

                <View>
                {this.state.USstates.map((usState, idx)=>(
                    <View style={styles.cityContainer}>
                    <TouchableWithoutFeedback onPress= {() => this.viewStateParks(usState)}>
                        <View style = {styles.cityContainer}>
                            <Text key={idx} style={styles.state}>{usState}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    </View>
                ))}
                </View>

             </ScrollView>

         )
     }
 }

 const styles = StyleSheet.create({
     cityContainer: {
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: colors.primary
     } ,
     state: {
         fontSize: 20,
         color: 'black'
     }
 })

 export default States;