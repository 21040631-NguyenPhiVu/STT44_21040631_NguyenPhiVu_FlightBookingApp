import { View, Text, Modal, TouchableOpacity, StyleSheet, SafeAreaView, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';

const OneWayDatePickerModal = ({ visible, onClose, onSelectDate }) => {
    const [selectedDepartDate, setSelectedDepartDate] = useState();
    const [currentMonth, setCurrentMonth] = useState('July');
    const [currentYear, setCurrentYear] = useState(2024);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [showYearPicker, setShowYearPicker] = useState(false);

    const handleYearSelect = (year) => {
        setCurrentYear(year);
        setShowYearPicker(false);
    };

    const getCalendarData = (month, year) => {
        const daysInMonth = new Date(year, months.indexOf(month) + 1, 0).getDate();
        const firstDayIndex = new Date(year, months.indexOf(month), 1).getDay();

        const weeks = [];
        let week = [];
        for (let i = 0; i < firstDayIndex; i++) {
            week.push('');
        }
        for (let i = 1; i <= daysInMonth; i++) {
            week.push(i.toString());
            if (week.length === 7) {
                weeks.push(week);
                week = [];
            }
        }
        if (week.length > 0) {
            weeks.push(week);
        }
        return weeks;
    };

    const handleDateSelection = (date, month, year) => {
        const currentDate = new Date();
        const selectedDate = new Date(year, months.indexOf(month), date);

        if (selectedDate >= new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())) {
            setSelectedDepartDate(parseInt(date));
            setCurrentMonth(month);
            setCurrentYear(year);
        }
    };

    const isDateSelected = (date, month) => {
        const numericDate = parseInt(date);
        return numericDate === selectedDepartDate && currentMonth === month;
    };

    const getDateButtonStyle = (date, month) => {
        if (!isNaN(parseInt(date))) {
            const currentDate = new Date();
            const selectedDate = new Date(currentYear, months.indexOf(month), parseInt(date));
            if (selectedDate < new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())) {
                return [styles.dateButton, styles.disabledDate];
            } else if (isDateSelected(date, month)) {
                return [styles.dateButton, styles.selectedDate];
            }
        }
        return styles.dateButton;
    };

    const renderCalendar = (month) => (
        <View style={styles.monthContainer}>
            <View style={styles.monthHeader}>
                <TouchableOpacity onPress={() => setShowYearPicker(true)}>
                    <Text style={styles.monthTitle}>{month} {currentYear}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.calendar}>
                {getCalendarData(month, currentYear).map((week, weekIndex) => (
                    <View key={weekIndex} style={styles.week}>
                        {week.map((day, dayIndex) => (
                            <TouchableOpacity
                                key={`${weekIndex}-${dayIndex}`}
                                style={getDateButtonStyle(day, month, currentYear)}
                                onPress={() => handleDateSelection(day, month, currentYear)}
                                disabled={day === '' || (parseInt(day) < new Date().getDate() && month === new Date().toLocaleString('default', { month: 'long' }) && currentYear === new Date().getFullYear())}
                            >
                                <Text style={[
                                    styles.dateText,
                                    isDateSelected(day, month, currentYear) && styles.selectedDateText,
                                    (day === '' || (parseInt(day) < new Date().getDate() && month === new Date().toLocaleString('default', { month: 'long' }) && currentYear === new Date().getFullYear())) && styles.disabledDateText
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

    const formatSelectedDate = (date, month) => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayIndex = new Date(currentYear, months.indexOf(month), date).getDay();
        return `${days[dayIndex]}, ${month} ${date}, ${currentYear}`;
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
                                {selectedDepartDate ? formatSelectedDate(selectedDepartDate, currentMonth) : 'Select date'}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.weekDaysHeader}>
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                            <Text key={index} style={styles.weekDayText}>{day}</Text>
                        ))}
                    </View>
                    <ScrollView style={styles.calendarContainer}>
                        {months.map(renderCalendar)}
                    </ScrollView>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>One-way</Text>
                        <TouchableOpacity
                            style={styles.doneButton}
                            onPress={() => {
                                if (selectedDepartDate) {
                                    onSelectDate(selectedDepartDate, months.indexOf(currentMonth), currentYear);
                                    onClose();
                                }
                            }}
                        >
                            <Text style={styles.doneButtonText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>

            {showYearPicker && (
                <Modal
                    visible={showYearPicker}
                    animationType="fade"
                    transparent={true}
                >
                    <View style={styles.yearPickerContainer}>
                        <View style={styles.yearPickerContent}>
                            <ScrollView>
                                {Array.from({ length: 30 }, (_, i) => currentYear - 15 + i).map((year) => (
                                    <TouchableOpacity
                                        key={year}
                                        style={styles.yearPickerItem}
                                        onPress={() => handleYearSelect(year)}
                                    >
                                        <Text style={styles.yearPickerText}>{year}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                            <TouchableOpacity
                                style={styles.closeYearPickerButton}
                                onPress={() => setShowYearPicker(false)}
                            >
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
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
    calendarContainer: {
        flex: 1,
    },
    monthContainer: {
        padding: 16,
    },
    monthHeader: {
        alignItems: 'center',
        marginBottom: 16,
    },
    monthHeaderText: {
        fontSize: 24,
        color: '#2C46C3',
    },
    monthTitle: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 16,
        marginTop: 25,
        textAlign: 'center',
        alignSelf: 'center',
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
    dateText: {
        fontSize: 16,
        color: '#323842',
    },
    showselectedDateText: {
        fontSize: 17,
        color: '#171A1F'
    },
    selectedDateText: {
        color: '#fff',
        fontSize: 18,
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
    yearPickerContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    yearPickerContent: {
        width: '80%',
        maxHeight: '60%',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
    },
    yearPickerItem: {
        paddingVertical: 12,
        alignItems: 'center',
    },
    yearPickerText: {
        fontSize: 18,
        color: '#323842',
    },
    closeYearPickerButton: {
        marginTop: 16,
        alignSelf: 'center',
        backgroundColor: '#2C46C3',
        padding: 10,
        borderRadius: 8,
    },
    disabledDate: {
        backgroundColor: '#F3F4F6',
    },
    disabledDateText: {
        color: '#9095A0',
    },
});

export default OneWayDatePickerModal;