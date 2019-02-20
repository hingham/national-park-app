import React from 'react';

import States from './parks/states.js';
import Parks from './parks/parks.js';
import AddVisited from './addvisited/add-visited.js';
import ParkDetails from './parks/park-details.js';

import { createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import { colors } from './theme';




const StatesNav = createStackNavigator({
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
    AddVisited: {screen: AddVisited}
})

const App = createAppContainer(Tabs);


export default App;