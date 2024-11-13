import { View, Text, Modal, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import React, { useState } from 'react';

const DatePickerModal = ({ visible, onClose, onSelectDates }) => {
    const [selectedDepartDate, setSelectedDepartDate] = useState(14);  // Default to Jul 14
    const [selectedReturnDate, setSelectedReturnDate] = useState(17);  // Default to Jul 17
    const [currentMonth, setCurrentMonth] = useState('July');

    const weeks = [
        ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        ['29', '30', '31', '1', '2', '3', '4'],
        ['5', '6', '7', '8', '9', '10', '11'],
        ['12', '13', '14', '15', '16', '17', '18'],
        ['19', '20', '21', '22', '23', '24', '25'],
        ['26', '27', '28', '1', '2', '3', '4'],
    ];

    const augustWeeks = [
        ['29', '30', '31', '1', '2', '3', '4'],
        ['5', '6', '7', '8', '9', '10', '11'],
        ['12', '13', '14', '15', '16', '17', '18'],
        ['19', '20', '21', '22', '23', '24', '25'],
    ];

    const handleDateSelection = (date) => {
        if (!selectedDepartDate || (selectedDepartDate && selectedReturnDate)) {
            // Start new selection
            setSelectedDepartDate(parseInt(date));
            setSelectedReturnDate(null);
        } else {
            // Complete the selection
            const numericDate = parseInt(date);
            if (numericDate > selectedDepartDate) {
                setSelectedReturnDate(numericDate);
            } else {
                setSelectedDepartDate(numericDate);
            }
        }
    };

    const isDateInRange = (date) => {
        const numericDate = parseInt(date);
        if (selectedDepartDate && selectedReturnDate) {
            return numericDate >= selectedDepartDate && numericDate <= selectedReturnDate;
        }
        return false;
    };

    const isDateSelected = (date) => {
        const numericDate = parseInt(date);
        return numericDate === selectedDepartDate || numericDate === selectedReturnDate;
    };

    const getDateButtonStyle = (date) => {
        if (!isNaN(parseInt(date))) {
            if (isDateSelected(date)) {
                return [styles.dateButton, styles.selectedDate];
            } else if (isDateInRange(date)) {
                return [styles.dateButton, styles.dateInRange];
            }
        }
        return styles.dateButton;
    };

    const renderCalendar = (monthWeeks, monthTitle) => (
        <View style={styles.monthContainer}>
            <Text style={styles.monthTitle}>{monthTitle}</Text>
            <View style={styles.calendar}>
                {monthWeeks.map((week, weekIndex) => (
                    <View key={weekIndex} style={styles.week}>
                        {week.map((day, dayIndex) => (
                            <TouchableOpacity
                                key={`${weekIndex}-${dayIndex}`}
                                style={getDateButtonStyle(day)}
                                onPress={() => handleDateSelection(day)}
                                disabled={isNaN(parseInt(day)) || parseInt(day) < 14} // Disable dates before Jul 14
                            >
                                <Text style={[
                                    styles.dateText,
                                    isDateSelected(day) && styles.selectedDateText,
                                    (isNaN(parseInt(day)) || parseInt(day) < 14) && styles.disabledDateText
                                ]}>
                                    {day}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </View>
        </View>
    );

    const formatSelectedDate = (date) => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayIndex = (date + 3) % 7; // Adjusting for July 2024 calendar
        return `${days[dayIndex]}, Jul ${date}`;
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
        >
            <SafeAreaView style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Date</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>×</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.selectedDatesContainer}>
                        <View style={styles.dateBox}>
                            <Image source={require('../assets/images/takeOff.png')} style={styles.flightIcon} />
                            <Text style={styles.showselectedDateText}>
                                {selectedDepartDate ? formatSelectedDate(selectedDepartDate) : 'Select date'}
                            </Text>
                        </View>
                        <View style={styles.dateBox}>
                            <Image source={require('../assets/images/Landing.png')} style={styles.flightIcon} />
                            <Text style={styles.showselectedDateText}>
                                {selectedReturnDate ? formatSelectedDate(selectedReturnDate) : 'Select date'}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.weekDaysHeader}>
                        {weeks[0].map((day, index) => (
                            <Text key={index} style={styles.weekDayText}>{day}</Text>
                        ))}
                    </View>

                    {renderCalendar(weeks.slice(1), 'July')}
                    {renderCalendar(augustWeeks, 'August')}

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Round-trip</Text>
                        <TouchableOpacity
                            style={styles.doneButton}
                            onPress={() => {
                                if (selectedDepartDate && selectedReturnDate) {
                                    onSelectDates(selectedDepartDate, selectedReturnDate);
                                    onClose();
                                }
                            }}
                        >
                            <Text style={styles.doneButtonText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    modalContent: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        position: 'relative',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
    },
    closeButton: {
        position: 'absolute',
        right: 16,
        top: 16,
    },
    closeButtonText: {
        fontSize: 24,
        color: '#666',
    },
    selectedDatesContainer: {
        flexDirection: 'row',
        padding: 16,
        justifyContent: 'space-between',
        backgroundColor: 'white',
    },
    dateBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        backgroundColor: '#f3f4f6',
        borderRadius: 8,
        marginHorizontal: 4,
        height: 50,
    },
    flightIcon: {
        marginRight: 8,
        width: 24,
        height: 24,
    },
    weekDaysHeader: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#9095A0',
    },
    weekDayText: {
        width: 40,
        textAlign: 'center',
        color: '#323842',
        fontSize: 16,
    },
    monthContainer: {
        padding: 16,
    },
    monthTitle: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 16,
        marginTop: 25,
        textAlign: 'center',
    },
    calendar: {
        marginBottom: 16,
    },
    week: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 8,
    },
    dateButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    selectedDate: {
        backgroundColor: '#2C46C3',
    },
    dateInRange: {
        backgroundColor: '#E8EAFB',
    },
    dateText: {
        fontSize: 16,
        color: '#323842',
    },
    showselectedDateText: {
        fontSize: 20,
        color: '#171A1F'
    },
    selectedDateText: {
        color: '#fff',
        fontSize: 18,
    },
    disabledDateText: {
        color: '#D1D5DB',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
    },
    footerText: {
        fontSize: 18,
        color: '#323842',
        fontWeight: '700',
    },
    doneButton: {
        backgroundColor: '#2C46C3',
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 8,
    },
    doneButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default DatePickerModal;