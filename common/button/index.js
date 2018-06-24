import React, { Component } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default class AppButton extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>{this.props.btnText}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
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
