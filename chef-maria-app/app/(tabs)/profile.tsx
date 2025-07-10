import { View, Text, TextInput, StyleSheet, ScrollView, Image } from 'react-native';

export default function Profile() {
  return (
    <ScrollView style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Customer Profile</Text>

      <TextInput placeholder="First Name" style={styles.input} />
      <TextInput placeholder="Surname" style={styles.input} />
      <TextInput placeholder="Middle Name" style={styles.input} />
      <TextInput placeholder="Date of Birth (YYYY-MM-DD)" style={styles.input} />
      <TextInput placeholder="Home Address" style={styles.input} />
      <TextInput placeholder="Date of Registration" style={styles.input} />
      <TextInput placeholder="Developer ID (e.g. _24120111119)" style={styles.input} />
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
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 10,
  },
});
