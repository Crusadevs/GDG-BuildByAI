import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { ActivityIndicator, Text } from 'react-native-paper';
import QuestionnaireScreen from './screens/chatbot';
import HomeScreen from './screens/home';

export default function AppEntry({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [initialScreen, setInitialScreen] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const user_id = await SecureStore.getItemAsync('user_id');
      const username = await SecureStore.getItemAsync('username');
      const email = await SecureStore.getItemAsync('email');

      if (user_id && username && email) {
        setInitialScreen(() => () => <HomeScreen route={{ params: { userProfile: { name: username, email } } }} />);
      } else {
        setInitialScreen(() => QuestionnaireScreen);
      }

      setLoading(false);
    };

    checkUser();
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#BB86FC" />
        <Text style={{ color: '#fff', marginTop: 10 }}>Checking user...</Text>
      </View>
    );
  }

  const InitialComponent = initialScreen;
  return <InitialComponent />;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
