import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, Modal, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Profile() {
    const navigation = useNavigation();
    const route = useRoute();
    const { user, initialName } = route.params;

    const [modalVisible, setModalVisible] = useState(false);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [messageModalVisible, setMessageModalVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleLogout = () => {
        Alert.alert("Logged out", "You have been logged out.");
        navigation.navigate('LoginScreen');
    };

    const handleEditProfile = () => {
        setModalVisible(true);
    };

    const handleSaveProfile = async () => {
        if (newPassword !== confirmPassword) {
            setMessage('New password and confirm password do not match');
            setMessageType('error');
            setMessageModalVisible(true);
            return;
        }

        try {
            const response = await fetch(`http://localhost:4000/api/users/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, email, phone, password, newPassword }),
            });

            const data = await response.json();

            if (response.status === 200) {
                setMessage('Profile updated successfully');
                setMessageType('success');
                setMessageModalVisible(true);
                setModalVisible(false);
                user.firstName = firstName;
                user.lastName = lastName;
                user.email = email;
                user.phone = phone;
            } else {
                setMessage(data.message || 'Failed to update profile');
                setMessageType('error');
                setMessageModalVisible(true);
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
            setMessageType('error');
            setMessageModalVisible(true);
        }
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

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Edit Profile</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="First Name"
                            value={firstName}
                            onChangeText={setFirstName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Last Name"
                            value={lastName}
                            onChangeText={setLastName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Phone"
                            value={phone}
                            onChangeText={setPhone}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Current Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="New Password"
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonSave]}
                                onPress={handleSaveProfile}
                            >
                                <Text style={styles.textStyle}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={messageModalVisible}
                onRequestClose={() => {
                    setMessageModalVisible(!messageModalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.messageModalView}>
                        <Text style={styles.messageModalText}>{message}</Text>
                        <TouchableOpacity
                            style={[styles.button, messageType === 'success' ? styles.buttonSuccess : styles.buttonError]}
                            onPress={() => setMessageModalVisible(!messageModalVisible)}
                        >
                            <Text style={styles.textStyle}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 55,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
        fontSize: 18,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        width: '45%',
    },
    buttonClose: {
        backgroundColor: '#FF0000',
    },
    buttonSave: {
        backgroundColor: '#2C46C3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    messageModalView: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    messageModalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    buttonSuccess: {
        backgroundColor: '#2C46C3',
    },
    buttonError: {
        backgroundColor: '#FF0000',
    },
});