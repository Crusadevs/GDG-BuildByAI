import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QuestionnaireScreen from './screens/chatbot';
import HomeScreen from './screens/home';
import RoadmapDetail from './screens/roadmap';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator>
          <Stack.Screen
            name="Questionnaire"
            component={QuestionnaireScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Home',
              headerStyle: { backgroundColor: '#121212' },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen
            name="RoadmapDetail"
            component={RoadmapDetail}
            options={{
              title: 'Roadmap',
              headerStyle: { backgroundColor: '#121212' },
              headerTintColor: '#fff',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
