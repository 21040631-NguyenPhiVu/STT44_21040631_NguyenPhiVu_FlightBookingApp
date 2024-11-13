import React from 'react';
import { SafeAreaView } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

const SelectFlight = () => {
    const flights = [
        {
            legs: [
                {
                    airlineLogo: require('../assets/images/Image21.png'),
                    departureTime: '6:30 AM',
                    arrivalTime: '2:00 PM',
                    duration: '7h30m',
                    departureCode: 'LCY',
                    arrivalCode: 'JFK',
                    airline: 'SkyHaven',
                    stops: '1 stop',
                },
                {
                    airlineLogo: require('../assets/images/Image22.png'),
                    departureTime: '4:00 PM',
                    arrivalTime: '10:00 PM',
                    duration: '7h30m',
                    departureCode: 'JFK',
                    arrivalCode: 'LCY',
                    airline: 'EcoWings',
                    stops: 'Non-stop',
                },
            ],
            price: '$806',
        },
        {
            legs: [
                {
                    airlineLogo: require('../assets/images/Image23.png'),
                    departureTime: '3:15 PM',
                    arrivalTime: '6:05 PM',
                    duration: '7h50m',
                    departureCode: 'LCY',
                    arrivalCode: 'JFK',
                    airline: 'CC Air',
                    stops: 'Direct',
                },
                {
                    airlineLogo: require('../assets/images/Image22.png'),
                    departureTime: '7:00 PM',
                    arrivalTime: '10:00 PM',
                    duration: '7h50m',
                    departureCode: 'JFK',
                    arrivalCode: 'LCY',
                    airline: 'SkyWings',
                    stops: 'Non-stop',
                },
            ],
            price: '$964',
        },
    ];

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.backContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={require('../assets/images/arrowLeft.png')} style={styles.backIcon} />
                        </TouchableOpacity>
                        <View style={styles.headerTextContainer}>
                            <Text style={styles.locationText}>London - New York</Text>
                            <Text style={styles.dateText}>Jul 14 - Jul 17, 1 traveller</Text>
                        </View>
                    </View>
                    <Image source={require('../assets/images/ringIcon.png')} style={styles.notificationIcon} />
                </View>

                <View style={styles.filterBar}>
                    <TouchableOpacity style={styles.filterButton}>
                        <Image source={require('../assets/images/sortIcon.png')} style={styles.filterIcon} />
                        <Text style={styles.filterText}>Sort & Filters</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterButtonExpanded}><Text style={styles.filterText}>Best</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.filterButtonExpanded}><Text style={styles.filterText}>Stops</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.filterButtonExpanded}><Text style={styles.filterText}>Time</Text></TouchableOpacity>
                </View>

                <ScrollView style={styles.flightList}>
                    {flights.map((flight, index) => (
                        <View key={index} style={styles.flightCard}>
                            <View style={styles.flightInfo}>
                                {flight.legs.map((leg, legIndex) => (
                                    <View key={legIndex} style={styles.legInfo}>
                                        <View style={styles.flightRow}>
                                            <Image source={leg.airlineLogo} style={styles.airlineLogo} />
                                            <View style={styles.flightDetailsContainer}>
                                                <Text style={styles.flightTime}>
                                                    {leg.departureTime} — {leg.arrivalTime}
                                                </Text>
                                                <Text style={styles.flightDetails}>
                                                    {leg.departureCode} — {leg.arrivalCode}, {leg.airline}
                                                </Text>
                                            </View>
                                            <View style={styles.flightRightInfo}>
                                                <Text style={styles.flightDuration}>{leg.duration}</Text>
                                                <Text style={styles.flightStops}>{leg.stops}</Text>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </View>

                            <View style={styles.flightPriceContainer}>
                                <TouchableOpacity>
                                    <Image source={require('../assets/images/LoveIcon.png')} style={styles.flightLoveIcon} />
                                </TouchableOpacity>
                                <Text style={styles.flightPrice}>{flight.price}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#ffffff' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
        height: 80,
    },
    backContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#f3f4f6',
        height: 70,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#f3f4f6',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    backIcon: { width: 40, height: 40, marginRight: 10 },
    headerTextContainer: { flex: 1 },
    locationText: { fontSize: 18, fontWeight: '500', color: '#323842' },
    dateText: { color: '#323842', marginTop: 5, fontSize: 16 },
    notificationIcon: { width: 40, height: 40 },
    filterBar: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Space the buttons equally
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingHorizontal: 20,
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 10, // Default padding for "Sort & Filter" button
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#171A1F',
    },
    filterButtonExpanded: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 15, // Increase horizontal padding for longer buttons
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        justifyContent: 'center', // Center the text inside the button
    },
    filterIcon: { width: 20, height: 20, marginRight: 5 },
    filterText: { color: '#171A1F' },
    flightList: { paddingHorizontal: 20, width: '100%', height: 450 },
    flightCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 14,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#eee',
        flexDirection: 'column',
    },
    flightInfo: { flex: 1 },
    legInfo: { marginBottom: 25 },
    flightRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    airlineLogo: { width: 30, height: 30, marginRight: 15 },
    flightDetailsContainer: { flex: 1 },
    flightTime: { fontSize: 18, fontWeight: 'bold', color: '#323842', marginBottom: 10 },
    flightDetails: { color: '#9095A0' },
    flightRightInfo: { justifyContent: 'flex-end', alignItems: 'flex-end' },
    flightDuration: { color: '#323842', marginRight: 20, fontSize: 16 },
    flightStops: { color: '#9095A0', marginRight: 20, fontSize: 16 },
    flightPriceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 20,
    },
    flightLoveIcon: { width: 50, height: 50, resizeMode: 'contain' }, // Ensures spacing
    flightPrice: { fontSize: 22, fontWeight: 'bold', color: '#323842', textAlign: 'right' },
});

export default SelectFlight;
