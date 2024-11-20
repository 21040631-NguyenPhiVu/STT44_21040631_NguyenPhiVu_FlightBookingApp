import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Alert, Modal } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AlertModal from './AlertModal';

export default function LoginScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const handleLogin = async () => {
        if (!email || !password) {
            setModalMessage("Please fill in all required fields.");
            setModalVisible(true);
            return;
        }

        try {
            const response = await fetch('http://192.168.0.178:4000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (response.status === 200) {
                setModalMessage("Login successful");
                setModalVisible(true);
                const initialName = data.user.lastName.charAt(0).toUpperCase();
                navigation.navigate('Home', { user: data.user, initialName });
            } else {
                setModalMessage(data.message || "Login failed");
                setModalVisible(true);
            }
        } catch (error) {
            setModalMessage("An error occurred. Please try again.");
            setModalVisible(true);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/FlyMate.png')} style={styles.logo} />
            <View style={styles.title}>
                <TouchableOpacity style={styles.row}>
                    <Text style={{ fontSize: 21, color: "#0d308c", fontWeight: '400', alignSelf: 'center', paddingBottom: 10 }}>Login</Text>
                    <View style={{ borderBottomWidth: 4, borderBottomColor: "#0d308c", alignItems: 'center' }}></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.row} onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('RegisterScreen');
                }}>
                    <Text style={{ fontSize: 21, color: "#d8d8d8", fontWeight: '400', alignSelf: 'center', paddingBottom: 10 }}>Register</Text>
                    <View style={{ borderBottomWidth: 4, borderBottomColor: "#d8d8d8", alignItems: 'center' }}></View>
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <TextInput placeholder="Enter your email" placeholderTextColor="#d8d8d8" value={email} onChangeText={setEmail} style={styles.input} />
            </View>

            <View style={styles.inputContainer}>
                <TextInput placeholder="Enter your password" placeholderTextColor="#d8d8d8" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry={true} />
            </View>

            <TouchableOpacity style={styles.btnForgot}>
                <Text style={{ fontSize: 13, color: "#000", fontWeight: '400' }}>Forgot Password?</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: "#000", width: 100 }}></View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
                <Text style={{ fontSize: 21, color: "#fff", fontWeight: '400' }}>Login</Text>
            </TouchableOpacity>

            <View style={styles.horizontalLine}>
                <View style={{ borderBottomWidth: 1, borderBottomColor: "#d8d8d8", width: 100 }}></View>
                <Text style={{ fontSize: 18, color: "#d8d8d8", fontWeight: '400' }}>Continue with</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: "#d8d8d8", width: 100 }}></View>
            </View>

            <View style={styles.loginWith}>
                <TouchableOpacity>
                    <Image source={require('../assets/images/googleicon.png')} style={{ width: 40, height: 40, resizeMode: "contain" }} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../assets/images/appleicon.png')} style={{ width: 40, height: 40, resizeMode: "contain" }} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../assets/images/facebookicon.png')} style={{ width: 40, height: 40, resizeMode: "contain" }} />
                </TouchableOpacity>
            </View>

            <AlertModal
                visible={modalVisible}
                message={modalMessage}
                onClose={() => setModalVisible(false)}
            />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff",
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
        marginVertical: 20,
        borderBottomWidth: 3,
        borderBottomColor: "#d8d8d8",
    },
    input: {
        fontSize: 18,
        height: 45,
    },
    btnForgot: {
        width: "90%",
        justifyContent: "center",
        alignItems: 'flex-end'
    },
    btnLogin: {
        width: "90%",
        height: 45,
        backgroundColor: "#0d308c",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        marginVertical: 20,
    },
    horizontalLine: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        alignItems: "center",
        marginTop: 40,
        marginBottom: 20,
    },
    loginWith: {
        flexDirection: "row",
        width: "50%",
        justifyContent: "space-between",
    },
});