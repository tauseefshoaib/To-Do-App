import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewComponent,
} from 'react-native';
import React from 'react';
import Homepage from './Homepage';
import LinearGradient from 'react-native-linear-gradient';
const LoginPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          fontSize: 45,
          fontWeight: 'bold',
          color: 'maroon',
          marginBottom: 50,
        }}>
        Login Form
      </Text>
      <View>
        <Text style={styles.headerText}>Email or Phone</Text>
        <TextInput style={styles.Textfield} />
        <Text style={styles.headerText}>Password</Text>
        <TextInput style={styles.Textfield} />
      </View>
      <TouchableOpacity onPress={() => <Homepage />}>
        <View style={styles.loginButton}>
          <Text style={{fontSize: 20, color: 'white'}}>LOGIN</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Textfield: {
    borderColor: 'grey',
    width: 350,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
  },
  headerText: {
    fontSize: 22,
    color: 'grey',
  },
  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
    height: 60,
    marginTop: 35,
    backgroundColor: 'maroon',
    borderRadius: 10,
  },
});
