import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Image
} from "react-native";
import { MapView } from "expo";
import { colors } from "../theme";
import { connect } from "react-redux";

import * as actions from "../actions.js";

class ParkDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visitedParks: []
    };
  }

  static navigationOptions = {
    title: "",
    headerTitleStyle: {
      color: colors.titles,
      fontSize: 20,
      fontWeight: "400",
    }
  };


  addParkToList = parkName => {
    this.props.addPark(parkName);
    // this.setState({visitedParks: [...this.state.visitedParks, name]})
  };


  render() {
    let parkDeets = this.props.navigation.state.params.data.park[0];
    let weatherArr = parkDeets.weather.data;
    let lat = parseFloat(
      this.props.navigation.state.params.data.park[0].latLong
        .split(",")[0]
        .slice(4, 11)
    );
    let long = parseFloat(
      this.props.navigation.state.params.data.park[0].latLong
        .split(",")[1]
        .slice(6, 14)
    );
    return (
      <>
        <TouchableWithoutFeedback style={{borderRadius: 10}}
         
          onPress={() => this.addParkToList(parkDeets.name)}
        >
          <Text style={styles.save}>Save {parkDeets.name} to My Parks</Text>
        </TouchableWithoutFeedback>
        <View style={styles.parkContainer}>
          <ScrollView>
            <View>
              <Text style={styles.header}>{parkDeets.name}</Text>

              <Text style={styles.park}>{parkDeets.description}</Text>

              <MapView
                style={styles.mapContainer}
                initialRegion={{
                  latitude: lat,
                  longitude: long,
                  latitudeDelta: 2.2,
                  longitudeDelta: 2.2
                }}
              />
            </View>
            <Text style={styles.subHeader}>Weather Report</Text>
            {parkDeets.weather.data.map((daily, i) => {
              return (
                <View key={`daily${i}`}>
                  <Text style={styles.listHeader}>{daily.time}</Text>
                  <Text style={styles.list}>{daily.summary}</Text>
                  <Text> Temperature High: {daily.temperatureHigh} </Text>
                  <Text> Temperature Low: {daily.temperatureLow} </Text>
                  <Text> Cloud Cover: {daily.cloudCover} </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  save: {
    backgroundColor: colors.secondary,
    height: "5%",
    color: "white",
    fontSize: 16,
    padding: 8,
    paddingLeft: 15,
    borderRadius: 10
  },
  header: {
    width: 250,
    alignContent: "center",
    color: colors.secondary,
    fontSize: 30,
    fontWeight: "bold"
  },
  subHeader: {
    marginTop: 4,
    borderBottomWidth: 2,
    fontSize: 24,
    fontWeight: "bold"
  },
  listHeader: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold"
  },
  parkContainer: {
    alignContent: "center",
    margin: 20,
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary
  },
  parkTitle: {
    fontSize: 25,
    color: colors.secondary,
    fontWeight: "bold"
  },
  park: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 14,
    color: "black"
  },
  mapContainer: {
    height: 300,
    width: 330,
    justifyContent: "center"
  },
  list: {
    padding: 5,
    fontWeight: "bold"
  }
});

const mapStateToProps = state => ({
  mustSeeList: state.records
});

const mapDispatchToProps = (dispatch, getState) => ({
  addPark: park => dispatch(actions.addPark(park))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParkDetails);
