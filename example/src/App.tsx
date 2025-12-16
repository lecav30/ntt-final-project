import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import {
  BankCard,
  ChatBox,
  Input,
  PickerComponent,
  PrimaryButton,
  SecondaryButton,
  SecureStorage,
  ServiceItem,
  useNetworkMonitor,
} from 'react-native-ntt-final-project';

export default function App() {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const connectionInfo = useNetworkMonitor();

  const handleSave = async () => {
    try {
      await SecureStorage.setItem(key, value);
      setResult(`Saved: ${key}`);
    } catch (error) {
      setResult(`Error: ${error}`);
    }
  };

  const handleLoad = async () => {
    try {
      const data = await SecureStorage.getItem(key);
      setResult(data ? `Value: ${data}` : 'Not found');
    } catch (error) {
      setResult(`Error: ${error}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <Text>Result: {JSON.stringify(connectionInfo)}</Text>

      <ChatBox message="Hola este es un mensaje" variant="assistant" />
      <ServiceItem serviceName="xd" onPress={() => {}} />
      <BankCard
        balance={3000}
        cardNumber="1923829392193293"
        cardHolder="JUAN ARONA"
        expirationDate="20/89"
      />

      <PickerComponent
        items={[
          {
            label: ' hola',
            value: ' 1',
          },
        ]}
      />

      <Text style={styles.title}>Secure Storage</Text>
      <Input placeholder="name" />
      <PrimaryButton text="hols" style={{ marginTop: 20 }} />
      <SecondaryButton text="hols" style={{ marginTop: 20 }} variant="accept" />
      <TextInput
        style={styles.input}
        placeholder="Key"
        value={key}
        onChangeText={setKey}
      />
      <TextInput
        style={styles.input}
        placeholder="Value"
        value={value}
        onChangeText={setValue}
        secureTextEntry
      />
      <Button title="Save" onPress={handleSave} />
      <Button title="Load" onPress={handleLoad} />
      <Text style={styles.result}>{result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F1F1',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  result: {
    marginTop: 20,
    fontSize: 16,
  },
});
