import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, SafeAreaView } from 'react-native';

const SeatSelectionScreen = () => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../assets/images/arrowLeft.png')} style={{ width: 35, height: 35 }} />
                    </TouchableOpacity>
                    <Image source={require('../assets/images/ProcessBaggage.png')} style={{ width: 300, height: 35, resizeMode: 'contain' }} />
                </View>

                <Text style={styles.title}>Baggage</Text>

                <ScrollView style={{ width: '100%', height: 500 }}>
                    <View>
                        <View>
                            <View style={styles.separator} />
                            <Text style={styles.flightToText}>Cabin bags</Text>
                        </View>

                        <ScrollView style={{ width: '100%', height: 100 }}>
                            <View>
                                <View style={styles.flightItem}>
                                    <View style={styles.flightItemLeft}>
                                        <Image source={require('../assets/images/backPack.png')} style={{ width: 35, height: 35, resizeMode: 'contain', marginRight: 15 }} />
                                        <View>
                                            <Text style={styles.flightText}>Personal item only</Text>
                                            <Text style={styles.seatPrice}>Included per traveller</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity>
                                        <Text style={styles.selectedText}>Select</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.separator} />
                            </View>
                        </ScrollView>
                    </View>

                    <View>
                        <View>
                            <Text style={[styles.flightToText, { marginTop: 50, marginBottom: 25 }]}>Checked bags</Text>
                        </View>

                        <ScrollView style={{ width: '100%', height: 120 }}>
                            <View>
                                <View style={styles.flightItem}>
                                    <View style={styles.flightItemLeft}>
                                        <Image source={require('../assets/images/Luggage.png')} style={{ width: 35, height: 35, resizeMode: 'contain', marginRight: 15, }} />
                                        <View>
                                            <Text style={{ fontSize: 16 }}>1 checked bag (Max weight 22.1 lbs)</Text>
                                            <Text style={styles.seatPrice}>from $19.99</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity>
                                        <Text style={styles.selectedText}>Select</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.flightItem}>
                                    <View style={styles.flightItemLeft}>
                                        <Image source={require('../assets/images/Ban.png')} style={{ width: 35, height: 35, resizeMode: 'contain', marginRight: 15, }} />
                                        <View>
                                            <Text style={styles.flightText}>No checked bag</Text>
                                            <Text style={styles.seatPrice}>$00.00</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity>
                                        <Text style={styles.selectedText}>Select</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </View>

                    <Text style={[styles.flightToText, { marginTop: 30 }]}>Travel protection</Text>
                    <View style={styles.travelContainer}>
                        <View style={styles.travelContainerLeft}>
                            <Image source={require('../assets/images/protectionIcon.png')} style={{ width: 45, height: 45, resizeMode: 'contain', marginRight: 8 }} />
                            <View style={styles.travelItem}>
                                <Text style={{ fontSize: 16 }}>1 checked bag (Max weight 22.1 lbs)</Text>
                                <Text style={styles.seatPrice}>from $19.99</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.btnSelect}>
                            <Text style={styles.selectedText}>Select</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.containerProtection}>
                        <View style={styles.protectionItem}>
                            <Image source={require('../assets/images/checkProtection.png')} style={{ width: 25, height: 25, resizeMode: 'contain', marginRight: 15, }} />
                            <Text style={styles.protectionContent}>Laboris exercitation Lorem anim pariatur </Text>
                        </View>
                        <View style={styles.protectionItem}>
                            <Image source={require('../assets/images/checkProtection.png')} style={{ width: 25, height: 25, resizeMode: 'contain', marginRight: 15, }} />
                            <Text style={styles.protectionContent}>Laboris exercitation Lorem anim pariatur </Text>
                        </View>
                        <View style={styles.protectionItem}>
                            <Image source={require('../assets/images/checkProtection.png')} style={{ width: 25, height: 25, resizeMode: 'contain', marginRight: 15, }} />
                            <Text style={styles.protectionContent}>Laboris exercitation Lorem anim pariatur </Text>
                        </View>
                        <View style={styles.protectionItem}>
                            <Image source={require('../assets/images/checkProtection.png')} style={{ width: 25, height: 25, resizeMode: 'contain', marginRight: 15, }} />
                            <Text style={styles.protectionContent}>Laboris exercitation Lorem anim pariatur </Text>
                        </View>
                    </View>

                    <View style={[styles.travelContainer, { marginTop: 20, paddingBottom: 100 }]}>
                        <View style={styles.travelContainerLeft}>
                            <Image source={require('../assets/images/Ban.png')} style={{ width: 35, height: 35, resizeMode: 'contain', marginRight: 8 }} />
                            <View style={styles.travelItem}>
                                <Text style={styles.flightText}>No insurance</Text>
                                <Text style={styles.seatPrice}>$00.00</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.btnSelect}>
                            <Text style={styles.selectedText}>Select</Text>
                        </TouchableOpacity>
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
    flightItem: { flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    flightItemLeft: { flexDirection: 'row', alignItems: 'center' },
    flightText: { fontSize: 18, color: '#323842', fontWeight: 'normal' },
    seatPrice: { fontSize: 16, color: '#9095A0', marginTop: 10 },
    selectedText: { color: '#10626A', fontSize: 16, fontWeight: 'normal' },
    travelContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 },
    travelContainerLeft: { flexDirection: 'row', alignItems: 'center' },
    btnSelect: { justifyContent: 'center' },
    containerProtection: { width: '90%', backgroundColor: '#fff', height: 330, alignSelf: 'center', borderRadius: 8, marginTop: 10, borderColor: '#F3F4F6', borderWidth: 2 },
    protectionItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 10, marginBottom: 15 },
    protectionContent: { fontSize: 20, color: '#323842', fontWeight: 'normal' },

    footer: { position: 'absolute', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, height: 70, bottom: 0, left: 0, right: 0, backgroundColor: '#fff' },
    footerPrice: { fontSize: 28, fontWeight: 'bold' },
    footerPassenger: { color: '#9095A0', fontSize: 16, fontWeight: 'normal', marginTop: 5 },
    btnNext: { backgroundColor: '#2C46C3', paddingVertical: 13, paddingHorizontal: 50, borderRadius: 8 },
    btnText: { color: '#fff', fontSize: 16, fontWeight: '500' },

});

export default SeatSelectionScreen;
