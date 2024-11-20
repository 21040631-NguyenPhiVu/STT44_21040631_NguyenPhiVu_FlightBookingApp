import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Profile() {
    const navigation = useNavigation();
    const route = useRoute();
    const { user, initialName } = route.params;

    const handleLogout = () => {
        Alert.alert("Logged out", "You have been logged out.");
        navigation.navigate('LoginScreen');
    };

    const handleEditProfile = () => {
        Alert.alert("Edit Profile", "Edit profile functionality to be implemented.");
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/images/arrowLeft.png')} style={styles.arrowLeft} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile</Text>
            </View>
            <View style={styles.avatarContainer}>
                <TouchableOpacity>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{initialName}</Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.userName}>{user.firstName} {user.lastName}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Email:</Text>
                <Text style={styles.infoText}>{user.email}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Phone:</Text>
                <Text style={styles.infoText}>{user.phone}</Text>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    arrowLeft: {
        width: 30,
        height: 30,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    avatarContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#2C46C3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontSize: 40,
        color: '#fff',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    infoLabel: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    infoText: {
        fontSize: 18,
    },
    editButton: {
        backgroundColor: '#2C46C3',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    editButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    logoutButton: {
        backgroundColor: '#FF0000',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});