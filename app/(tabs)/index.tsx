import React, { useState } from 'react';
import { Text, TextInput, View, Button, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

export default function Index() {
  const [peso, setPeso] = useState<string>('');
  const [altura, setAltura] = useState<string>('');
  const [resultado, setResultado] = useState<string>('');

  const calcularIMC = () => {
    const pesoNum = parseFloat(peso.replace(',', '.'));
    const alturaNum = parseFloat(altura.replace(',', '.'));

    if (!pesoNum || !alturaNum || alturaNum === 0) {
      setResultado('Por favor, insira valores válidos.');
      return;
    }

    const imc = pesoNum / (alturaNum * alturaNum);
    let classificacao = '';

    if (imc < 18.5) {
      classificacao = 'Abaixo do peso';
    } else if (imc < 24.9) {
      classificacao = 'Peso normal';
    } else if (imc < 29.9) {
      classificacao = 'Sobrepeso';
    } else if (imc < 34.9) {
      classificacao = 'Obesidade grau I';
    } else if (imc < 39.9) {
      classificacao = 'Obesidade grau II';
    } else {
      classificacao = 'Obesidade grau III';
    }

    setResultado(`Seu IMC é ${imc.toFixed(2)} e você está classificado como ${classificacao}.`);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text style={styles.title}>Calculadora de IMC</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu peso (kg)"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua altura (m)"
        keyboardType="numeric"
        value={altura}
        onChangeText={setAltura}
      />

      <Button title="Calcular" onPress={calcularIMC} />

      {resultado !== '' && <Text style={styles.resultado}>{resultado}</Text>}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f7ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#005577',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#005577',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  resultado: {
    marginTop: 20,
    fontSize: 18,
    color: '#003344',
    textAlign: 'center',
  },
});
