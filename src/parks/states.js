import React from "react";
import allStates from "./state-array.js";

import superagent from "superagent";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback
} from "react-native";

import { colors } from "../theme";

import gql from "graphql-tag";
import { Query, graphql, withApollo, ApolloConsumer } from "react-apollo";

const STATE_PARK_QUERY = gql`
  query($stateCode: String!) {
    stateParks(stateCode: $stateCode) {
      name
      parkCode
    }
  }
`;

class States extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      USstates: allStates
    };
  }

  static navigationOptions = {
    title: "States",
    headerTitleStyle: {
      color: colors.titles,
      fontSize: 20,
      fontWeight: "400",
    }
  };

  onStateParksFetched = (data, error, errors, usState) => {
    this.setState({ stateParks: data.stateParks });
    this.props.navigation.navigate("Parks", { data, usState });
  };

  render() {
    return (
      <ScrollView>
        <View>
            {this.state.USstates.map((usState, idx) => (
              <View key={idx + "statemap"} style={styles.cityContainer}>
                <ApolloConsumer>
                  {client => (
                    <TouchableWithoutFeedback
                      onPress={async (e) => {
                        const { data, error, errors } = await client.query({
                          query: STATE_PARK_QUERY,
                          variables: { stateCode: usState.slice(0,3)}
                        });
                        this.onStateParksFetched(data, error, errors, usState);
                      }}
                    >
                    <View >
                      <Text style={styles.state}>{usState.split('-')[1]}</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  )}
                </ApolloConsumer>
              </View>
            ))}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  cityContainer: {
    justifyContent: "center",
    margin: 10,
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary
  },
  state: {
    fontSize: 20,
    color: "black"
  }
});

export default States;
