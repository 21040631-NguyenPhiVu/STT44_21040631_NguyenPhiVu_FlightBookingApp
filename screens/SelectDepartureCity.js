import React, { useState } from 'react';
import { View, Text, TextInput, Modal, Button, StyleSheet } from 'react-native';

export default function App() {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
                placeholder="Search"
                onFocus={() => setModalVisible(true)}
                style={{ borderWidth: 1, width: '80%', padding: 10 }}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Where to?</Text>
                    <TextInput placeholder="From" style={{ borderWidth: 1, marginVertical: 10, padding: 10, width: '100%' }} />
                    <TextInput placeholder="To" style={{ borderWidth: 1, padding: 10, width: '100%' }} />
                    <Button title="Close" onPress={() => setModalVisible(false)} />
                    {/* Các thành phần giao diện khác */}
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 'auto',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
});
