import React, { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { CheckBox } from '@rneui/themed';
import { SafeAreaView } from 'react-native';

const App = () => {
    const Stops = [
        'Any stops',
        '1 stop or nonstop',
        'Nonstop only',
    ];
    const [selectedStop, setSelectedStop] = useState(null);

    const Airlines = [
        'Select all',
        'SkyHaven',
        'EcoWings',
    ];
    const [selectedAirlines, setSelectedAirlines] = useState([]);

    // Hàm để xử lý toggle checkbox cho từng hãng hàng không
    const handleAirlineToggle = (airline) => {
        if (selectedAirlines.includes(airline)) {
            setSelectedAirlines(selectedAirlines.filter((item) => item !== airline));
        } else {
            setSelectedAirlines([...selectedAirlines, airline]);
        }
    };

    const clearAllSelections = () => {
        setSelectedStop(null);
        setSelectedAirlines([]);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../assets/images/Cancel.png')} style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>
                    <View style={styles.headerRight}>
                        <Text style={styles.title}>Sorts & Filters</Text>
                    </View>
                </View>

                <ScrollView style={{ width: '100%', height: 500 }}>
                    <View>
                        <Text style={styles.label}>Sort by</Text>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.input} placeholder="Best" placeholderTextColor={'#171A1F'} />
                        </View>
                    </View>

                    <View style={styles.stopContainer}>
                        <Text style={styles.stopsText}>Stop</Text>
                        {Stops.map((stop) => (
                            <TouchableOpacity
                                key={stop}
                                style={styles.stopItem}
                                onPress={() => setSelectedStop(stop)}
                            >
                                <Text style={styles.stopText}>{stop}</Text>
                                {selectedStop === stop && (
                                    <Image
                                        source={require('../assets/images/checkIcon.png')}
                                        style={styles.checkIcon}
                                    />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.stopContainer}>
                        <Text style={styles.stopsText}>Airlines</Text>
                        {Airlines.map((airline) => (
                            <View key={airline} style={styles.stopItem}>
                                <Text style={styles.stopText}>{airline}</Text>
                                <CheckBox
                                    checked={selectedAirlines.includes(airline)}
                                    onPress={() => handleAirlineToggle(airline)}
                                    iconType="material-community"
                                    checkedIcon="checkbox-marked"
                                    uncheckedIcon="checkbox-blank-outline"
                                    checkedColor="#10626A"
                                    containerStyle={styles.checkbox}
                                />
                            </View>
                        ))}
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity onPress={clearAllSelections}>
                        <Text style={styles.clearText}>Clear all</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.showButton}>
                        <Text style={styles.showButtonText}>Show 20 of 30</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        height: 60,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#323842',
    },
    headerRight: {
        flex: 1,
        alignItems: 'center',
    },
    sortContainer: {
        marginTop: 20,
    },
    label: {
        fontSize: 21,
        color: '#323842',
        fontWeight: 'bold',
        marginBottom: 10,
        paddingHorizontal: 20,
        marginTop: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    input: {
        flex: 1,
        height: 50,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        paddingHorizontal: 20,
        borderColor: '#171A1F',
        borderWidth: 1
    },
    stopContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    stopsText: {
        fontSize: 21,
        color: '#323842',
        fontWeight: 'bold',
    },
    separator: {
        backgroundColor: 'red',
        marginVertical: 10,
        width: '100%',
        height: 2,
    },
    stopItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        height: 50,
        marginTop: 10,
    },
    stopText: {
        fontSize: 16,
        color: '#323842',
    },
    checkIcon: {
        width: 40,
        height: 40,
    },
    checkbox: {
        padding: 0,
        margin: 0,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        paddingHorizontal: 20,
    },
    clearText: {
        fontSize: 20,
        color: '#9095A0',
        fontWeight: 'bold',
    },
    showButton: {
        backgroundColor: '#2C46C3',
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    showButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default App;
