import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, SafeAreaView, ScrollView, Modal, FlatList } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { StatusBar } from "react-native";

export default function RoundTrip() {
    const navigation = useNavigation();

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
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require("../assets/images/radioChecked.png")} style={{ width: 25, height: 25, resizeMode: 'cover', marginLeft: 20 }} />
                            <Image source={require("../assets/images/masterCardIcon.png")} style={{ width: 45, height: 45, resizeMode: 'contain', marginLeft: 15 }} />
                            <Text style={styles.textTypeCard}>MasterCard **** 9876</Text>
                            <TouchableOpacity style={styles.btnEdit}>
                                <Text style={{ fontSize: 18, color: '#10626A' }}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.separator}></View>
                        <TouchableOpacity style={styles.btnAddCard}>
                            <Text style={styles.textNewCard}>+ New card</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.travelText}>Traveller details</Text>

                    <View style={styles.infoContainer}>
                        <View style={styles.infoItemLeft}>
                            <Image source={require("../assets/images/Profile.png")} style={{ width: 25, height: 25, resizeMode: 'contain' }} />
                            <Text style={{ fontSize: 18, color: '#323842', marginLeft: 15 }}>Pedro Moreno</Text>
                        </View>
                        <View style={styles.infoItemRight}>
                            <Text style={{ fontSize: 18, color: '#9095A0', marginLeft: 15 }}>Adult </Text>
                            <View style={styles.circle}></View>
                            <Text style={{ fontSize: 18, color: '#9095A0', marginLeft: 15 }}>Male</Text>
                        </View>
                    </View>

                    <Text style={styles.contactText}>Contact details</Text>

                    <View style={styles.infoContainer}>
                        <View style={styles.infoItemLeft}>
                            <Image source={require("../assets/images/mailIcon.png")} style={{ width: 45, height: 245, resizeMode: 'contain' }} />
                            <Text style={{ fontSize: 18, color: '#323842', marginLeft: 15 }}>pedromoreno@gmail.com</Text>
                        </View>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.infoItemLeft}>
                            <Image source={require("../assets/images/callIcon.png")} style={{ width: 45, height: 45, resizeMode: 'contain' }} />
                            <Text style={{ fontSize: 18, color: '#323842', marginLeft: 15 }}>(208) 567-8209</Text>
                        </View>
                    </View>


                </ScrollView>

                <View style={styles.footer}>
                    <View>
                        <Text style={{ fontSize: 20, color: '#323842', marginLeft: 20, fontWeight: 'bold' }}>$811.56</Text>
                        <Text style={{ fontSize: 18, color: '#9095A0', marginLeft: 20, }}>1 adult</Text>
                    </View>
                    <TouchableOpacity style={styles.btnCheckout}>
                        <Text style={styles.textCheckout}>Checkout</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
        backgroundColor: '#fff', // Đảm bảo container có nền trắng
        shadowColor: '#000', // Màu của bóng
        shadowOffset: { width: 0, height: 4 }, // Vị trí bóng đổ
        shadowOpacity: 0.1, // Độ mờ của bóng
        shadowRadius: 6, // Kích thước bóng đổ
        elevation: 6, // Dùng cho Android để tạo bóng
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
    }
});
