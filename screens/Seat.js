import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, SafeAreaView } from 'react-native';

const SeatScreen = ({ route, navigation }) => {
    const { flight, from, to, departDate, returnDate, passengers, cabinClass, totalPrice: initialTotalPrice, ticketType, firstName, lastName, gender, email, phone, phoneCode, initialName } = route.params;
    const [totalPrice, setTotalPrice] = useState(initialTotalPrice);

    const handleSelectSeat = (seatPrice) => {
        setTotalPrice(prevPrice => prevPrice + seatPrice);
        navigation.navigate('SeatSelectionScreen', { flight, from, to, departDate, returnDate, passengers, cabinClass, totalPrice: totalPrice + seatPrice, ticketType, firstName, lastName, gender, email, phone, phoneCode });
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../assets/images/arrowLeft.png')} style={{ width: 35, height: 35 }} />
                    </TouchableOpacity>
                    <Image source={require('../assets/images/ProcessSeat.png')} style={{ width: 300, height: 35, resizeMode: 'contain' }} />
                </View>

                <Text style={styles.title}>Seat</Text>

                <View>
                    <View>
                        <View style={styles.separator} />
                        <Text style={styles.flightToText}>Flight to {to}</Text>
                        <View style={styles.separator} />
                    </View>

                    <ScrollView style={{ width: '100%' }}>
                        <View>
                            <View style={styles.flightItem}>
                                <View style={styles.flightItemLeft}>
                                    <Image source={require('../assets/images/airlineSeatReclineExtra.png')} style={{ width: 35, height: 35, resizeMode: 'contain', marginRight: 15 }} />
                                    <View>
                                        <Text style={styles.flightText}>{from} - {to}</Text>
                                        <Text style={styles.seatPrice}>Seats from $5</Text>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => handleSelectSeat(5)}>
                                    <Text style={styles.selectedText}>Select</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.separator} />
                        </View>
                    </ScrollView>
                </View>

                <View>
                    <View>
                        <Text style={[styles.flightToText, { marginTop: 30 }]}>Flight to {from}</Text>
                        <View style={styles.separator} />
                    </View>

                    <ScrollView style={{ width: '100%' }}>
                        <View>
                            <View style={styles.flightItem}>
                                <View style={styles.flightItemLeft}>
                                    <Image source={require('../assets/images/airlineSeatReclineExtra.png')} style={{ width: 35, height: 35, resizeMode: 'contain', marginRight: 15 }} />
                                    <View>
                                        <Text style={styles.flightText}>{to} - {from}</Text>
                                        <Text style={styles.seatPrice}>Seats from $4.59</Text>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => handleSelectSeat(4.59)}>
                                    <Text style={styles.selectedText}>Select</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.separator} />
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.footer}>
                    <View style={styles.footerItemLeft}>
                        <Text style={styles.footerPrice}>${totalPrice.toFixed(2)}</Text>
                        <Text style={styles.footerPassenger}>{passengers.adults + passengers.children + passengers.infants} traveller{passengers.adults + passengers.children + passengers.infants > 1 ? 's' : ''}</Text>
                    </View>
                    <TouchableOpacity style={styles.btnNext} onPress={() => navigation.navigate('Payment', { flight, from, to, departDate, returnDate, passengers, cabinClass, totalPrice, ticketType, firstName, lastName, gender, email, phone, phoneCode, initialName })}>
                        <Text style={styles.btnText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 },
    title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
    separator: { height: 2, backgroundColor: '#F3F4F6', marginVertical: 15, width: '100%', alignSelf: 'stretch' },
    flightToText: { fontSize: 18, color: '#323842', fontWeight: 'bold', marginVertical: 10, paddingHorizontal: 20 },
    flightItem: { flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between', alignItems: 'center' },
    flightItemLeft: { flexDirection: 'row', alignItems: 'center' },
    flightText: { fontSize: 16, color: '#323842', fontWeight: 'bold' },
    seatPrice: { fontSize: 14, color: '#9095A0', marginTop: 10 },
    selectedText: { color: '#10626A', fontSize: 16, fontWeight: 'normal' },
    footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, height: 70, backgroundColor: '#fff' },
    footerPrice: { fontSize: 28, fontWeight: 'bold' },
    footerPassenger: { color: '#9095A0', fontSize: 16, fontWeight: 'normal', marginTop: 5 },
    btnNext: { backgroundColor: '#2C46C3', paddingVertical: 13, paddingHorizontal: 50, borderRadius: 8 },
    btnText: { color: '#fff', fontSize: 16, fontWeight: '500' },
});

export default SeatScreen;