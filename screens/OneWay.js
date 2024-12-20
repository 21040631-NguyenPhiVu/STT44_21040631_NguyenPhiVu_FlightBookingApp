import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, SafeAreaView, ScrollView, Modal, FlatList } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import OneWayDatePickerModal from "../screens/OneWayDatePickerModal";
import PassengerOptionsModal from "../screens/PassengerOptionsModal";

export default function StartScreen({ visible, onClose }) {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [activeField, setActiveField] = useState("");
    const [fromText, setFromText] = useState("");
    const [toText, setToText] = useState("");
    const [searchText, setSearchText] = useState("");
    const [expandedItems, setExpandedItems] = useState({});
    const [departDate, setDepartDate] = useState("Departure date");
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [passengerOptionsVisible, setPassengerOptionsVisible] = useState(false);
    const [passengerInfo, setPassengerInfo] = useState({ adults: 0, children: 0, infants: 0 });
    const [cabinClass, setCabinClass] = useState('Economy');

    const [fromSuggestions] = useState([
        {
            id: "1",
            city: "London",
            country: "United Kingdom",
            subtitle: "Capital of England",
            airports: [
                { name: "London City Airport", code: "LCY", distance: "20 km to destination" },
                { name: "Heathrow Airport", code: "LHR", distance: "11 km to destination" }
            ]
        },
        {
            id: "2",
            city: "London",
            country: "Ontario, Canada",
            subtitle: "City in Ontario, Canada",
            airports: [
                { name: "London International Airport", code: "YXU", distance: "5 km to destination" }
            ]
        }
    ]);

    const [toSuggestions] = useState([
        {
            id: "1",
            city: "New York",
            country: "USA",
            subtitle: "City in New York State",
            airports: [
                { name: "John F.Kennedy International", code: "JFK", distance: "20 km to destination" },
                { name: "LaGuardia Airport", code: "EWR", distance: "13 km to destination" }
            ]
        },
        {
            id: "2",
            city: "London",
            country: "United Kingdom",
            subtitle: "Capital of England",
            airports: [
                { name: "Heathrow Airport", code: "LHR", distance: "15 km to destination" },
                { name: "Gatwick Airport", code: "LGW", distance: "25 km to destination" }
            ]
        },
        {
            id: "3",
            city: "Anywhere",
            subtitle: "Trips to anywhere in the world",
            isSpecial: true
        }
    ]);

    const openModal = (type) => {
        setActiveField(type);
        setModalVisible(true);
        StatusBar.setBarStyle("light-content");
    };

    const handleSelectSuggestion = (item) => {
        if (activeField === "from") {
            setFromText(item.city);
        } else {
            setToText(item.city);
        }
        setSearchText("");
    }
    const handleCloseModal = () => {
        setModalVisible(false);
        StatusBar.setBarStyle("dark-content");
    }

    const handleSwitch = () => {
        setFromText(toText);
        setToText(fromText);
    };

    const handleAirportSelect = (airport) => {
        if (activeField === "from") {
            setFromText(airport.name);
        } else if (activeField === "to") {
            setToText(airport.name);
        }
        handleCloseModal();
    };

    const handleDateSelection = (depart, monthIndex, year) => {
        const formatDate = (day, monthIndex, year) => {
            const date = new Date(year, monthIndex, day);
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return `${days[date.getDay()]}, ${months[monthIndex]} ${day}`;
        };

        setDepartDate(formatDate(depart, monthIndex, year));
    };

    const renderAirport = (airport) => (
        <TouchableOpacity onPress={() => handleAirportSelect(airport)} style={styles.airportItem}>
            <Image source={require("../assets/images/flightIcon.png")} style={styles.airportIcon} />
            <View style={styles.airportDetails}>
                <View style={styles.airportNameContainer}>
                    <Text style={styles.airportName}>{airport.name}</Text>
                    <Text style={styles.airportCode}>{airport.code}</Text>
                </View>
                <Text style={styles.distanceText}>{airport.distance}</Text>
            </View>
        </TouchableOpacity>
    );

    const handleArrow = (id) => {
        setExpandedItems((prevExpandedItems) => ({
            ...prevExpandedItems,
            [id]: !prevExpandedItems[id]
        }));
    };

    const renderSuggestion = ({ item }) => (
        <View style={styles.suggestionContainer}>
            <View style={styles.locationHeader}>
                <Image
                    source={
                        item.id === "3"
                            ? require("../assets/images/World.png")
                            : require("../assets/images/locationIcon.png")
                    }
                    style={styles.locationIcon}
                />
                <View style={styles.locationDetails}>
                    <Text style={styles.cityCountryText}>
                        {item.city}{item.country ? `, ${item.country}` : ""}
                    </Text>
                    <Text style={styles.subtitleText}>{item.subtitle}</Text>
                </View>
                <TouchableOpacity onPress={() => handleArrow(item.id)}>
                    <Image
                        source={
                            expandedItems[item.id]
                                ? require("../assets/images/arrowUp.png")
                                : require("../assets/images/arrowDown.png")
                        }
                        style={styles.arrowIcon}
                    />
                </TouchableOpacity>
            </View>
            {expandedItems[item.id] && item.airports?.map((airport) => renderAirport(airport))}
        </View>
    );

    const handleSavePassengerOptions = (passengers, selectedClass) => {
        setPassengerInfo(passengers);
        setCabinClass(selectedClass);
    };

    const handleSearchFlights = () => {
        onClose();
        navigation.navigate('FlightResults');
    };

    const handleRoundTrip = () => {
        onClose();
        navigation.navigate('RoundTrip');
    };

    const handleMultiCity = () => {
        onClose();
        navigation.navigate('MultiCity');
    }
    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Image source={require("../assets/images/Cancel.png")} style={{ width: 25, height: 25 }} />
                        </TouchableOpacity>
                        <Text style={styles.title}>Flight</Text>
                    </View>
                    <View style={styles.navContainer}>
                        <TouchableOpacity onPress={handleRoundTrip}>
                            <Text style={{ fontSize: 17, fontWeight: 400, color: '#565E6C' }}>Round-trip</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navItem}>
                            <Text style={{ fontSize: 17, color: '#323842', fontWeight: "bold" }}>One-way</Text>
                            <View style={styles.line}></View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleMultiCity}>
                            <Text style={{ fontSize: 17, fontWeight: "400", color: '#565E6C' }}>Multi-city</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={{ width: '100%', height: 500 }}>
                        <TouchableOpacity style={[styles.locationContainer, styles.locationContainer1]} onPress={() => { openModal(); setActiveField("from"); }}>
                            <Image source={require("../assets/images/takeOff.png")} style={{ width: 30, height: 30, marginHorizontal: 15, resizeMode: 'contain' }} />
                            <TextInput placeholder="From" style={styles.textInput} value={fromText} editable={false} onChangeText={setFromText} placeholderTextColor={'#BCC1CA'} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.switchButton}>
                            <Image source={require("../assets/images/switchIcon.png")} style={{ width: 40, height: 40 }} />
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.locationContainer, styles.locationContainer2]} onPress={() => { openModal(); setActiveField("to"); }}>
                            <Image source={require("../assets/images/Landing.png")} style={{ width: 30, height: 30, marginHorizontal: 15, resizeMode: 'contain' }} />
                            <TextInput placeholder="To" style={styles.textInput} value={toText} editable={false} onChangeText={setToText} placeholderTextColor={'#BCC1CA'} />
                        </TouchableOpacity>

                        <View style={styles.dateTimeContainer}>
                            <View style={styles.dateTimeItem}>
                                <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
                                    <Image source={require("../assets/images/calendar.png")} style={{ width: 30, height: 30, marginHorizontal: 15 }} />
                                </TouchableOpacity>
                                <TextInput
                                    style={[styles.textInput, { paddingLeft: 5 }]}
                                    placeholder="Depart date"
                                    value={departDate}
                                    editable={false}
                                    placeholderTextColor={'#BCC1CA'}
                                />
                            </View>
                        </View>

                        <View style={styles.containerPassenger}>
                            <View style={styles.containerPassengerLeft}>
                                <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 20 }}>
                                    <Image source={require("../assets/images/personalTrainer.png")} style={{ width: 23, height: 23, marginHorizontal: 5 }} />
                                    <Text style={{ fontSize: 16, fontWeight: "400", color: '#323842' }}>
                                        {passengerInfo.adults + passengerInfo.children + passengerInfo.infants} traveller(s)
                                    </Text>
                                </TouchableOpacity>
                                <View style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#bcc1ca', marginHorizontal: 15, justifyContent: 'center' }}></View>
                                <TouchableOpacity style={{ flexDirection: 'row' }}>
                                    <Image source={require("../assets/images/airlineSeatReclineExtra.png")} style={{ width: 23, height: 23, marginRight: 10 }} />
                                    <Text style={{ fontSize: 16, fontWeight: "400", color: '#323842' }}>{cabinClass}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => setPassengerOptionsVisible(true)}>
                                <Image source={require("../assets/images/arrowDown.png")} style={{ width: 25, height: 25 }} />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.btnSearchFlight} onPress={handleSearchFlights}>
                            <Text style={styles.textSearchflight}>Search flights</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View >

                <Modal visible={modalVisible} animationType="slide">
                    <SafeAreaView style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Where {activeField === "from" ? "from" : "to"}?</Text>
                            <TouchableOpacity onPress={handleCloseModal}>
                                <Image source={require("../assets/images/Cancel.png")} style={styles.closeIcon} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: '100%', marginHorizontal: 20 }}>
                            <View style={styles.inputContainer}>
                                <Image source={require("../assets/images/takeOff.png")} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.searchInput}
                                    value={fromText}
                                    placeholder="From"
                                    placeholderTextColor="#6B7280"
                                    onFocus={() => setActiveField("from")}
                                    onChangeText={setFromText}
                                />
                            </View>

                            <TouchableOpacity style={styles.switchButtonModal} onPress={handleSwitch}>
                                <Image source={require("../assets/images/switchIcon.png")} style={{ width: 40, height: 40 }} />
                            </TouchableOpacity>

                            <View style={styles.inputContainer}>
                                <Image source={require("../assets/images/Landing.png")} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.searchInput}
                                    value={toText}
                                    placeholder="To"
                                    placeholderTextColor="#6B7280"
                                    onFocus={() => setActiveField("to")}
                                    onChangeText={setToText}
                                />
                            </View>
                        </View>

                        <FlatList
                            data={activeField === "from" ? fromSuggestions : toSuggestions}
                            renderItem={renderSuggestion}
                            keyExtractor={(item) => item.id}
                            style={[styles.suggestionList, { width: '100%', marginHorizontal: 20 }]}
                        />
                    </SafeAreaView>
                </Modal>

                <OneWayDatePickerModal
                    visible={datePickerVisible}
                    onClose={() => setDatePickerVisible(false)}
                    onSelectDate={(depart, monthIndex, year) => {
                        handleDateSelection(depart, monthIndex, year);
                        setDatePickerVisible(false);
                    }}
                />
                <PassengerOptionsModal
                    visible={passengerOptionsVisible}
                    onClose={() => setPassengerOptionsVisible(false)}
                    onSave={handleSavePassengerOptions}
                />
            </SafeAreaView >
        </Modal>
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
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
    },
    modalContent: {
        width: "100%",
        height: "95%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        width: '100%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: 'center',
        flex: 1,
    },
    modalSearchInput: {
        width: "100%",
        padding: 10,
        borderRadius: 8,
        height: 55,
        fontSize: 23,
    },
    activeInput: {
        borderColor: "#007bff",
    },
    renderSuggestion: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        width: "120%",
        backgroundColor: 'red'
    },
    suggestionItem: {
        flexDirection: "row",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    suggestionTextContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    suggestionCity: {
        fontSize: 16,
        fontWeight: "bold",
    },
    suggestionDetails: {
        color: "#888",
        fontSize: 14,
    },
    closeButton: {
        marginTop: 20,
    },
    closeButtonText: {
        color: "#007bff",
        fontSize: 16,
    },
    closeIcon: {
        width: 25,
        height: 25,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
        borderRadius: 8,
        marginBottom: 8,
        paddingHorizontal: 16,
        marginHorizontal: 20,
    },
    inputIcon: {
        width: 24,
        height: 24,
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#111827',
        width: '100%',
        height: 50,
    },
    suggestionList: {
        flex: 1,
        width: '100%',
        marginHorizontal: 20,
    },
    suggestionContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    locationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    locationIcon: {
        width: 35,
        height: 35,
        marginRight: 12,
    },
    locationDetails: {
        flex: 1,
    },
    cityCountryText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    subtitleText: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 2,
    },
    airportItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 36,
        marginTop: 12,
    },
    airportIcon: {
        width: 35,
        height: 35,
        marginRight: 12,
    },
    airportDetails: {
        flex: 1,
    },
    airportNameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    airportName: {
        fontSize: 16,
        color: '#111827',
    },
    airportCode: {
        fontSize: 16,
        color: '#111827',
        fontWeight: '500',
    },
    distanceText: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 2,
    },
    arrowIcon: {
        width: 30,
        height: 30,
    },
});
