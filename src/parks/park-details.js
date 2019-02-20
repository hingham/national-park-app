import React from 'react';
import {
    View, 
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableWithoutFeedback,
    Image}
 from 'react-native';
 import { MapView } from 'expo';


 import {colors} from '../theme'

 export default class ParkDetails extends React.Component{
     constructor(props){
         super(props);
         this.state={
            visitedParks: []
 
         }
     }
    
        
     addVisitedPark=(name)=>{
        this.setState({visitedParks: [...this.state.visitedParks, name]})
     }

     render() {
        let parkDetails = this.props.navigation.state.params.park;
        let image = this.props.navigation.state.params.image;
        let latitude = parkDetails.latLong.split(', ')[0].slice(4, 8);
        let longitude = parkDetails.latLong.split(', ')[1].slice(5, 9);
         return (
             <>
             <View style={styles.parkContainer}>
                 <ScrollView>
                     <View >

                     <TouchableWithoutFeedback onPress= {() => this.addVisitedPark(parkDetails.fullName)}>
                        <Text style={styles.park} >Mark Visited</Text>
                    </TouchableWithoutFeedback>


                        <Text style={styles.header}>{parkDetails.fullName}</Text>
                        <Image
                        style={{width: 320, height: 320}}
                        source={{uri: image.url }}
                        />
                        <Text style={styles.park}>Location: {parkDetails.states}</Text>
                        <Text style={styles.park}>Description: {parkDetails.description}</Text>

                        <MapView
                            style={styles.mapContainer}
                            initialRegion={{
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: 0.922,
                            longitudeDelta: 0.421,
                            }} />

                        <Text style={styles.park}>Weather: {parkDetails.weatherInfo}</Text>

                     </View>
                </ScrollView>
             </View>
             </>
         )
     }
 }


 const styles = StyleSheet.create({
     image:{
         borderRadius: 5,
         height: 300,
         width: 300,
         justifyContent: `center`
     },
     header:{
         width: 250,
         alignContent: 'center',
         color: colors.secondary,
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
        marginTop: 5,
        marginBottom: 5,
        fontSize: 20,
        color: 'black'
    },
    mapContainer:{
       height: 300,
       width: 300,
       justifyContent: 'center'
    }
})