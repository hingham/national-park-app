import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  ImageBackground
} from "react-native";

import { colors } from "./theme";
import parkImage from "./assets/national-park.jpg"

class Home extends React.Component {
  static navigationOptions = {
    title: "National Parks",
    headerTitleStyle: {
      color: colors.titles,
      fontSize: 20,
      fontWeight: "400"
    }
  };

  goToStates = () => {
    this.props.navigation.navigate("States", {});
  };

  render() {
    return (
      <ImageBackground source={parkImage} style={{ height: "100%" }}>
        <View style={styles.body}  style={{padding: 20}}
>
          <TouchableWithoutFeedback
            onPress={() => {
              this.goToStates();
            }}
          >
            <View style={{backgroundColor: "white", opacity: ".7", marginTop: "60%"}}>
              <Text style={styles.titleText}>Find National Park Adventures</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    height: "100%"
  },
  titleText: {
    fontSize: 22, 
    fontWeight: "bold", 
    padding: "8%", 
    textAlign: "center"
  },
  state: {
    fontSize: 20,
    color: "black"
  }
});

export default Home;
