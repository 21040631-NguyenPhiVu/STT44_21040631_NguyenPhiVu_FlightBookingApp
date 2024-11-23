import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from "react-native";
import { format } from 'date-fns';
import Heart from "react-animated-heart";

const FlightDetails = ({ route, navigation }) => {
    const { flight, from, to, departDate, returnDate, passengers, cabinClass, ticketType, initialName } = route.params;
    const [likedFlights, setLikedFlights] = useState([]);
    const formattedDepartDate = departDate ? departDate : '';
    const formattedReturnDate = returnDate ? returnDate : '';
    const [isInfoVisible, setIsInfoVisible] = useState({});

    const toggleInfoVisibility = (index) => {
        setIsInfoVisible(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    const toggleLike = (index) => {
        setLikedFlights((prevLikedFlights) => {
            if (prevLikedFlights.includes(index)) {
                return prevLikedFlights.filter((i) => i !== index);
            } else {
                return [...prevLikedFlights, index];
            }
        });
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity style={styles.goBackBtn} onPress={() => navigation.goBack()}>
                            <Image source={require('../assets/images/arrowLeft.png')} style={{ width: 35, height: 35 }} />
                        </TouchableOpacity>
                        <Text style={styles.title}>Flight details</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <Heart isClick={likedFlights.includes(flight.id)} onClick={() => toggleLike(flight.id)} />
                        <TouchableOpacity>
                            <Image source={require('../assets/images/shareIcon.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.separator} />

                <ScrollView style={{ width: '100%', height: 500, paddingBottom: 70 }}>
                    <View style={styles.section}>
                        <Text style={styles.tripToText}>Your trip to {to}</Text>
                        <Text style={styles.fromText}>from {from}</Text>
                    </View>

                    <View style={[styles.section, { marginTop: 0 }]}>
                        <TouchableOpacity style={styles.dateTimeBtn}>
                            <Text style={styles.dateTimeText}>{formattedDepartDate} - {formattedReturnDate}</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <View style={styles.separator} />
                        <View style={[styles.section, { flexDirection: 'row', alignItems: 'center' }]}>
                            <View style={styles.items}>
                                <Image source={require('../assets/images/personalTrainer.png')} style={{ width: 25, height: 25 }} />
                                <Text style={styles.itemText}>{passengers.adults + passengers.children + passengers.infants} traveller{passengers.adults + passengers.children + passengers.infants > 1 ? 's' : ''}</Text>
                            </View>
                            <View style={styles.dot} />
                            <View style={styles.items}>
                                <Image source={require('../assets/images/airlineSeatReclineExtra.png')} style={{ width: 25, height: 25 }} />
                                <Text style={styles.itemText}>{cabinClass}</Text>
                            </View>
                            <View style={styles.dot} />
                            <View style={styles.items}>
                                <Image source={require('../assets/images/airplaneTicket.png')} style={{ width: 25, height: 25 }} />
                                <Text style={styles.itemText}>{ticketType}</Text>
                            </View>
                        </View>
                    </View>

                    {flight.legs.map((leg, index) => (
                        <View key={index}>
                            <View style={styles.separator} />
                            <View style={styles.content}>
                                <View style={styles.location}>
                                    <View>
                                        <Text style={styles.departureText}>{index === 0 ? from : to} -</Text>
                                        <Text style={styles.destinationText}>{index === 0 ? to : from}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.code}>{leg.airline}</Text>
                                        <Text style={styles.code}>{leg.flightNo}</Text>
                                    </View>
                                </View>
                                <View style={styles.separator} />

                                <View style={styles.location}>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={styles.departureText}>{leg.departureTime}</Text>
                                        <Text style={[styles.dateText, { marginVertical: 10 }]}>{leg.departDate}</Text>
                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={styles.stopText}>{leg.stops}</Text>
                                        <View style={{ width: 100, borderWidth: 1, borderColor: '#f3f4f6', marginVertical: 10 }} />
                                        <Text style={styles.stopText}>{leg.duration}</Text>
                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={styles.departureText}>{leg.arrivalTime}</Text>
                                        <Text style={[styles.dateText, { marginVertical: 10 }]}>{leg.arrivalDate}</Text>
                                    </View>
                                </View>

                                <View style={styles.separator} />
                                {isInfoVisible[index] && (
                                    <View style={styles.section}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View style={styles.items}>
                                                <Image source={require('../assets/images/babyCarSeat.png')} style={{ width: 25, height: 25 }} />
                                                <Text style={styles.convenientText}>{leg.amenities.seatPitch}</Text>
                                            </View>
                                            <View style={styles.items}>
                                                <Image source={require('../assets/images/food.png')} style={{ width: 25, height: 25 }} />
                                                <Text style={styles.convenientText}>{leg.amenities.meal}</Text>
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
                                            <View style={styles.items}>
                                                <Image source={require('../assets/images/wifiIcon.png')} style={{ width: 25, height: 25 }} />
                                                <Text style={styles.convenientText}>{leg.amenities.wifi}</Text>
                                            </View>
                                            <View style={styles.items}>
                                                <Image source={require('../assets/images/phoneCharging.png')} style={{ width: 25, height: 25 }} />
                                                <Text style={styles.convenientText}>{leg.amenities.power}</Text>
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View style={styles.items}>
                                                <Image source={require('../assets/images/entertainmentIcon.png')} style={{ width: 25, height: 25 }} />
                                                <Text style={styles.convenientText}>{leg.amenities.entertainment}</Text>
                                            </View>
                                        </View>
                                    </View>
                                )}

                                <TouchableOpacity style={styles.btnShow} onPress={() => toggleInfoVisibility(index)}>
                                    <Text style={styles.showText}>{isInfoVisible[index] ? 'Less info' : 'More info'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}

                    <View style={styles.separator} />

                    <View style={styles.section}>
                        <Text style={styles.tripToText}>Included baggage</Text>
                        <Text style={styles.fromText}>The total baggage included in the price</Text>
                    </View>

                    <View style={[styles.section, { flexDirection: 'row', alignItems: 'center' }]}>
                        <View style={styles.itemSection}>
                            <Image source={require('../assets/images/backPack.png')} style={{ width: 35, height: 35 }} />
                        </View>
                        <View>
                            <Text style={styles.text}>1 personal item</Text>
                            <Text style={[styles.text, { marginVertical: 5 }]}>Must go under the seat in front of you</Text>
                            <Text style={styles.includedText}>Included</Text>
                        </View>
                    </View>

                    <View style={[styles.section, { flexDirection: 'row', marginBottom: 20 }]}>
                        <Text style={styles.policyText}>Baggage policies</Text>
                        <Text style={styles.skyHavenText}>SkyHaven</Text>
                    </View>

                    <View style={styles.separator} />

                    <View style={styles.section}>
                        <Text style={styles.tripToText}>Extra baggage</Text>
                    </View>

                    <View style={[styles.section, { flexDirection: 'row', alignItems: 'center' }]}>
                        <View style={styles.itemSection}>
                            <Image source={require('../assets/images/bagIcon.png')} style={{ width: 35, height: 35 }} />
                        </View>
                        <View>
                            <Text style={styles.text}>Carry-on</Text>
                            <Text style={[styles.text, { marginVertical: 5 }]}>From $11.99</Text>
                            <Text style={styles.text}>Available in the next steps</Text>
                        </View>
                    </View>

                    <View style={[styles.section, { flexDirection: 'row', alignItems: 'center' }]}>
                        <View style={styles.itemSection}>
                            <Image source={require('../assets/images/Luggage.png')} style={{ width: 35, height: 35 }} />
                        </View>
                        <View>
                            <Text style={styles.text}>Checked bag</Text>
                            <Text style={[styles.text, { marginVertical: 5 }]}>From $19.99</Text>
                            <Text style={styles.text}>Available in the next steps</Text>
                        </View>
                    </View>
                    <View style={styles.separator} />
                </ScrollView>

                <View style={styles.footer}>
                    <View style={styles.footerItemLeft}>
                        <Text style={styles.footerPrice}>{flight.price}</Text>
                        <Text style={styles.footerPassenger}>Total price</Text>
                    </View>
                    <TouchableOpacity style={styles.btnNext} onPress={() => navigation.navigate('TravellerInformation', {
                        flight: flight, from: from, to: to, departDate: departDate, returnDate: returnDate, passengers: passengers, cabinClass: cabinClass, ticketType: ticketType, initialName: initialName
                    })}>
                        <Text style={styles.btnText}>Select</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    goBackBtn: {
        marginRight: 20,
        justifyContent: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 20
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    LoveBtn: {
        marginRight: 5
    },
    separator: {
        width: '100%',
        height: 2,
        backgroundColor: '#f3f4f6',
        marginTop: 20
    },
    section: {
        marginTop: 20,
        paddingHorizontal: 20
    },
    tripToText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#323842',
    },
    fromText: {
        fontSize: 16,
        color: '#9095A0',
        marginTop: 5
    },
    dateTimeBtn: {
        backgroundColor: '#323842',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        width: '55%',
        height: 45,
        width: 230,
        justifyContent: 'center'
    },
    dateTimeText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center'
    },
    items: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        width: 5,
        height: 5,
        borderRadius: 5,
        backgroundColor: '#9095A0',
        marginHorizontal: 10,
        alignItems: 'center',
        marginHorizontal: 20
    },
    itemText: {
        color: '#323842',
        marginLeft: 5
    },
    content: {
        marginHorizontal: 20,
        borderRadius: 13,
        borderColor: '#BCC1CA',
        borderWidth: 1,
        marginTop: 20,
        shadowColor: '#BCC1CA',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        elevation: 5,
    },
    location: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20
    },
    departureText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#323842'
    },
    destinationText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#323842'
    },
    code: {
        color: '#9095A0',
        fontSize: 16
    },
    dateText: {
        color: '#323842',
        fontSize: 16
    },
    stopText: {
        color: '#9095A0',
        fontSize: 16
    },
    convenientText: {
        color: '#323842',
        marginLeft: 10,
        fontSize: 16,
    },
    btnShow: {
        alignItems: 'center',
        marginVertical: 20
    },
    showText: {
        color: '#9095A0',
        fontSize: 16,
        fontWeight: '500'
    },
    itemSection: {
        marginLeft: 10,
        marginRight: 20,
    },
    text: {
        color: '#323842',
        fontSize: 18,
        fontWeight: 'normal'
    },
    includedText: {
        color: '#67A50F',
        fontSize: 16,
        fontWeight: 'normal'
    },
    policyText: {
        color: '#9095A0',
        fontSize: 16,
        fontWeight: 'normal'
    },
    skyHavenText: {
        color: '#10626A',
        fontSize: 16,
        fontWeight: 'normal',
        marginLeft: 20
    },
    footer: { position: 'absolute', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, height: 70, bottom: 0, left: 0, right: 0, backgroundColor: '#fff' },
    footerPrice: { fontSize: 28, fontWeight: 'bold' },
    footerPassenger: { color: '#9095A0', fontSize: 16, fontWeight: 'normal', marginTop: 5 },
    btnNext: { backgroundColor: '#2C46C3', paddingVertical: 13, paddingHorizontal: 50, borderRadius: 8 },
    btnText: { color: '#fff', fontSize: 16, fontWeight: '500' },
})

export default FlightDetails;