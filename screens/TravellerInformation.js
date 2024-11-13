import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, SafeAreaView, TextInput } from 'react-native';

const SeatSelectionScreen = () => {

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
                            <Text style={styles.flightToText}>Traveller: 1 adult</Text>
                        </View>
                        <View>
                            <Text style={[styles.label, { marginTop: 20 }]}>First name</Text>
                            <TextInput style={styles.input} placeholder='First name' placeholderTextColor={'#BCC1CA'} />
                        </View>

                        <View style={styles.item}>
                            <Text style={styles.label}>Last name</Text>
                            <TextInput style={styles.input} placeholder='Last name' placeholderTextColor={'#BCC1CA'} />
                        </View>

                        <View style={styles.item}>
                            <Text style={styles.label}>Gender</Text>
                            <TextInput style={styles.input} placeholder='Select option' placeholderTextColor={'#BCC1CA'} />
                        </View>
                    </View>

                    <View>
                        <View>
                            <Text style={[styles.flightToText, { marginTop: 50, marginBottom: 25 }]}>Contact details</Text>
                        </View>

                        <View style={styles.item}>
                            <Text style={styles.label}>Contact email</Text>
                            <TextInput style={styles.input} placeholder='Your email' placeholderTextColor={'#BCC1CA'} />
                        </View>
                    </View>

                    <View>
                        <Text style={styles.label}>Contact phone</Text>
                        <View style={styles.phoneContainer}>
                            <TextInput style={styles.inputPhoneCode} placeholder='+07' placeholderTextColor={'#BCC1CA'} />
                            <TextInput style={styles.inputPhone} />
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <View style={styles.footerItemLeft}>
                        <Text style={styles.footerPrice}>$806</Text>
                        <Text style={styles.footerPassenger}>1 adult</Text>
                    </View>
                    <TouchableOpacity style={styles.btnNext}>
                        <Text style={styles.btnText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 },
    title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
    separator: { height: 2, backgroundColor: '#F3F4F6', marginVertical: 15, width: '100%', alignSelf: 'stretch' },
    flightToText: { fontSize: 18, color: '#323842', fontWeight: 'bold', marginVertical: 10, paddingHorizontal: 20 },
    label: { fontSize: 18, color: '#424955', fontWeight: 'bold', marginHorizontal: 20 },
    input: { height: 50, backgroundColor: '#ffffff', borderRadius: 8, marginVertical: 5, marginHorizontal: 20, borderColor: '#BCC1CA', borderWidth: 1, padding: 10, fontSize: 18 },
    item: { marginVertical: 10 },
    phoneContainer: { flexDirection: 'row', marginTop: 5 },
    inputPhoneCode: { fontSize: 18, height: 50, backgroundColor: '#ffffff', borderRadius: 8, marginVertical: 5, marginHorizontal: 20, borderColor: '#BCC1CA', borderWidth: 1, padding: 10, width: 100 },
    inputPhone: { fontSize: 18, height: 50, backgroundColor: '#ffffff', borderRadius: 8, marginVertical: 5, borderColor: '#BCC1CA', borderWidth: 1, padding: 10, width: 230 },

    footer: { position: 'absolute', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, height: 70, bottom: 0, left: 0, right: 0, backgroundColor: '#fff' },
    footerPrice: { fontSize: 28, fontWeight: 'bold' },
    footerPassenger: { color: '#9095A0', fontSize: 16, fontWeight: 'normal', marginTop: 5 },
    btnNext: { backgroundColor: '#2C46C3', paddingVertical: 13, paddingHorizontal: 50, borderRadius: 8 },
    btnText: { color: '#fff', fontSize: 16, fontWeight: '500' },

});

export default SeatSelectionScreen;
