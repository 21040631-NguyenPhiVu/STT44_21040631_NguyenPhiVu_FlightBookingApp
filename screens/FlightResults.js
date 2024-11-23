import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import SortAndFilterModal from './SortAndFilterModal';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import Heart from "react-animated-heart";

const SelectFlight = ({ route }) => {
    const navigation = useNavigation();
    const [isClick, setClick] = useState(false);
    const { from, to, fromCode, toCode, departDate, returnDate, passengers, cabinClass, ticketType, initialName } = route.params;
    const formattedDepartDate = departDate ? departDate.split(', ').slice(1).join(' ') : '';
    const formattedReturnDate = returnDate ? returnDate.split(', ').slice(1).join(' ') : '';
    const handleGoBack = () => {
        navigation.navigate('RoundTrip', {
            from: route.params.from,
            to: route.params.to,
            fromCode: route.params.fromCode,
            toCode: route.params.toCode,
            departDate: route.params.departDate,
            returnDate: route.params.returnDate,
            passengers: route.params.passengers,
            cabinClass: route.params.cabinClass,
            ticketType: route.params.ticketType,
            initialName: route.params.initialName,
        });
    };

    const [extendedFlights, setExtendedFlights] = useState([]);
    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/flights');
                const data = await response.json();
                setExtendedFlights(data);
            } catch (error) {
                console.error('Error fetching flights:', error);
            }
        };

        fetchFlights();
    }, []);

    const formatDate = (dateString) => {
        return dateString ? dateString.split(', ').slice(1).join(' ') : '';
    };

    const formattedFlights = extendedFlights.map(flight => {
        return {
            ...flight,
            legs: flight.legs.map(leg => ({
                ...leg,
                departDate: formatDate(leg.departDate),
                arrivalDate: formatDate(leg.arrivalDate),
            }))
        };
    });

    const [isModalVisible, setIsModalVisible] = useState(false);
    const toggleModal = () => setIsModalVisible(!isModalVisible);
    const [likedFlights, setLikedFlights] = useState([]);

    const toggleLike = (index) => {
        setLikedFlights((prevLikedFlights) => {
            if (prevLikedFlights.includes(index)) {
                return prevLikedFlights.filter((i) => i !== index);
            } else {
                return [...prevLikedFlights, index];
            }
        });
    };

    const filteredFlights = formattedFlights.filter(flight => {
        const legs = flight.legs;

        if (legs.length >= 2) {
            const outboundLeg = legs[0];
            const returnLeg = legs[1];
            return (
                outboundLeg.departDate === formattedDepartDate &&
                returnLeg.arrivalDate === formattedReturnDate &&
                outboundLeg.departureCode === fromCode &&
                outboundLeg.arrivalCode === toCode
            );
        }

        return false;
    });


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.backContainer}>
                        <TouchableOpacity onPress={handleGoBack}>
                            <Image source={require('../assets/images/arrowLeft.png')} style={styles.backIcon} />
                        </TouchableOpacity>
                        <View style={styles.headerTextContainer}>
                            <Text style={styles.locationText}>{from} - {to}</Text>
                            <Text style={styles.dateText}>
                                {formattedDepartDate}{returnDate ? ` - ${formattedReturnDate}` : ''},{' '}
                                {passengers.adults + passengers.children + passengers.infants} traveller
                                {passengers.adults + passengers.children + passengers.infants > 1 ? 's' : ''}
                            </Text>
                        </View>
                    </View>
                    <Image source={require('../assets/images/ringIcon.png')} style={styles.notificationIcon} />
                </View>

                <View style={styles.filterBar}>
                    <TouchableOpacity style={styles.filterButton}
                        onPress={toggleModal}
                    >
                        <Image source={require('../assets/images/sortIcon.png')} style={styles.filterIcon} />
                        <Text style={styles.filterText}>Sort & Filters</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterButtonExpanded}><Text style={styles.filterText}>Best</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.filterButtonExpanded}><Text style={styles.filterText}>Stops</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.filterButtonExpanded}><Text style={styles.filterText}>Time</Text></TouchableOpacity>
                </View>

                <ScrollView style={styles.flightList}>
                    {filteredFlights.length > 0 ? (
                        filteredFlights.map((flight, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.flightCard}
                                onPress={() => navigation.navigate('FlightDetails', { flight, from, to, departDate, returnDate, passengers, cabinClass, ticketType, initialName })}
                            >
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
                                    <Heart isClick={likedFlights.includes(index)} onClick={() => toggleLike(index)} />
                                    <Text style={styles.flightPrice}>{flight.price}</Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text style={{ textAlign: 'center', marginTop: 20 }}>No flights found for this route.</Text>
                    )}
                </ScrollView>
            </View>
            <SortAndFilterModal visible={isModalVisible} onClose={toggleModal} />
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
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        width: '90%',
        alignSelf: 'center',
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    filterButtonExpanded: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        marginHorizontal: 5,
        borderColor: '#ddd',
        flex: 1,
        justifyContent: 'center',
    },
    filterIcon: { width: 20, height: 20, marginRight: 5 },
    filterText: { color: '#333' },
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
    flightLoveIcon: { width: 50, height: 50, resizeMode: 'contain', marginRight: 10 },
    flightPriceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    flightPrice: { fontSize: 20, fontWeight: 'bold', color: '#323842', textAlign: 'right' },
});

export default SelectFlight;