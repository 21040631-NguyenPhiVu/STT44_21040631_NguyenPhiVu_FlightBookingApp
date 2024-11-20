import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, SafeAreaView, ScrollView, Modal } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function Payment({ route, navigation }) {
    const { flight, from, to, departDate, returnDate, passengers, cabinClass, totalPrice, ticketType, firstName, lastName, gender, email, phone, phoneCode } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cards, setCards] = useState([
        { type: 'MasterCard', number: '**** 9876' }
    ]);
    const [editIndex, setEditIndex] = useState(null);

    const handleAddCard = () => {
        if (cardNumber && cardHolder && expiryDate && cvv) {
            if (editIndex !== null) {
                const updatedCards = [...cards];
                updatedCards[editIndex] = { type: 'MasterCard', number: `**** ${cardNumber.slice(-4)}` };
                setCards(updatedCards);
                setEditIndex(null);
            } else {
                setCards([...cards, { type: 'MasterCard', number: `**** ${cardNumber.slice(-4)}` }]);
            }
            setModalVisible(false);
            setCardNumber('');
            setCardHolder('');
            setExpiryDate('');
            setCvv('');
        }
    };

    const handleEditCard = (index) => {
        const card = cards[index];
        setCardNumber(card.number.replace('**** ', ''));
        setCardHolder(card.type);
        setExpiryDate('');
        setCvv('');
        setEditIndex(index);
        setModalVisible(true);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                        <Image source={require("../assets/images/arrowLeft.png")} style={{ width: 45, height: 45 }} />
                    </TouchableOpacity>
                    <Image source={require("../assets/images/Process.png")} style={{ width: 300, height: 40, resizeMode: 'contain', marginLeft: 40 }} />
                </View>
                <Text style={{ alignItems: 'center', fontWeight: 'bold', fontSize: 22, marginVertical: 15, textAlign: 'center', color: '#323842' }}>Payment</Text>
                <View style={styles.separator}></View>
                <ScrollView style={{ width: '100%', height: 400 }}>
                    <Text style={styles.paymentText}>Payment method</Text>
                    <View style={[styles.cardContainer, { marginHorizontal: 20, marginVertical: 10 }]}>
                        {cards.map((card, index) => (
                            <View key={index}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require("../assets/images/radioChecked.png")} style={{ width: 25, height: 25, resizeMode: 'cover', marginLeft: 20 }} />
                                    <Image source={require("../assets/images/masterCardIcon.png")} style={{ width: 45, height: 45, resizeMode: 'contain', marginLeft: 15 }} />
                                    <Text style={styles.textTypeCard}>{card.type} {card.number}</Text>
                                    <TouchableOpacity style={styles.btnEdit} onPress={() => handleEditCard(index)}>
                                        <Text style={{ fontSize: 18, color: '#10626A' }}>Edit</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.separator}></View>
                            </View>
                        ))}
                        <TouchableOpacity style={styles.btnAddCard} onPress={() => setModalVisible(true)}>
                            <Text style={styles.textNewCard}>+ New card</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.travelText}>Traveller details</Text>

                    <View style={styles.infoContainer}>
                        <View style={styles.infoItemLeft}>
                            <Image source={require("../assets/images/Profile.png")} style={{ width: 25, height: 25, resizeMode: 'contain' }} />
                            <Text style={{ fontSize: 18, color: '#323842', marginLeft: 15 }}>{firstName} {lastName}</Text>
                        </View>
                        <View style={styles.infoItemRight}>
                            <Text style={{ fontSize: 18, color: '#9095A0', marginLeft: 15 }}>Adult </Text>
                            <View style={styles.circle}></View>
                            <Text style={{ fontSize: 18, color: '#9095A0', marginLeft: 15 }}>{gender}</Text>
                        </View>
                    </View>

                    <Text style={styles.contactText}>Contact details</Text>

                    <View style={styles.infoContainer}>
                        <View style={styles.infoItemLeft}>
                            <Image source={require("../assets/images/mailIcon.png")} style={{ width: 45, height: 245, resizeMode: 'contain' }} />
                            <Text style={{ fontSize: 18, color: '#323842', marginLeft: 15 }}>{email}</Text>
                        </View>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.infoItemLeft}>
                            <Image source={require("../assets/images/callIcon.png")} style={{ width: 45, height: 45, resizeMode: 'contain' }} />
                            <Text style={{ fontSize: 18, color: '#323842', marginLeft: 15 }}>({phoneCode}) {phone}</Text>
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <View>
                        <Text style={{ fontSize: 20, color: '#323842', marginLeft: 20, fontWeight: 'bold' }}>${totalPrice.toFixed(2)}</Text>
                        <Text style={{ fontSize: 18, color: '#9095A0', marginLeft: 20, }}>{passengers.adults + passengers.children + passengers.infants} traveller{passengers.adults + passengers.children + passengers.infants > 1 ? 's' : ''}</Text>
                    </View>
                    <TouchableOpacity style={styles.btnCheckout} onPress={() => navigation.navigate('BookingSuccessful', { flight, from, to, departDate, returnDate, passengers, cabinClass, totalPrice, ticketType, firstName, lastName, gender, email, phone, phoneCode })}>
                        <Text style={styles.textCheckout}>Checkout</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{editIndex !== null ? 'Edit Card' : 'Add New Card'}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Card Number"
                            value={cardNumber}
                            onChangeText={setCardNumber}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Card Holder Name"
                            value={cardHolder}
                            onChangeText={setCardHolder}
                        />
                        <View style={styles.row}>
                            <TextInput
                                style={[styles.input, styles.halfInput]}
                                placeholder="Expiry Date (MM/YY)"
                                value={expiryDate}
                                onChangeText={setExpiryDate}
                                keyboardType="numeric"
                            />
                            <TextInput
                                style={[styles.input, styles.halfInput]}
                                placeholder="CVV"
                                value={cvv}
                                onChangeText={setCvv}
                                keyboardType="numeric"
                                secureTextEntry
                            />
                        </View>
                        <TouchableOpacity style={styles.btnAddCard} onPress={handleAddCard}>
                            <Text style={styles.textNewCard}>{editIndex !== null ? 'Save Changes' : 'Add Card'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnCancel} onPress={() => setModalVisible(false)}>
                            <Text style={styles.textCancel}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
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
    separator: {
        height: 2,
        width: '100%',
        backgroundColor: '#f3f4f6',
        marginVertical: 10,
    },
    paymentText: {
        fontSize: 20,
        color: '#323842',
        marginHorizontal: 20,
        marginVertical: 5,
        fontWeight: 'bold',
    },
    cardContainer: {
        position: 'relative',
        borderWidth: 3,
        borderColor: '#f3f4f6',
        width: '90%',
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 6,
    },
    textTypeCard: { fontSize: 18, color: '#323842', marginLeft: 10 },
    btnEdit: {
        borderRadius: 8,
        position: 'absolute',
        right: 10,
    },
    btnAddCard: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    textNewCard: {
        fontSize: 18,
        color: '#10626A',
        textAlign: 'center',
    },
    travelText: {
        fontSize: 20,
        color: '#323842',
        marginHorizontal: 20,
        marginVertical: 10,
        fontWeight: 'bold',
    },
    infoContainer: {
        marginVertical: 5,
        borderWidth: 2,
        borderColor: '#f3f4f6',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: 70
    },
    infoItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    infoItemRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    circle: {
        width: 5,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: '#BCC1CA',
        marginLeft: 10,
    },
    contactText: {
        fontSize: 20,
        color: '#323842',
        marginHorizontal: 20,
        marginVertical: 10,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 10,
        borderTopColor: '#f3f4f6',
        borderTopWidth: 2,
    },
    btnCheckout: {
        backgroundColor: '#2C46C3',
        paddingHorizontal: 30,
        borderRadius: 8,
        width: 150,
        height: 45,
        justifyContent: 'center',
    },
    textCheckout: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    halfInput: {
        width: '48%',
    },
    btnCancel: {
        marginTop: 10,
    },
    textCancel: {
        fontSize: 18,
        color: '#FF0000',
        textAlign: 'center',
    },
});