import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { createStackNavigator } from "react-navigation";

import Home from "./Home";
import TodaysRate from "./todaysRate";
import HistoricalRate from "./historicalRate";

export default createStackNavigator({
    Home: {
        screen: Home
    },
    TodaysRate: {
        screen: TodaysRate
    },
    HistoricalRate: {
        screen: HistoricalRate
    }
});
