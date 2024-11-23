import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, SafeAreaView, ScrollView, Modal, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { StatusBar } from "react-native";
import DatePickerModal from "../screens/DatePickerModal";
import PassengerOptionsModal from "../screens/PassengerOptionsModal";
import { useRoute } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';

export default function RoundTrip({ visible, onClose, initialName }) {
    const navigation = useNavigation();
    const route = useRoute();
    const routeParams = route.params || {};
    const [modalVisible, setModalVisible] = useState(false);
    const [activeField, setActiveField] = useState("");
    const [fromText, setFromText] = useState("");
    const [toText, setToText] = useState("");
    const [expandedItems, setExpandedItems] = useState({});
    const [departDate, setDepartDate] = useState("Departure date");
    const [returnDate, setReturnDate] = useState("Return date");
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [passengerOptionsVisible, setPassengerOptionsVisible] = useState(false);
    const [passengerInfo, setPassengerInfo] = useState({ adults: 0, children: 0, infants: 0 });
    const [cabinClass, setCabinClass] = useState('Economy');
    const [ticketType, setTicketType] = useState('Round-trip');
    const [fromCode, setFromCode] = useState("");
    const [toCode, setToCode] = useState("");

    useEffect(() => {
        if (route.params) {
            const { from, to, fromCode, toCode, departDate, returnDate, passengers, cabinClass } = route.params;
            setFromText(from || "");
            setToText(to || "");
            setFromCode(fromCode || "");
            setToCode(toCode || "");
            setDepartDate(departDate || "Departure date");
            setReturnDate(returnDate || "Return date");
            setPassengerInfo(passengers || { adults: 0, children: 0, infants: 0 });
            setCabinClass(cabinClass || 'Economy');
            setTicketType(ticketType || 'Round-trip');
        }
    }, [route.params]);

    const [fromSuggestions, setFromSuggestions] = useState([]);
    const [toSuggestions, setToSuggestions] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredFromSuggestions, setFilteredFromSuggestions] = useState(fromSuggestions);
    const [filteredToSuggestions, setFilteredToSuggestions] = useState(toSuggestions);
    useEffect(() => {
        const fetchFromSuggestions = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/fromSuggestions');
                const data = await response.json();
                setFromSuggestions(data);
                setFilteredFromSuggestions(data);
            } catch (error) {
                console.error('Error fetching fromSuggestions:', error);
            }
        };

        const fetchToSuggestions = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/toSuggestions');
                const data = await response.json();
                setToSuggestions(data);
                setFilteredToSuggestions(data);
            } catch (error) {
                console.error('Error fetching toSuggestions:', error);
            }
        };

        fetchFromSuggestions();
        fetchToSuggestions();
    }, []);
    const handleSearch = (text, type) => {
        setSearchQuery(text);
        const query = text.toLowerCase();

        if (type === "from") {
            setFromText(text);
            const filtered = fromSuggestions.filter(item =>
                item.city.toLowerCase().includes(query) ||
                (item.country && item.country.toLowerCase().includes(query)) ||
                item.airports?.some(airport =>
                    airport.name.toLowerCase().includes(query) ||
                    airport.code.toLowerCase().includes(query)
                )
            );
            setFilteredFromSuggestions(filtered);
        } else {
            setToText(text);
            const filtered = toSuggestions.filter(item =>
                item.city.toLowerCase().includes(query) ||
                (item.country && item.country.toLowerCase().includes(query)) ||
                item.airports?.some(airport =>
                    airport.name.toLowerCase().includes(query) ||
                    airport.code.toLowerCase().includes(query)
                )
            );
            setFilteredToSuggestions(filtered);
        }
    };

    const openModal = (type) => {
        setActiveField(type);
        setModalVisible(true);
        StatusBar.setBarStyle("light-content");
    };

    const handleSelectSuggestion = (item) => {
        if (item.isSpecial) {
            if (activeField === "from") {
                setFromText(item.city);
            } else if (activeField === "to") {
                setToText(item.city);
            }
            handleCloseModal();
        }
        handleArrow(item.id);
    }
    const handleCloseModal = () => {
        setModalVisible(false);
        StatusBar.setBarStyle("dark-content");
    }

    const handleSwitch = () => {
        setFromText(toText);
        setToText(fromText);
        setfromCode(toCode);
        setToCode(fromCode);
    };

    const handleAirportSelect = (airport, item) => {
        if (activeField === "from") {
            setFromText(item.city);
            setFromCode(airport.code);
        } else if (activeField === "to") {
            setToText(item.city);
            setToCode(airport.code);
        }
        handleCloseModal();
    };

    const handleDateSelection = (depart, return_, monthIndex, year) => {
        try {
            if (monthIndex < 0 || monthIndex > 11 || isNaN(year)) {
                throw new Error('Tháng hoặc năm không hợp lệ');
            }
            if (isNaN(depart) || isNaN(return_) || isNaN(monthIndex) || isNaN(year)) {
                throw new Error('Kiểu dữ liệu đầu vào không hợp lệ');
            }
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const selectedDepartDate = new Date(Date.UTC(year, monthIndex, depart));
            const selectedReturnDate = new Date(Date.UTC(year, monthIndex, return_));
            if (isNaN(selectedDepartDate.getTime())) {
                throw new Error(`Ngày khởi hành không hợp lệ: ${depart}-${monthIndex + 1}-${year}`);
            }
            if (isNaN(selectedReturnDate.getTime())) {
                throw new Error(`Ngày về không hợp lệ: ${return_}-${monthIndex + 1}-${year}`);
            }
            if (selectedDepartDate < today) {
                alert("Ngày khởi hành không thể là ngày trong quá khứ.");
                return;
            }
            if (selectedReturnDate < selectedDepartDate) {
                alert("Ngày về không thể trước ngày khởi hành.");
                return;
            }
            const departDateISO = selectedDepartDate.toISOString();
            const returnDateISO = selectedReturnDate.toISOString();
            setDepartDate(formatDate(departDateISO));
            setReturnDate(formatDate(returnDateISO));
        } catch (error) {
            console.error('Lỗi trong handleDateSelection:', error.message);
            alert(error.message);
        }
    };

    const formatDate = (dateISO) => {
        const date = new Date(dateISO);
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const dayOfWeek = daysOfWeek[date.getUTCDay()];
        const monthName = months[date.getUTCMonth()];
        const day = date.getUTCDate();
        return `${dayOfWeek}, ${monthName} ${day}`;
    };

    const renderAirport = (airport, item) => (
        <TouchableOpacity
            key={`${item.id}-${airport.code}`}
            onPress={() => handleAirportSelect(airport, item)}
            style={styles.airportItem}
        >
            <Image
                source={require("../assets/images/flightIcon.png")}
                style={styles.airportIcon}
            />
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

    const renderSuggestion = ({ item, index }) => (
        <View key={`suggestion-${item.id}`} style={styles.suggestionContainer}>
            <TouchableOpacity
                onPress={() => handleSelectSuggestion(item)}
                style={styles.locationHeader}
            >
                <Image
                    source={
                        index === toSuggestions.length - 1
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
            </TouchableOpacity>
            {expandedItems[item.id] && item.airports?.map((airport) => (
                <View key={`airport-${item.id}-${airport.code}`}>
                    {renderAirport(airport, item)}
                </View>
            ))}
        </View>
    );

    const handleSavePassengerOptions = (passengers, selectedClass) => {
        setPassengerInfo(passengers);
        setCabinClass(selectedClass);
    };

    const handleSearchFlights = () => {
        if (!fromText || !toText || departDate === "Departure date" || returnDate === "Return date") {
            alert('Please fill in all required fields!');
            return;
        }
        const flightData = {
            from: fromText,
            to: toText,
            fromCode: fromCode,
            toCode: toCode,
            departDate: departDate,
            returnDate: returnDate,
            passengers: passengerInfo,
            cabinClass: cabinClass,
            ticketType: ticketType,
        };
        if (onClose) {
            onClose();
        }
        setTimeout(() => {
            navigation.navigate('FlightResults', flightData, initialName);
        }, 100);
    };

    const handleOneWay = () => {
        onClose();
        navigation.navigate('OneWay', { ticketType: 'One-way' });
    };

    const handleMultiCity = () => {
        onClose();
        navigation.navigate('MultiCity', { ticketType: 'Multi-city' });
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

                    <ScrollView style={{ width: '100%', height: 500 }}>
                        <View style={styles.navContainer}>
                            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('RoundTrip')}>
                                <Text style={{ fontSize: 17, fontWeight: "bold" }}>Round-trip</Text>
                                <View style={styles.line}></View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleOneWay}>
                                <Text style={{ fontSize: 17, fontWeight: "400", color: '#323842' }}>One-way</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleMultiCity}>
                                <Text style={{ fontSize: 17, fontWeight: "400", color: '#323842' }}>Multi-city</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={[styles.locationContainer, styles.locationContainer1]} onPress={() => { openModal(); setActiveField("from"); }}>
                            <Image source={require("../assets/images/takeOff.png")} style={styles.icon} />
                            <TextInput placeholder="From" style={styles.textInput} value={fromText} editable={false} placeholderTextColor={'#BCC1CA'} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.switchButton} onPress={handleSwitch}>
                            <Image source={require("../assets/images/switchIcon.png")} style={{ width: 40, height: 40 }} />
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.locationContainer, styles.locationContainer2]} onPress={() => { openModal(); setActiveField("to"); }}>
                            <Image source={require("../assets/images/Landing.png")} style={styles.icon} />
                            <TextInput placeholder="To" style={styles.textInput} value={toText} editable={false} placeholderTextColor={'#BCC1CA'} />
                        </TouchableOpacity>

                        <View style={styles.dateTimeContainer}>
                            <View style={styles.dateTimeItem}>
                                <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
                                    <Image source={require("../assets/images/calendar.png")} style={{ width: 30, height: 30, marginHorizontal: 10 }} />
                                </TouchableOpacity>
                                <TextInput
                                    style={[styles.textInput, { paddingLeft: 5 }]}
                                    placeholder="Depart date"
                                    value={departDate}
                                    editable={false}
                                    placeholderTextColor={'#BCC1CA'}
                                />
                            </View>
                            <View style={[styles.dateTimeItem, styles.dateTimeItem2]}>
                                <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
                                    <Image source={require("../assets/images/calendar.png")} style={{ width: 30, height: 30, marginHorizontal: 10 }} />
                                </TouchableOpacity>
                                <TextInput
                                    style={[styles.textInput, { paddingLeft: 5 }]}
                                    placeholder="Return date"
                                    value={returnDate}
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
                            <TouchableOpacity style={{ justifyContent: 'center', marginRight: 20 }} onPress={() => setPassengerOptionsVisible(true)}>
                                <Image source={require("../assets/images/arrowDown.png")} style={{ width: 25, height: 25 }} />
                            </TouchableOpacity>
                        </View>


                    </ScrollView>

                    <TouchableOpacity style={styles.btnSearchFlight} onPress={handleSearchFlights}>
                        <Text style={styles.textSearchflight}>Search flights</Text>
                    </TouchableOpacity>

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
                                        onChangeText={(text) => handleSearch(text, "from")}
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
                                        onChangeText={(text) => handleSearch(text, "to")}
                                    />
                                </View>
                            </View>

                            <FlatList
                                data={activeField === "from" ? filteredFromSuggestions : filteredToSuggestions}
                                renderItem={renderSuggestion}
                                keyExtractor={(item) => item.id}
                                style={[styles.suggestionList, { width: '100%', marginHorizontal: 20 }]}
                            />
                        </SafeAreaView>
                    </Modal>

                    <DatePickerModal
                        visible={datePickerVisible}
                        onClose={() => setDatePickerVisible(false)}
                        onSelectDates={(depart, return_, monthIndex, year) => {
                            handleDateSelection(depart, return_, monthIndex, year);
                            setDatePickerVisible(false);
                        }}
                    />

                    <PassengerOptionsModal
                        visible={passengerOptionsVisible}
                        onClose={() => setPassengerOptionsVisible(false)}
                        onSave={handleSavePassengerOptions}
                    />
                </View >
            </SafeAreaView >
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    headerContainer: { flexDirection: "row", justifyContent: 'center', alignItems: 'center', marginHorizontal: 20, position: 'relative' },
    cancelButton: { position: 'absolute', left: 0 },
    title: { fontSize: 23, fontWeight: "bold" },
    navContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 20, marginTop: 30 },
    navItem: { alignItems: 'center' },
    line: { borderBottomWidth: 3, borderBottomColor: "#323842", marginTop: 10, width: 110 },
    locationContainer: { flexDirection: "row", alignItems: "center", marginHorizontal: 20, height: 55, backgroundColor: '#f3f4f6', borderRadius: 12 },
    icon: { width: 30, height: 30, marginHorizontal: 15 },
    locationContainer1: { marginTop: 20 },
    locationContainer2: { marginTop: 5 },
    textInput: { fontSize: 17, fontWeight: "400", color: '#171A1F', width: '100%', alignItems: 'center' },
    switchButton: { position: 'absolute', right: 30, top: 123, zIndex: 1 },
    switchButtonModal: { position: 'absolute', right: 30, top: 35, zIndex: 1 },
    dateTimeContainer: { flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, marginTop: 30 },
    dateTimeItem: { flexDirection: 'row', width: '48%', height: 55, backgroundColor: '#f3f4f6', borderRadius: 8, alignItems: 'center' },
    dateTimeItem2: { marginLeft: 5 },
    containerPassenger: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, borderTopColor: '#f3f4f6', borderTopWidth: 2, borderBottomWidth: 2, borderBottomColor: '#f3f4f6', width: '100%', height: 50 },
    containerPassengerLeft: { flexDirection: 'row', alignItems: 'center' },
    btnSearchFlight: { position: 'absolute', bottom: 0, left: 0, right: 0, width: '90%', backgroundColor: '#2c46c3', borderRadius: 12, marginHorizontal: 20, height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 250, alignSelf: 'center' },
    textSearchflight: { fontSize: 20, fontWeight: "400", color: '#fff' },
    modalContainer: { flex: 1, backgroundColor: "#ffffff", justifyContent: "center", alignItems: "center", borderRadius: 20 },
    modalContent: { width: "100%", height: "95%", backgroundColor: "#fff", borderRadius: 10, padding: 20, alignItems: "center" },
    modalHeader: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#E5E7EB', width: '100%' },
    modalTitle: { fontSize: 18, fontWeight: "bold", textAlign: 'center', flex: 1 },
    modalSearchInput: { width: "100%", padding: 10, borderRadius: 8, height: 55, fontSize: 23 },
    activeInput: { borderColor: "#007bff" },
    renderSuggestion: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc", width: "120%", backgroundColor: 'red' },
    suggestionItem: { flexDirection: "row", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#eee" },
    suggestionTextContainer: { flexDirection: "row", justifyContent: "space-between" },
    suggestionCity: { fontSize: 16, fontWeight: "bold" },
    suggestionDetails: { color: "#888", fontSize: 14 },
    closeButton: { marginTop: 20 },
    closeButtonText: { color: "#007bff", fontSize: 16 },
    closeIcon: { width: 25, height: 25 },
    inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f3f4f6', borderRadius: 8, marginBottom: 8, paddingHorizontal: 16, marginHorizontal: 20 },
    inputIcon: { width: 24, height: 24, marginRight: 12 },
    searchInput: { flex: 1, fontSize: 16, color: '#111827', width: '100%', height: 50 },
    suggestionList: { flex: 1, width: '100%', marginHorizontal: 20 },
    suggestionContainer: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
    locationHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    locationIcon: { width: 35, height: 35, marginRight: 12 },
    locationDetails: { flex: 1 },
    cityCountryText: { fontSize: 16, fontWeight: '600', color: '#111827' },
    subtitleText: { fontSize: 14, color: '#6B7280', marginTop: 2 },
    airportItem: { flexDirection: 'row', alignItems: 'center', paddingLeft: 36, marginTop: 12 },
    airportIcon: { width: 35, height: 35, marginRight: 12 },
    airportDetails: { flex: 1 },
    airportNameContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    airportName: { fontSize: 16, color: '#111827' },
    airportCode: { fontSize: 16, color: '#111827', fontWeight: '500' },
    distanceText: { fontSize: 14, color: '#6B7280', marginTop: 2 },
    arrowIcon: { width: 30, height: 30 },
});
