import React from "react";
import { Provider } from "react-redux";
import createStore from "./src/store.js";
const store = createStore();
import Tabs from "./src/index.js";

import { Platform, StyleSheet, Text, View, AppRegistry } from "react-native";
import { graphql, ApolloProvider } from "react-apollo";
import { ApolloClient }from "apollo-client";
import { ApolloLink } from "apollo-link";

import { HttpLink} from "apollo-link-http"
import { onError } from "apollo-link-error"
import { InMemoryCache} from "apollo-cache-inmemory"


const BASE_URL = "http://localhost:4000/";

const httpLink = new HttpLink({
  uri: BASE_URL,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const link = ApolloLink.from([errorLink, httpLink]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache
});



export default class App extends React.Component {
  state = {
    States: []
  };
  addCity = city => {
    const States = this.state.States;
    States.push(city);
    this.setState({ States });
  };

  addLocation = () => {};
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Tabs
            screenProps={{
              States: this.state.States,
              addCity: this.addCity
            }}
          />
        </Provider>
      </ApolloProvider>
    );
  }
}
