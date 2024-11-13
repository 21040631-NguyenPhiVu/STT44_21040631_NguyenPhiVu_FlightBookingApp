import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function StartScreen() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                        <Image source={require("../assets/images/Cancel.png")} style={{ width: 25, height: 25 }} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Flight</Text>
                </View>
                <View style={styles.navContainer}>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 17, color: '#565E6C' }}>Round-trip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem}>
                        <Text style={{ fontSize: 17, fontWeight: "400", color: '#323842', fontWeight: "bold" }}>One-way</Text>
                        <View style={styles.line}></View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 17, fontWeight: "400", color: '#565E6C' }}>Multi-city</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={{ width: '100%', height: 500 }}>
                    <View style={[styles.locationContainer, styles.locationContainer1]}>
                        <Image source={require("../assets/images/takeOff.png")} style={{ width: 30, height: 30, marginHorizontal: 15, resizeMode: 'contain' }} />
                        <TextInput placeholder="From" style={styles.textInput} />
                    </View>

                    <TouchableOpacity style={styles.switchButton}>
                        <Image source={require("../assets/images/switchIcon.png")} style={{ width: 40, height: 40 }} />
                    </TouchableOpacity>

                    <View style={[styles.locationContainer, styles.locationContainer2]}>
                        <Image source={require("../assets/images/Landing.png")} style={{ width: 30, height: 30, marginHorizontal: 15, resizeMode: 'contain' }} />
                        <TextInput placeholder="To" style={styles.textInput} />
                    </View>

                    <View style={styles.dateTimeContainer}>
                        <View style={styles.dateTimeItem}>
                            <TouchableOpacity>
                                <Image source={require("../assets/images/calendar.png")} style={{ width: 30, height: 30, marginHorizontal: 15 }} />
                            </TouchableOpacity>
                            <TextInput placeholder="Fri, Jul 14" style={[styles.textInput, { paddingLeft: 10 }]} />
                        </View>
                    </View>

                    <View style={styles.containerPassenger}>
                        <View style={styles.containerPassengerLeft}>
                            <TouchableOpacity style={{ flexDirection: 'row' }}>
                                <Image source={require("../assets/images/personalTrainer.png")} style={{ width: 23, height: 23, marginHorizontal: 5 }} />
                                <Text style={{ fontSize: 16, fontWeight: "400", color: '#323842' }}>1 traveller</Text>
                            </TouchableOpacity>
                            <View style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#bcc1ca', marginHorizontal: 15, justifyContent: 'center' }}></View>
                            <TouchableOpacity style={{ flexDirection: 'row' }}>
                                <Image source={require("../assets/images/airlineSeatReclineExtra.png")} style={{ width: 23, height: 23, marginRight: 10 }} />
                                <Text style={{ fontSize: 16, fontWeight: "400", color: '#323842' }}>Economy</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity>
                            <Image source={require("../assets/images/arrowDown.png")} style={{ width: 25, height: 25 }} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.btnSearchFlight}>
                        <Text style={styles.textSearchflight}>Search flights</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View >
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        position: 'relative',
    },
    cancelButton: {
        position: 'absolute',
        left: 0,
    },
    title: {
        fontSize: 23,
        fontWeight: "bold",
    },
    navContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
        marginTop: 30,
    },
    navItem: {
        alignItems: 'center'
    },
    line: {
        borderBottomWidth: 3,
        borderBottomColor: "#323842",
        marginTop: 10,
        width: 110,
    },
    locationContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 20,
        height: 55,
        backgroundColor: '#f3f4f6',
        borderRadius: 12,
    },
    locationContainer1: {
        marginTop: 20,
    },
    locationContainer2: {
        marginTop: 5,
    },
    textInput: {
        fontSize: 20,
        fontWeight: "400",
        color: '#bcc1ca',
        height: 50,
        width: '100%',
    },
    switchButton: {
        position: 'absolute',
        right: 30,
        top: 153,
        zIndex: 1,
    },
    dateTimeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
        marginTop: 30,
    },
    dateTimeItem: {
        flexDirection: 'row',
        backgroundColor: '#f3f4f6',
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    containerPassenger: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 30,
    },
    containerPassengerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnSearchFlight: {
        backgroundColor: '#2c46c3',
        borderRadius: 12,
        marginHorizontal: 20,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 250
    },
    textSearchflight: {
        fontSize: 20,
        fontWeight: "400",
        color: '#fff',
    }
});
