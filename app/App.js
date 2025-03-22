import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QuestionnaireScreen from './screens/chatbot';
import HomeScreen from './screens/home';
import RoadmapDetail from './screens/roadmap';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import AppEntry from './AppEntry';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="AppEntry" component={AppEntry} />
          <Stack.Screen name="Questionnaire" component={QuestionnaireScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="RoadmapDetail" component={RoadmapDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
