import React, { useState } from 'react';
import { SafeAreaView, Alert, Text, StyleSheet, Platform, StatusBar, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import api from '../services/api';

export default function Book({ navigation }) {
    const [date, setDate] = useState('');
    const id = navigation.getParam('id');

    async function handleSubmit() {
        const user = await AsyncStorage.getItem('user');

        await api.post(`/spots/${id}/bookings`, {
            date
        }, {
            headers: { user }
        });

        Alert.alert("Solicitação de reserva enviada!");

        navigation.navigate('List');
    }

    async function handleCancel() {
        navigation.navigate('List');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>Data de Interesse *</Text>
            <TextInput
                style={styles.input}
                placeholder="Qual data voce quer reservar?"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
            />

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: '#000',
        height: '100%'
    },
    label: {
        fontWeight: '700',
        color: '#fff',
        marginBottom: 8,
        marginTop: 20
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 16,
        color: '#fdfdfd',
        marginBottom: 20,
        borderRadius: 2
    },
    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
    cancelButton: {
        backgroundColor: '#ccc',
        marginTop: 10
    },
});