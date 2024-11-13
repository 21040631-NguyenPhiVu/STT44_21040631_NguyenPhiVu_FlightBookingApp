import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, Dimensions, ScrollView } from 'react-native';

const PassengerOptionsModal = ({ visible, onClose, onSave }) => {
    const [passengers, setPassengers] = useState({
        adults: 0,
        children: 0,
        infants: 0
    });
    const [selectedClass, setSelectedClass] = useState('Economy');

    const cabinClasses = [
        'Economy',
        'Premium Economy',
        'Business',
        'First'
    ];

    const handlePassengerChange = (type, increment) => {
        setPassengers(prev => ({
            ...prev,
            [type]: Math.max(0, prev[type] + increment)
        }));
    };

    const handleSave = () => {
        onSave(passengers, selectedClass);
        onClose();
    };

    const PassengerCounter = ({ title, subtitle, value, type }) => (
        <View style={styles.counterContainer}>
            <View>
                <Text style={styles.counterTitle}>{title}</Text>
                <Text style={styles.counterSubtitle}>{subtitle}</Text>
            </View>
            <View style={styles.counterControls}>
                <TouchableOpacity
                    style={[
                        styles.counterButton,
                        value <= 0 && styles.counterButtonDisabled
                    ]}
                    onPress={() => handlePassengerChange(type, -1)}
                    disabled={value <= 0}
                >
                    <Image source={require('../assets/images/removeIcon.png')} style={[styles.counterButtonText, value <= 0 && styles.counterButtonTextDisabled]} />
                </TouchableOpacity>
                <Text style={styles.counterValue}>{value}</Text>
                <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => handlePassengerChange(type, 1)}
                >
                    <Image source={require('../assets/images/addIcon.png')} style={styles.counterButtonText} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={false}
        >
            <SafeAreaView style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Options</Text>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Image
                            source={require('../assets/images/Cancel.png')}
                            style={styles.closeIcon}
                        />
                    </TouchableOpacity>
                </View>

                <ScrollView style={{ width: '100%', height: 500 }}>
                    {/* Content */}
                    <View style={styles.content}>
                        {/* Traveller Section */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Traveller</Text>

                            <View style={styles.separator}></View>

                            <View style={styles.counterWrapper}>
                                <PassengerCounter
                                    title="Adults"
                                    subtitle="12+ years"
                                    value={passengers.adults}
                                    type="adults"
                                />
                            </View>

                            <View style={styles.separator}></View>

                            <View style={styles.counterWrapper}>
                                <PassengerCounter
                                    title="Children"
                                    subtitle="2-12 years"
                                    value={passengers.children}
                                    type="children"
                                />
                            </View>

                            <View style={styles.separator}></View>

                            <View style={styles.counterWrapper}>
                                <PassengerCounter
                                    title="Infants"
                                    subtitle="Under 2 years"
                                    value={passengers.infants}
                                    type="infants"
                                />
                            </View>

                            <View style={styles.separator}></View>
                        </View>

                        {/* Cabin Class Section */}
                        <View style={styles.section}>
                            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Cabin Class</Text>
                            {cabinClasses.map((cabinClass) => (
                                <TouchableOpacity
                                    key={cabinClass}
                                    style={styles.cabinClassItem}
                                    onPress={() => setSelectedClass(cabinClass)}
                                >
                                    <Text style={styles.cabinClassText}>{cabinClass}</Text>
                                    {selectedClass === cabinClass && (
                                        <Image
                                            source={require('../assets/images/checkIcon.png')}
                                            style={styles.checkIcon}
                                        />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <View style={styles.roundTripContainer}>
                        <Text style={styles.roundTripText}>Round-trip</Text>
                        <TouchableOpacity style={styles.doneButton} onPress={handleSave}>
                            <Text style={styles.doneButtonText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#171A1F',
    },
    closeButton: {
        position: 'absolute',
        right: 20,
    },
    closeIcon: {
        width: 24,
        height: 24,
    },
    content: {
        flex: 1,
    },
    section: {
        width: '100%',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#323842',
        marginBottom: 24,
        marginHorizontal: 20,
    },
    separator: {
        borderTopColor: '#f3f4f6',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderBottomColor: '#f3f4f6',
        width: '100%',
    },
    counterWrapper: {
        justifyContent: 'center',
        width: '100%',
        marginVertical: 16,
    },
    counterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    counterTitle: {
        fontSize: 18,
        color: '#323842',
        marginBottom: 4,
        marginHorizontal: 20,
    },
    counterSubtitle: {
        fontSize: 16,
        color: '#9095A0',
        marginHorizontal: 20,
    },
    counterControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
    },
    counterButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    counterButtonDisabled: {
        opacity: 0.5,
    },
    counterButtonText: {
        fontSize: 24,
        color: '#171A1F',
    },
    counterButtonTextDisabled: {
        color: '#6B7280',
    },
    counterValue: {
        fontSize: 20,
        fontWeight: '500',
        marginHorizontal: 16,
        minWidth: 24,
        textAlign: 'center',
        color: '#171A1F',
    },
    cabinClassItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderTopWidth: 1,         // Thêm borderTop
        borderBottomWidth: 1,      // Thêm borderBottom
        borderTopColor: '#f3f4f6', // Màu của borderTop
        borderBottomColor: '#f3f4f6', // Màu của borderBottom
    },
    cabinClassText: {
        fontSize: 18,
        color: '#323842',
        marginHorizontal: 20,
    },
    checkIcon: {
        width: 32,
        height: 32,
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        marginHorizontal: 20,
    },
    roundTripContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Đặt khoảng cách đều giữa các thành phần
        alignItems: 'center', // Canh giữa theo chiều dọc
        width: '100%',
    },
    roundTripText: {
        fontSize: 20,
        color: '#323842',
        flex: 1,
        fontWeight: '500',
    },
    doneButton: {
        backgroundColor: '#2C46C3',
        borderRadius: 12,
        paddingVertical: 25,
        alignItems: 'center',
        width: 170,
        height: 40,
        justifyContent: 'center',
    },
    doneButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
    },
});

export default PassengerOptionsModal;