import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from "react-native";

const FlightDetails = ({ route, navigation }) => {
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
                        <TouchableOpacity style={styles.LoveBtn} onPress={() => navigation.navigate('SeatSelection')}>
                            <Image source={require('../assets/images/LoveIcon.png')} style={{ width: 45, height: 45 }} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require('../assets/images/shareIcon.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.separator} />

                <ScrollView style={{ width: '100%', height: 500, paddingBottom: 70 }}>
                    <View style={styles.section}>
                        <Text style={styles.tripToText}>Your trip to New York</Text>
                        <Text style={styles.fromText}>from London</Text>
                    </View>

                    <View style={[styles.section, { marginTop: 0 }]}>
                        <TouchableOpacity style={styles.dateTimeBtn}>
                            <Text style={styles.dateTimeText}>Fri, Jul 14 - Sun, Jul 17</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <View style={styles.separator} />
                        <View style={[styles.section, { flexDirection: 'row', alignItems: 'center' }]}>
                            <View style={styles.items}>
                                <Image source={require('../assets/images/personalTrainer.png')} style={{ width: 25, height: 25 }} />
                                <Text style={styles.itemText}>1 traveller</Text>
                            </View>
                            <View style={styles.dot} />
                            <View style={styles.items}>
                                <Image source={require('../assets/images/airlineSeatReclineExtra.png')} style={{ width: 25, height: 25 }} />
                                <Text style={styles.itemText}>Economy</Text>
                            </View>
                            <View style={styles.dot} />
                            <View style={styles.items}>
                                <Image source={require('../assets/images/airplaneTicket.png')} style={{ width: 25, height: 25 }} />
                                <Text style={styles.itemText}>Round-trip</Text>
                            </View>
                        </View>
                        <View style={styles.separator} />
                    </View>

                    <View style={styles.content}>
                        <View style={styles.location}>
                            <View>
                                <Text style={styles.departureText}>London -</Text>
                                <Text style={styles.destinationText}>New York city</Text>
                            </View>
                            <View>
                                <Text style={styles.code}>SkyHaven</Text>
                                <Text style={styles.code}>FD695</Text>
                            </View>
                        </View>
                        <View style={styles.separator} />

                        <View style={styles.location}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={styles.departureText}>6:30 AM</Text>
                                <Text style={[styles.dateText, { marginVertical: 10 }]}>Tue, Jul 14</Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={styles.stopText}>1 stop</Text>
                                <View style={{ width: 100, borderWidth: 1, borderColor: '#f3f4f6', marginVertical: 10 }} />
                                <Text style={styles.stopText}>7h30m</Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={styles.departureText}>2:00 PM</Text>
                                <Text style={[styles.dateText, { marginVertical: 10 }]}>Tue, Jul 14</Text>
                            </View>
                        </View>

                        <View style={styles.separator} />
                        <View style={styles.section}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={styles.items}>
                                    <Image source={require('../assets/images/babyCarSeat.png')} style={{ width: 25, height: 25 }} />
                                    <Text style={styles.convenientText}>28'' seat pitch</Text>
                                </View>
                                <View style={styles.items}>
                                    <Image source={require('../assets/images/food.png')} style={{ width: 25, height: 25 }} />
                                    <Text style={styles.convenientText}>Light meal</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
                                <View style={styles.items}>
                                    <Image source={require('../assets/images/wifiIcon.png')} style={{ width: 25, height: 25 }} />
                                    <Text style={styles.convenientText}>Chance of Wifi</Text>
                                </View>
                                <View style={styles.items}>
                                    <Image source={require('../assets/images/phoneCharging.png')} style={{ width: 25, height: 25 }} />
                                    <Text style={styles.convenientText}>No power outlet</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={styles.items}>
                                    <Image source={require('../assets/images/entertainmentIcon.png')} style={{ width: 25, height: 25 }} />
                                    <Text style={styles.convenientText}>No entertaiment</Text>
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.btnShow}>
                            <Text style={styles.showText}>Less info</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.content}>
                        <View style={styles.location}>
                            <View>
                                <Text style={styles.departureText}>New York city</Text>
                                <Text style={styles.destinationText}>- London</Text>
                            </View>
                            <View>
                                <Text style={styles.code}>EcoWings</Text>
                                <Text style={styles.code}>FD695</Text>
                            </View>
                        </View>
                        <View style={styles.separator} />

                        <View style={styles.location}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={styles.departureText}>10:00 PM</Text>
                                <Text style={[styles.dateText, { marginVertical: 10 }]}>Fri, Jul 17</Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={styles.stopText}>Direct</Text>
                                <View style={{ width: 100, borderWidth: 1, borderColor: '#f3f4f6', marginVertical: 10 }} />
                                <Text style={styles.stopText}>9h30m</Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={styles.departureText}>10:15 AM</Text>
                                <Text style={[styles.dateText, { marginVertical: 10 }]}>Sat, Jul 18</Text>
                            </View>
                        </View>

                        <View style={styles.separator} />

                        <TouchableOpacity style={styles.btnShow}>
                            <Text style={styles.showText}>Less info</Text>
                        </TouchableOpacity>
                    </View>

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
                        <Text style={styles.footerPrice}>$806</Text>
                        <Text style={styles.footerPassenger}>Total price</Text>
                    </View>
                    <TouchableOpacity style={styles.btnNext}>
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