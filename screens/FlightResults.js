import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import SortAndFilterModal from '../screens/SortAndFilterModal';
const FlightSearchScreen = () => {
    const [sortAndFilterVisible, setSortAndFilterVisible] = useState(false);
    const [flights, setFlights] = useState([
        {
            id: '1',
            departureTime: '6:30 AM',
            arrivalTime: '2:00 PM',
            origin: 'LCY',
            destination: 'JFK',
            stops: 'SkyHaven',
            duration: '7h 30m',
            type: 'Direct',
            price: 506,
        },
        {
            id: '2',
            departureTime: '10:00 PM',
            arrivalTime: '10:15 AM',
            origin: 'JFK',
            destination: 'LCY',
            stops: 'EcoWings',
            duration: '7h 15m',
            type: 'Direct',
            price: 506,
        },
        // Add more flight data
    ]);

    const handleOpenModal = () => {
        setSortAndFilterVisible(true);
    }

    // Đóng modal
    const handleCloseModal = () => {
        setSortAndFilterVisible(false);
    }

    const renderFlight = ({ item }) => (
        <View style={styles.flightItem}>
            <View style={styles.flightTimes}>
                <Image source={require('../assets/images/Image21.png')} style={{ width: 35, height: 35 }} />
                <Text style={styles.departureTime}>{item.departureTime}</Text>
                <View style={styles.line}></View>
                <Text style={styles.arrivalTime}>{item.arrivalTime}</Text>
            </View>
            <View style={styles.flightDetails}>
                <Text style={styles.airportCode}>{item.origin}</Text>
                <Image source={require('../assets/images/arrowLeft.png')} style={styles.arrow} />
                <Text style={styles.airportCode}>{item.destination}</Text>
                <Text style={styles.stops}>{item.stops}</Text>
                <Text style={styles.duration}>{item.duration}</Text>
            </View>
            <Text style={styles.flightType}>{item.type}</Text>
            <Text style={styles.price}>${item.price}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerRowLeft}>
                    <TouchableOpacity style={styles.backButton}>
                        <AntDesign name="arrowleft" size={24} color="black" />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.headerTitle}>London - New York</Text>
                        <Text style={styles.headerTime}>Jul 14 - Jul 17, 1 traveller</Text>
                    </View>
                </View>
                <View>
                    <TouchableOpacity>
                        <Image source={require('../assets/images/ringIcon.png')} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.filterContainer}>
                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={() => setSortAndFilterVisible(!sortAndFilterVisible)}
                >
                    <Image source={require('../assets/images/sortIcon.png')} style={styles.filterIcon} />
                    <Text style={styles.filterText}>Sort & Filters</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.filterButton, { borderColor: '#6E7787', width: 60 }]}>
                    <Text style={styles.filterText}>Best</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.filterButton, { borderColor: '#6E7787', width: 60 }]}>
                    <Text style={styles.filterText}>Stops</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.filterButton, { borderColor: '#6E7787', width: 60 }]}>
                    <Text style={styles.filterText}>Time</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={flights}
                renderItem={renderFlight}
                keyExtractor={(item) => item.id}
                style={styles.flightList}
            />
            {sortAndFilterVisible && <SortAndFilterModal />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 20,
        width: '100%',
    },
    headerRowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
        borderRadius: 8,
        height: 55,
        width: 300,
    },
    backButton: {
        marginRight: 16,
        marginLeft: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerTime: {
        fontSize: 16,
        color: '#141414',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        borderColor: '#171A1F',
        borderWidth: 1,
        height: 36,
        justifyContent: 'center',
    },
    filterIcon: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
    filterText: {
        fontSize: 16,
        color: '#6E7787',
    },
    flightList: {
        flex: 1,
    },
    flightItem: {
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderColor: '#BCC1CA',
        borderWidth: 2,
        marginHorizontal: 16,
        borderRadius: 14,
        marginBottom: 16,
    },
    flightTimes: {
        alignItems: 'center',
    },
    departureTime: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    line: {
        width: 30,
        height: 2,
        backgroundColor: '#BCC1CA',
    },
    arrivalTime: {
        fontSize: 16,
        color: '#4b5563',
    },
    flightDetails: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 16,
    },
    airportCode: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    arrow: {
        width: 24,
        height: 24,
    },
    stops: {
        fontSize: 14,
        color: '#4b5563',
    },
    duration: {
        fontSize: 14,
        color: '#4b5563',
    },
    flightType: {
        fontSize: 14,
        color: '#4b5563',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    sortAndFilterModal: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
        padding: 20,
    },
});

export default FlightSearchScreen;