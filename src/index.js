import React from 'react';

import Home from './home.js'
import States from './parks/states.js';
import Parks from './parks/parks.js';
import Saved from './addvisited/saved.js';
import ParkDetails from './parks/park-details.js';
import { createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import { colors } from './theme';



const StatesNav = createStackNavigator({
    Home: {screen: Home},
    States: {screen: States},
    Parks: {screen: Parks},
    ParkDetails: {screen: ParkDetails}
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: colors.primary
        },
        headerTintColor: '#fff'
    }
})

const Tabs = createBottomTabNavigator({
    States: {screen: StatesNav},
    Saved: {screen: Saved}
})

const App = createAppContainer(Tabs);


export default App;