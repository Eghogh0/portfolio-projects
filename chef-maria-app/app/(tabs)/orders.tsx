import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';

export default function Orders() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Order Transaction</Text>

      <TextInput placeholder="Order Date (YYYY-MM-DD)" style={styles.input} />
      <TextInput placeholder="Menu Item Ordered" style={styles.input} />
      <TextInput placeholder="Special Instructions" style={styles.input} />
      <TextInput placeholder="Payment Method" style={styles.input} />
      <TextInput placeholder="Next Reservation Date" style={styles.input} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: 'white' },
  title: { fontSize: 24, color: 'red', fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: 'red',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
});
