import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import AppButton from "./common/button";

export default class Home extends Component {
    static navigationOptions = {
        header: null
    };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>BitNep Exchange</Text>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => this.props.navigation.navigate("TodaysRate")}
                >
                    <Text style={styles.btnText}>BTC -> NPR</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3B2767"
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        marginBottom: 10
    },
    btn: {
        backgroundColor: "#664C9F",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        borderRadius: 5
    },
    btnText: {
        fontSize: 18,
        color: "#fff"
    }
});
