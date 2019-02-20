import React from 'react';
import superagent from 'superagent';
import {
    View, 
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableWithoutFeedback}
 from 'react-native'

 import {colors} from '../theme'

 export default class Parks extends React.Component{
     state = {
     }
    getParks = (state)=>{

        console.log('get parks');

    }


    viewParkDetails = (park)=>{
        let parkCode = park.parkCode;
        let URL = `https://developer.nps.gov/api/v1/articles?parkCode=${parkCode}&limit=5&api_key=${process.env.API_NP_KEY}`
        superagent.get(URL)
        .then(result=>{
            // console.log('result body', result.body.data[0].listingImage);
            return result.body.data[0].listingImage
        })
        .then(image=>{
            this.props.navigation.navigate('ParkDetails', {park, image})
        })
        .catch(error=>{
            (console.error('superagent call failed from park-details'))
        });

        // console.log('park selected', park);
    }



     render() {
        let stateParks = this.props.navigation.state.params.filteredParks;
        let selectedState = this.props.navigation.state.params.usState;
        // console.log(stateParks);
         return (
             <View>
                 <ScrollView>
                 <Text style={styles.header}>National Parks: {selectedState}</Text>
                 {stateParks.map((park, idx)=>(
                     <View style={styles.parkContainer}>
                        <TouchableWithoutFeedback onPress= {() => this.viewParkDetails(park)}>
                         <Text style={styles.parkTitle} key={`name${idx}`}>{park.fullName}</Text>
                         </TouchableWithoutFeedback>
                         <Text style={styles.park} key={`des${idx}`}>{park.description}</Text>  
                     </View>
                ))}
                </ScrollView>
             </View>
         )
     }
 }


 const styles = StyleSheet.create({
     header:{
         color: colors.secondary,
         margin: 10,
         fontSize: 30
    },
    parkContainer: {
        justifyContent: 'center',
        margin: 10,
       padding: 10,
       borderBottomWidth: 2,
       borderBottomColor: colors.primary
    } ,
    parkTitle:{
        fontSize: 25,
        color: colors.secondary,
        fontWeight: 'bold'

    },
    park: {
        fontSize: 20,
        color: 'black'
    }
})