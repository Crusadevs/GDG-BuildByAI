import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Provider as PaperProvider,
  Text,
  Button,
  Checkbox,
  RadioButton,
  TextInput,
  DefaultTheme,
  configureFonts,
} from 'react-native-paper';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';


const fontConfig = {
  default: {
    regular: {
      fontFamily: 'Inter_400Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Inter_600SemiBold',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Inter_400Regular',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Inter_400Regular',
      fontWeight: 'normal',
    },
  },
};

const theme = {
  ...DefaultTheme,
  dark: true,
  fonts: configureFonts(fontConfig),
  colors: {
    ...DefaultTheme.colors,
    background: '#121212',
    surface: '#1e1e1e',
    primary: '#BB86FC',
    text: '#ffffff',
    placeholder: '#aaaaaa',
  },
};

export default function QuestionnaireScreen() {
  const [currentStep, setCurrentStep] = useState(0);

  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState([]);
  const [answer3, setAnswer3] = useState([]);
  const [answer4, setAnswer4] = useState('');

  const navigator = useNavigation();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) return <AppLoading />;

  const handleMultiSelect = (value, answer, setAnswer) => {
    if (answer.includes(value)) {
      setAnswer(answer.filter((item) => item !== value));
    } else {
      setAnswer([...answer, value]);
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      const finalAnswers = {
        favoriteLanguage: answer1,
        learningTopics: answer2,
        techInterests: answer3,
        personalGoal: answer4,
      };
      console.log('User Answers:', finalAnswers);
      navigator.replace('Home', { userAnswers: finalAnswers });
    }
  };

  return (
    <PaperProvider theme={theme}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.header}>Welcome! Let’s get to know you</Text>

          {currentStep === 0 && (
            <View style={styles.card}>
              <Text style={styles.question}>1. What’s your favorite language?</Text>
              <RadioButton.Group onValueChange={setAnswer1} value={answer1}>
                {['JavaScript', 'Python', 'Rust'].map((lang) => (
                  <RadioButton.Item
                    key={lang}
                    label={lang}
                    value={lang}
                    labelStyle={styles.radioLabel}
                    color={theme.colors.primary}
                  />
                ))}
              </RadioButton.Group>
            </View>
          )}

          {currentStep === 1 && (
            <View style={styles.card}>
              <Text style={styles.question}>2. What topics are you learning? (Select all that apply)</Text>
              {['Web Dev', 'Mobile Dev', 'AI', 'Cloud', 'DevOps'].map((topic) => (
                <Checkbox.Item
                  key={topic}
                  label={topic}
                  status={answer2.includes(topic) ? 'checked' : 'unchecked'}
                  onPress={() => handleMultiSelect(topic, answer2, setAnswer2)}
                  labelStyle={styles.checkboxLabel}
                  color={theme.colors.primary}
                />
              ))}
            </View>
          )}

          {currentStep === 2 && (
            <View style={styles.card}>
              <Text style={styles.question}>3. What technologies are you curious about? (Select all)</Text>
              {['Blockchain', 'AR/VR', 'IoT', 'Cybersecurity'].map((tech) => (
                <Checkbox.Item
                  key={tech}
                  label={tech}
                  status={answer3.includes(tech) ? 'checked' : 'unchecked'}
                  onPress={() => handleMultiSelect(tech, answer3, setAnswer3)}
                  labelStyle={styles.checkboxLabel}
                  color={theme.colors.primary}
                />
              ))}
            </View>
          )}

          {currentStep === 3 && (
            <View style={styles.card}>
              <Text style={styles.question}>4. What’s your personal goal with coding?</Text>
              <TextInput
                mode="outlined"
                placeholder="Type your answer..."
                value={answer4}
                onChangeText={setAnswer4}
                style={styles.input}
                multiline
              />
            </View>
          )}

          <Button
            mode="contained"
            onPress={handleNext}
            style={styles.button}
            disabled={
              (currentStep === 0 && !answer1) ||
              (currentStep === 3 && !answer4.trim())
            }
          >
            {currentStep < 3 ? 'Next' : 'Submit'}
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    marginTop:Constants.statusBarHeight
  },
  content: {
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontFamily: 'Inter_600SemiBold',
    color: '#fff',
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2c2c2e',
  },
  question: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#fff',
    marginBottom: 12,
  },
  radioLabel: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#fff',
  },
  checkboxLabel: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#fff',
  },
  input: {
    backgroundColor: theme.colors.surface,
    color:"#fff",
    fontSize: 16,
  },
  button: {
    marginTop: 12,
    borderRadius: 12,
  },
});
