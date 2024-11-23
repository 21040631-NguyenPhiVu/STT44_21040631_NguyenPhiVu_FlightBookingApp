import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from "react-native";
import { Card } from "react-native-elements";
export default function BookingSuccessful({ route, navigation }) {
    const { flight, from, to, departDate, returnDate, passengers, cabinClass, totalPrice, ticketType, travellerDetails, initialName } = route.params;
    const { firstName, lastName, gender, email, phone, phoneCode } = travellerDetails;
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Image source={require("../assets/images/background.jpg")} style={styles.background} />
                <View style={styles.CardContainer}>
                    <Image source={require("../assets/images/success.png")} style={{ width: 50, height: 50, marginVertical: 15 }} />
                    <Text style={{ fontSize: 23, fontWeight: "bold", color: '#323842' }}>Booking successful</Text>
                    <View style={styles.separator} />
                    <View style={styles.row}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 22, marginVertical: 10, color: '#323842', fontWeight: '600' }}>{from}</Text>
                            <Text style={{ fontSize: 16, color: '#323842', fontWeight: '500' }}>{departDate}</Text>
                        </View>
                        <Image source={require("../assets/images/swap.png")} style={{ width: 30, height: 30 }} />
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 22, marginVertical: 10, color: '#323842', fontWeight: '600' }}>{to}</Text>
                            <Text style={{ fontSize: 16, color: '#323842', fontWeight: '500' }}>{returnDate}</Text>
                        </View>
                    </View>

                    <View style={styles.separator} />

                    <View style={styles.row}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, marginVertical: 10, color: '#9095A0' }}>Traveller</Text>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>{firstName} {lastName}</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, marginVertical: 10, color: '#9095A0' }}>Class</Text>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>{cabinClass}</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, marginVertical: 10, color: '#9095A0' }}>Flight</Text>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>{ticketType}</Text>
                        </View>
                    </View>
                    <View style={styles.separator} />
                    <Text style={styles.price}>${totalPrice.toFixed(2)}</Text>
                    <View style={styles.separator} />

                    <TouchableOpacity style={styles.btnBooking}>
                        <Text style={styles.bookingText}>Booking detail</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnHome} onPress={() => navigation.navigate('Home', { initialName })}>
                        <Text style={styles.homeText}>Home</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    background: {
        resizeMode: "cover",
        width: "100%",
        height: "50%",
        alignItems: "center",
    },
    CardContainer: {
        position: "absolute",
        top: "20%",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        marginHorizontal: 20,
        width: "90%",
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: "#f3f4f6",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    separator: {
        borderBottomColor: "#f3f4f6",
        borderBottomWidth: 1,
        width: "100%",
        marginVertical: 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        alignItems: "center",
    },
    price: {
        fontSize: 22,
        fontWeight: "bold",
        marginVertical: 10,
        color: '#323842',
    },
    btnBooking: {
        backgroundColor: "#2C46C3",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
    },
    bookingText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 16,
    },
    btnHome: {
        marginVertical: 25,

    },
    homeText: {
        color: "#2C46C3",
        textAlign: "center",
        fontSize: 18,
    },
});