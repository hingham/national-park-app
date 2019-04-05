import React from "react";
import superagent from "superagent";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback
} from "react-native";

import { colors } from "../theme";

import gql from "graphql-tag";
import { Query, graphql, withApollo, ApolloConsumer } from "react-apollo";
import States from "./states";

const PARK_QUERY = gql`
  query ($parkCode: String!) {
    park(parkCode: $parkCode) {
      name
      description
      latLong
      weather(first: 3) {
        summary
        data {
            time
            summary
            cloudCover
            windSpeed
            temperatureLow
            temperatureHigh
        }
      }
    }
  }
`;

export default class Parks extends React.Component {
  state = {};

  onParkDeetsFetched = (data, error, errors) => {
    console.log("got the query");
    this.setState({ stateParks: data.stateParks });
    this.props.navigation.navigate("ParkDetails", { data });
  };

  static navigationOptions = {
    title: "Parks",
    headerTitleStyle: {
      color: colors.titles,
      fontSize: 20,
      fontWeight: "400",
    }
  };


  render() {
    let stateParks = this.props.navigation.state.params.data.stateParks;
    let usState = this.props.navigation.state.params.usState;
    return (
      <View>
        <ScrollView>
          <Text style={styles.header}>{usState.slice(4, usState.length)}</Text>
          {stateParks.map((park, idx) => (
            <View key={idx + park.parkCode} style={styles.parkContainer}>
              <ApolloConsumer>
                {client => (
                  <TouchableWithoutFeedback
                    onPress={async () => {
                      const { data, error, errors } = await client.query({
                        query: PARK_QUERY,
                        variables: {parkCode: park.parkCode}
                      });
                      this.onParkDeetsFetched(data, error, errors);
                    }}
                  >
                    <Text style={styles.parkTitle} key={`name${idx}`}>
                      {park.name}
                    </Text>
                  </TouchableWithoutFeedback>
                )}
              </ApolloConsumer>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.secondary,
    color: 'white',
    margin: 10,
    fontSize: 35,
    fontWeight: "bold",
    padding: 5
  },
  parkContainer: {
    justifyContent: "center",
    margin: 10,
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
    fontSize: 20,
    color: "black"
  }
});
