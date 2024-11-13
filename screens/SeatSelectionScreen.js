import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

const SeatSelectionScreen = () => {
    const [selectedSeat, setSelectedSeat] = useState(null);

    const seats = [
        ['A', 'B', 'C', 'rowHeader', 'D', 'E', 'F'], // Chèn rowHeader vào giữa C và D
        ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'], // Hàng ghế từ 01 đến 10
    ];

    const availableSeats = ['A01', 'A02', 'A03', 'B03', 'D03'];
    const selectedSeats = [selectedSeat];

    const isAvailable = (seat) => availableSeats.includes(seat);
    const isSelected = (seat) => selectedSeats.includes(seat);

    const handleSelectSeat = (seat) => {
        setSelectedSeat(seat === selectedSeat ? null : seat);
    };

    const renderSeat = (seat, row) => {
        if (seat === 'rowHeader') {
            return (
                <Text key={row} style={styles.rowHeader}>{row}</Text> // Cột số thứ tự hàng ghế
            );
        }

        return (
            <TouchableOpacity
                key={seat + row}
                style={[
                    styles.seat,
                    !isAvailable(`${seat}${row}`) && styles.unavailableSeat,
                    isSelected(`${seat}${row}`) && styles.selectedSeat,
                ]}
                onPress={() => isAvailable(`${seat}${row}`) && handleSelectSeat(`${seat}${row}`)}
            >
                {!isAvailable(`${seat}${row}`) && <Image source={require('../assets/images/Cancel.png')} style={{ width: 20, height: 20 }} />}
                {isSelected(`${seat}${row}`) && <Text style={styles.selectedText}>✓</Text>}
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/images/arrowLeft.png')} style={{ width: 35, height: 35 }} />
                </TouchableOpacity>
                <Text style={styles.title}>LCY - JFK</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.legend}>
                <View style={styles.legendItem}>
                    <View style={[styles.legendBox, styles.availableSeat]} />
                    <Text style={{ color: '#9095A0', fontSize: 16 }}>Available seat (from $5-$10)</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendBox, styles.unavailableSeat]}>
                        <Image source={require('../assets/images/Cancel.png')} style={{ width: 20, height: 20 }} />
                    </View>
                    <Text style={{ color: '#9095A0', fontSize: 16 }}>Unavailable seat</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendBox, styles.selectedSeat]} />
                    <Text style={{ color: '#9095A0', fontSize: 16 }}>Selected</Text>
                </View>
            </View>

            <View contentContainerStyle={styles.seatMap}>
                {/* Render cột tiêu đề A-F */}
                <View style={styles.row}>
                    {seats[0].map((seat) =>
                        seat === 'rowHeader' ? (
                            <View key={seat} style={styles.rowHeaderSpacer} />
                        ) : (
                            <Text key={seat} style={styles.columnHeader}>{seat}</Text>
                        )
                    )}
                </View>

                <ScrollView style={{ width: '100%', height: 350, paddingBottom: 50 }}>
                    {/* Render hàng ghế */}
                    {seats[1].map((row) => (
                        <View key={row} style={styles.row}>
                            {seats[0].map((seat) => renderSeat(seat, row))}
                        </View>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    {selectedSeat ? (
                        <>
                            Select seat 1 of 1
                            {'\n'}
                            <Text style={styles.selectedSeatText}>
                                Seat {selectedSeat} - $5.68
                            </Text>
                        </>
                    ) : (
                        <Text style={styles.noSeatText}>No seat selected</Text>
                    )}
                </Text>
                <TouchableOpacity style={styles.selectButton}>
                    <Text style={styles.selectButtonText}>Select</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    header: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
    title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', flex: 1 },
    separator: { height: 2, backgroundColor: '#F3F4F6', marginVertical: 20, width: '100%', alignSelf: 'stretch' },
    legend: { flexDirection: 'column', justifyContent: 'space-around', marginVertical: 20 },
    legendItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    legendBox: { width: 30, height: 30, marginRight: 15, borderRadius: 3, marginLeft: 12 },
    availableSeat: { backgroundColor: '#FFFFFF', borderColor: '#9095A0', borderWidth: 1 },
    unavailableSeat: { backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#f3f4f6' },
    selectedSeat: { backgroundColor: '#2C46C3' },
    seatMap: { flexDirection: 'column', alignItems: 'center' },
    row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginVertical: 5 },
    rowHeader: { width: 40, textAlign: 'center', color: '#565E6C', fontSize: 16, fontWeight: '500' },
    rowHeaderSpacer: { width: 30 }, // Đặt khoảng trống cho vị trí tiêu đề hàng
    columnHeader: { width: 40, textAlign: 'center', color: '#565E6C', fontSize: 16, fontWeight: '500' },
    seat: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginHorizontal: 5 },
    unavailableText: { color: '#999', fontWeight: 'bold' },
    selectedText: { color: '#fff', fontWeight: 'bold' },
    footer: { position: 'absolute', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingHorizontal: 20, backgroundColor: '#ffffff', height: 70, bottom: 0, left: 0, right: 0 },
    footerText: { fontSize: 18, fontWeight: 'bold' },
    selectButton: { backgroundColor: '#2C46C3', paddingVertical: 13, paddingHorizontal: 50, borderRadius: 8 },
    selectButtonText: { color: '#fff', fontSize: 16, fontWeight: '500' },
    selectedSeatText: {
        color: '#9095A0',
        fontSize: 17,
        fontWeight: 'normal',
    },
    noSeatText: {
        color: '#323842',
        fontSize: 20,
        fontWeight: '600',
    },
});

export default SeatSelectionScreen;
