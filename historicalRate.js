import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform,
    DatePickerAndroid,
    DatePickerIOS,
    TouchableOpacity,
    ScrollView
} from "react-native";
import axios from "axios";
import moment from "moment";

const d = new Date();
const date = d.toDateString();

export default class HistoricalRate extends Component {
    static navigationOptions = {
        title: "Historical Rate"
    };
    state = {
        fromDate: date,
        toDate: date,
        rates: []
    };
    renderDatePickerAndroidTo = () => {
        return (
            <TouchableOpacity
                style={styles.dateBtn}
                onPress={() => this.displayDatePickerAndroidTo()}
            >
                <Text style={styles.date}>{this.state.toDate}</Text>
            </TouchableOpacity>
        );
    };
    renderDatePickerIosTo = () => {};
    renderDatePickerAndroidFrom = () => {
        return (
            <TouchableOpacity
                style={styles.dateBtn}
                onPress={() => this.displayDatePickerAndroidFrom()}
            >
                <Text style={styles.date}>{this.state.fromDate}</Text>
            </TouchableOpacity>
        );
    };
    renderDatePickerIosFrom = () => {};

    displayDatePickerAndroidTo = async () => {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                // Selected year, month (0-11), day
                const d = new Date(year, month, day);
                const toDate = d.toDateString();
                const to = moment(`${year}-${month}-${day}`).format("YYYY-MM-DD");
                this.setState({
                    toDate,
                    to
                });
            }
        } catch ({ code, message }) {
            console.warn("Cannot open date picker", message);
        }
    };
    displayDatePickerAndroidFrom = async () => {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                // Selected year, month (0-11), day
                const d = new Date(year, month, day);
                const fromDate = d.toDateString();
                const fromD = moment(`${year}-${month}-${day}`).format("YYYY-MM-DD");
                this.setState({
                    fromDate,
                    fromD
                });
            }
        } catch ({ code, message }) {
            console.warn("Cannot open date picker", message);
        }
    };
    generateRate = () => {
        const { fromD, to } = this.state;
        axios
            .get(
                `https://api.coindesk.com/v1/bpi/historical/close.json?currency=npr&start=${fromD}&end=${to}`
            )
            .then(res => {
                const rates = res.data.bpi;
                const rateLists = [];
                const keys = Object.keys(rates);
                for (let i = 0; i <= keys.length; i++) {
                    rateLists.push({
                        date: keys[i],
                        rate: rates[keys[i]]
                    });
                }
                this.setState({
                    rates: rateLists
                });
                // console.log("Rates: ", rateLists);
            })
            .catch(err => {
                console.log("Error generation rate: ", err);
            });
    };
    renderRate = () => {
        const { rates } = this.state;

        return rates.map((rate, i) => {
            return (
                <View
                    key={rate.date}
                    style={[
                        styles.tableContainer,
                        { backgroundColor: i % 2 === 0 ? "#664C9F" : "#3B2767" }
                    ]}
                >
                    <View style={styles.row}>
                        <Text style={styles.content}>{rate.date}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.content}>{rate.rate}</Text>
                    </View>
                </View>
            );
        });
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.datePickerContainer}>
                    <View style={styles.picker}>
                        <Text style={styles.text}>From</Text>
                        {Platform.OS === "ios"
                            ? this.renderDatePickerIosFrom()
                            : this.renderDatePickerAndroidFrom()}
                    </View>
                    <View style={styles.picker}>
                        <Text style={styles.text}>To</Text>
                        {this.renderDatePickerAndroidTo()}
                    </View>
                </View>
                <View>
                    <TouchableOpacity style={styles.btn} onPress={() => this.generateRate()}>
                        <Text style={styles.btnText}>Generate Rate</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>{this.renderRate()}</ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "stretch",
        backgroundColor: "#3B2767"
    },
    datePickerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    picker: {
        flex: 1,
        borderWidth: 1,
        borderColor: "red"
    },
    text: {
        color: "white",
        fontSize: 20
    },
    dateBtn: {
        borderRadius: 5,
        padding: 10,
        backgroundColor: "#664C9F"
    },
    date: {
        color: "white",
        fontSize: 18
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
    },
    tableContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10
    },
    row: {
        flex: 1
    },
    content: {
        color: "white",
        fontSize: 18,
        textAlign: "center"
    }
});
