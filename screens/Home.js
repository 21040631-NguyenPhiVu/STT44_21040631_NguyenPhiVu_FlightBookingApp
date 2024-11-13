import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, SafeAreaView, ScrollView } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function StartScreen() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.headerContainerLeft}>
                        <Image source={require('../assets/images/smallLogo.png')} style={styles.logo} />
                        <View style={styles.containerTitle}>
                            <Text style={styles.titleApp}>Explore flight</Text>
                            <Text style={styles.subTitileApp}>Welcome to flight booking</Text>
                        </View>
                    </View>
                    <View style={styles.avatar}>
                        <Text style={styles.name}>A</Text>
                    </View>
                </View>
                <ScrollView style={{ width: '100%', height: 500 }}>
                    <View style={styles.searchContainer}>
                        <Image source={require('../assets/images/Zoom.png')} style={styles.iconSearch} />
                        <TextInput
                            placeholder="Find a flight"
                            placeholderTextColor={'#9095A0'}
                            style={styles.input}
                        />
                    </View>

                    <Text style={{ fontWeight: 'bold', fontSize: 22, marginHorizontal: 20 }}>The best cities for you</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ marginHorizontal: 20, marginTop: 20, marginBottom: 40 }}
                    >
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('FlightList')}>
                                <Image source={require('../assets/images/Image3.png')} style={{ width: 250, height: 200, borderRadius: 12, marginRight: 17 }} />
                            </TouchableOpacity>
                            <Text style={{ fontWeight: 'bold', fontSize: 21, marginVertical: 10 }}>HongKong</Text>
                            <Text style={{ fontWeight: '400', fontSize: 18, color: '#9095A0' }}>from $33.00 to $38.00</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('FlightList')}>
                                <Image source={require('../assets/images/Image4.png')} style={{ width: 250, height: 200, borderRadius: 12, marginRight: 17 }} />
                            </TouchableOpacity>
                            <Text style={{ fontWeight: 'bold', fontSize: 21, marginVertical: 10 }}>San Antonio</Text>
                            <Text style={{ fontWeight: '400', fontSize: 18, color: '#9095A0' }}>from $48.00 to $53.00</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('FlightList')}>
                                <Image source={require('../assets/images/rome.jpg')} style={{ width: 250, height: 200, borderRadius: 12, marginRight: 17 }} />
                            </TouchableOpacity>
                            <Text style={{ fontWeight: 'bold', fontSize: 21, marginVertical: 10 }}>Rome</Text>
                            <Text style={{ fontWeight: '400', fontSize: 18, color: '#9095A0' }}>from $63.00 to $68.00</Text>
                        </View>
                    </ScrollView>

                    <Text style={{ fontWeight: 'bold', fontSize: 22, marginHorizontal: 20 }}>Explore Destination</Text>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ marginHorizontal: 20, marginTop: 20, marginBottom: 40 }}
                    >
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('FlightList')}>
                                <Image source={require('../assets/images/Image5.png')} style={{ width: 340, height: 200, borderRadius: 15, marginRight: 17, resizeMode: 'cover' }} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('FlightList')}>
                                <Image source={require('../assets/images/phuquoc.jpg')} style={{ width: 340, height: 200, borderRadius: 15, marginRight: 17, resizeMode: 'cover' }} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('FlightList')}>
                                <Image source={require('../assets/images/mocchau.jpg')} style={{ width: 340, height: 200, borderRadius: 15, marginRight: 17, resizeMode: 'cover' }} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('FlightList')}>
                                <Image source={require('../assets/images/tokyo.jpg')} style={{ width: 340, height: 200, borderRadius: 15, marginRight: 17, resizeMode: 'cover' }} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('FlightList')}>
                                <Image source={require('../assets/images/singapore.jpg')} style={{ width: 340, height: 200, borderRadius: 15, marginRight: 17, resizeMode: 'cover' }} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('FlightList')}>
                                <Image source={require('../assets/images/danang.jpg')} style={{ width: 340, height: 200, borderRadius: 15, marginRight: 17, resizeMode: 'cover' }} />
                            </TouchableOpacity>
                        </View>
                    </ScrollView>



                </ScrollView>
                <View style={styles.footer}>
                    <View style={styles.footerItem}>
                        <TouchableOpacity onPress={() => navigation.navigate('FlightList')} style={{ alignItems: 'center' }}>
                            <Image source={require('../assets/images/Home.png')} style={{ width: 30, height: 30, resizeMode: 'cover' }} />
                            <Text style={{ color: '#2C46C3', fontSize: 14 }}>Home</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.footerItem}>
                        <TouchableOpacity onPress={() => navigation.navigate('FlightList')} style={{ alignItems: 'center' }}>
                            <Image source={require('../assets/images/World.png')} style={{ width: 30, height: 30, resizeMode: 'cover' }} />
                            <Text style={{ color: '#9095A0', fontSize: 14 }}>Explore</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.footerItem}>
                        <TouchableOpacity onPress={() => navigation.navigate('FlightList')} style={{ alignItems: 'center' }}>
                            <Image source={require('../assets/images/Profile.png')} style={{ width: 30, height: 30, resizeMode: 'cover' }} />
                            <Text style={{ color: '#9095A0', fontSize: 14 }}>Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    headerContainerLeft: {
        flexDirection: "row",
    },
    logo: {
        width: 60,
        height: 60,
        borderRadius: 12,
    },
    containerTitle: {
        marginLeft: 15,
    },
    titleApp: {
        fontSize: 23,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subTitileApp: {
        fontSize: 15,
        color: "gray",
        fontWeight: '300',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: "#F06A6A",
        justifyContent: "center",
        alignItems: "center",
    },
    name: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "400",
    },
    searchContainer: {
        flexDirection: 'row',
        backgroundColor: '#f3f4f6',
        marginHorizontal: 20,
        marginVertical: 40,
        borderRadius: 12,
        height: 50,
    },
    iconSearch: {
        width: 30,
        height: 30,
        tintColor: '#9095A0',
        marginHorizontal: 15,
        alignSelf: 'center'
    },
    input: {
        paddingLeft: 10,
        borderRadius: 5,
        fontSize: 18,
        width: '100%'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 70,
    },
    footerItem: {
        alignItems: 'center',
    },
});
