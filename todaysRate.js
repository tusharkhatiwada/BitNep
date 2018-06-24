import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";

import AppButton from "./common/button";

export default class TodaysRate extends Component {
    static navigationOptions = {
        title: `Today's Rate`
    };

    state = {
        rate: 0,
        error: false,
        errorMsg: ""
    };
    componentDidMount() {
        this.fetchExchangeRate();
    }

    fetchExchangeRate = () => {
        axios
            .get(`https://api.coindesk.com/v1/bpi/currentprice/npr.json`)
            .then(res => {
                const rate = res.data.bpi.NPR.rate;
                this.setState({
                    rate
                });
            })
            .catch(err => {
                this.setState({
                    error: true,
                    errorMsg: "Error, try again"
                });
                console.log("Error: ", err);
            });
    };
    render() {
        const { error, errorMsg, rate } = this.state;
        const { props } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.rateContainer}>
                    <Text style={styles.rate}>{error ? errorMsg : `RS. ${rate}`}</Text>
                </View>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => this.props.navigation.navigate("HistoricalRate")}
                >
                    <Text style={styles.btnText}>View Historical Rate</Text>
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
    rateContainer: {
        borderRadius: 5,
        padding: 20,
        backgroundColor: "#664C9F",
        justifyContent: "center",
        alignItems: "center"
    },
    rate: {
        fontSize: 24,
        color: "white"
    },
    btn: {
        backgroundColor: "#664C9F",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        borderRadius: 5,
        marginTop: 20
    },
    btnText: {
        fontSize: 18,
        color: "#fff"
    }
});
