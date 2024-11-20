import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, SafeAreaView, TextInput, Picker, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TravellerInformation = ({ route, navigation }) => {
    const { flight, from, to, departDate, returnDate, passengers, cabinClass, ticketType } = route.params;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [phoneCode, setPhoneCode] = useState('');
    const [phone, setPhone] = useState('');

    const handleNext = async () => {
        if (!firstName || !lastName || !gender || !email || !phoneCode || !phone) {
            alert('Error', 'Please fill in all required fields');
            return;
        }

        const travelInfo = {
            firstName,
            lastName,
            gender,
            email,
            phoneCode,
            phone,
            flight,
            from,
            to,
            departDate,
            returnDate,
            passengers,
            cabinClass,
            ticketType
        };

        try {
            const response = await fetch('http://localhost:4000/api/travelinfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(travelInfo),
            });

            const data = await response.json();

            if (response.status === 201) {
                navigation.navigate('Baggage', { flight, from, to, departDate, returnDate, passengers, cabinClass, ticketType, firstName, lastName, gender, email, phone, phoneCode });
                alert('Travel information saved successfully');
            } else {
                alert('Error', data.message || 'Failed to save travel information');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred. Please try again.');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../assets/images/arrowLeft.png')} style={{ width: 35, height: 35 }} />
                    </TouchableOpacity>
                    <Image source={require('../assets/images/ProcessInfo.png')} style={{ width: 300, height: 35, resizeMode: 'contain' }} />
                </View>

                <Text style={styles.title}>Traveller Information</Text>

                <ScrollView style={{ width: '100%', height: 500, paddingBottom: 70 }}>
                    <View>
                        <View>
                            <View style={styles.separator} />
                            <Text style={styles.flightToText}>Traveller: {passengers.adults + passengers.children + passengers.infants} traveller{passengers.adults + passengers.children + passengers.infants > 1 ? 's' : ''}</Text>
                        </View>
                        <View>
                            <Text style={[styles.label, { marginTop: 20 }]}>First name</Text>
                            <TextInput style={styles.input} placeholder='First name' placeholderTextColor={'#BCC1CA'} value={firstName} onChangeText={setFirstName} />
                        </View>

                        <View style={styles.item}>
                            <Text style={styles.label}>Last name</Text>
                            <TextInput style={styles.input} placeholder='Last name' placeholderTextColor={'#BCC1CA'} value={lastName} onChangeText={setLastName} />
                        </View>

                        <View style={styles.item}>
                            <Text style={styles.label}>Gender</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={gender}
                                    style={styles.picker}
                                    onValueChange={(itemValue) => setGender(itemValue)}
                                >
                                    <Picker.Item label="Select option" value="" />
                                    <Picker.Item label="Male" value="Male" />
                                    <Picker.Item label="Female" value="Female" />
                                </Picker>
                            </View>
                        </View>
                    </View>

                    <View>
                        <View>
                            <Text style={[styles.flightToText, { marginTop: 50, marginBottom: 25 }]}>Contact details</Text>
                        </View>

                        <View style={styles.item}>
                            <Text style={styles.label}>Contact email</Text>
                            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder='Your email' placeholderTextColor={'#BCC1CA'} />
                        </View>
                    </View>

                    <View>
                        <Text style={styles.label}>Contact phone</Text>
                        <View style={styles.phoneContainer}>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={phoneCode}
                                    style={styles.picker}
                                    onValueChange={(itemValue) => setPhoneCode(itemValue)}
                                >
                                    <Picker.Item label="+01" value="+01" />
                                    <Picker.Item label="+07" value="+07" />
                                    <Picker.Item label="+84" value="+84" />
                                    {/* Add more phone codes as needed */}
                                </Picker>
                            </View>
                            <TextInput style={styles.inputPhone} value={phone} onChangeText={setPhone} />
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <View style={styles.footerItemLeft}>
                        <Text style={styles.footerPrice}>{flight.price}</Text>
                        <Text style={styles.footerPassenger}>{passengers.adults + passengers.children + passengers.infants} traveller{passengers.adults + passengers.children + passengers.infants > 1 ? 's' : ''}</Text>
                    </View>
                    <TouchableOpacity style={styles.btnNext} onPress={handleNext}>
                        <Text style={styles.btnText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};


export default TravellerInformation;