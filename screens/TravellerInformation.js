import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, SafeAreaView, TextInput, Picker, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TravellerInformation = ({ route, navigation }) => {
    const { flight, from, to, departDate, returnDate, passengers, cabinClass, ticketType, initialName } = route.params;
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
        navigation.navigate('Baggage', {
            flight,
            from,
            to,
            departDate,
            returnDate,
            passengers,
            cabinClass,
            ticketType,
            firstName,
            lastName,
            gender,
            email,
            phone,
            phoneCode,
            initialName
        });
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

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 },
    title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
    separator: { height: 2, backgroundColor: '#F3F4F6', marginVertical: 15, width: '100%', alignSelf: 'stretch' },
    flightToText: { fontSize: 18, color: '#323842', fontWeight: 'bold', marginVertical: 10, paddingHorizontal: 20 },
    label: { fontSize: 16, color: '#323842', marginBottom: 5, paddingHorizontal: 20 },
    input: { paddingLeft: 10, borderRadius: 5, fontSize: 18, backgroundColor: '#f3f4f6', height: 50, marginHorizontal: 20 },
    item: { marginBottom: 20 },
    pickerContainer: { backgroundColor: '#ffffff', borderRadius: 5, marginHorizontal: 20, height: 40, borderWidth: 1, borderColor: '#BCC1CA', marginHorizontal: 20 },
    picker: { height: 40, width: '100%' },
    phoneContainer: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20 },
    inputPhone: { flex: 1, paddingLeft: 10, borderRadius: 5, fontSize: 18, backgroundColor: '#f3f4f6', height: 45 },
    footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, height: 70, backgroundColor: '#fff' },
    footerPrice: { fontSize: 28, fontWeight: 'bold' },
    footerPassenger: { color: '#9095A0', fontSize: 16, fontWeight: 'normal', marginTop: 5 },
    btnNext: { backgroundColor: '#2C46C3', paddingVertical: 13, paddingHorizontal: 50, borderRadius: 8 },
    btnText: { color: '#fff', fontSize: 16, fontWeight: '500' },
});
export default TravellerInformation;