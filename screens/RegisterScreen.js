import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AlertModal from './AlertModal';

export default function RegisterScreen() {
    const navigation = useNavigation();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setModalMessage("Passwords do not match");
            setModalVisible(true);
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    gender,
                    email,
                    phone: mobile,
                    password,
                }),
            });

            const data = await response.json();

            if (response.status === 201) {
                setModalMessage("User registered successfully");
                setModalVisible(true);
                navigation.navigate('LoginScreen');
            } else {
                setModalMessage(data.message || "Registration failed");
                setModalVisible(true);
            }
        } catch (error) {
            setModalMessage("An error occurred. Please try again.");
            setModalVisible(true);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <Image source={require('../assets/images/FlyMate.png')} style={styles.logo} />
                <View style={styles.title}>
                    <TouchableOpacity style={styles.row} onPress={() => {
                        setModalVisible(false);
                        navigation.navigate('LoginScreen');
                    }}>
                        <Text style={{ fontSize: 21, color: "#d8d8d8", fontWeight: '400', alignSelf: 'center', paddingBottom: 10 }}>Login</Text>
                        <View style={{ borderBottomWidth: 4, borderBottomColor: "#d8d8d8", alignItems: 'center' }}></View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row}>
                        <Text style={{ fontSize: 21, color: "#0d308c", fontWeight: '400', alignSelf: 'center', paddingBottom: 10 }}>Register</Text>
                        <View style={{ borderBottomWidth: 4, borderBottomColor: "#0d308c", alignItems: 'center' }}></View>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput placeholder="Enter your first name" placeholderTextColor="#d8d8d8" value={firstName} onChangeText={setFirstName} style={styles.input} />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput placeholder="Enter your last name" placeholderTextColor="#d8d8d8" value={lastName} onChangeText={setLastName} style={styles.input} />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput placeholder="Enter your gender" placeholderTextColor="#d8d8d8" value={gender} onChangeText={setGender} style={styles.input} />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput placeholder="Enter your email" placeholderTextColor="#d8d8d8" value={email} onChangeText={setEmail} style={styles.input} />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput placeholder="Enter your Mobile No." placeholderTextColor="#d8d8d8" value={mobile} onChangeText={setMobile} style={styles.input} />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput placeholder="Enter your password" placeholderTextColor="#d8d8d8" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry={true} />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput placeholder="Confirm password" placeholderTextColor="#d8d8d8" value={confirmPassword} onChangeText={setConfirmPassword} style={styles.input} secureTextEntry={true} />
                </View>

                <TouchableOpacity style={styles.btnSignup} onPress={handleRegister}>
                    <Text style={{ fontSize: 21, color: "#fff", fontWeight: '400' }}>Register</Text>
                </TouchableOpacity>
            </ScrollView>

            <AlertModal
                visible={modalVisible}
                message={modalMessage}
                onClose={() => setModalVisible(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: "center",
        paddingVertical: 20,
        width: "100%",
        height: 500
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: "contain",
    },
    title: {
        flexDirection: "row",
        paddingHorizontal: 20,
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
    },
    row: {
        justifyContent: "center",
        width: "50%",
    },
    inputContainer: {
        width: "90%",
        paddingVertical: 5,
        marginVertical: 10,
        borderBottomWidth: 3,
        borderBottomColor: "#d8d8d8",
    },
    input: {
        fontSize: 18,
        height: 45,
    },
    btnSignup: {
        width: "90%",
        height: 45,
        backgroundColor: "#0d308c",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        marginVertical: 10,
    },
});