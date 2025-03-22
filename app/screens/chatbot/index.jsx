import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Text,
  Button,
  Card,
  Checkbox,
  TextInput,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { ActivityIndicator } from 'react-native-paper';

const programmingLanguages = ["Python","JavaScript","Java","C#","C++","Go","Rust","TypeScript","Kotlin","Swift","Kotlin","Scala","PHP","Ruby"]

const languageFrameworks = {
  "Python": ["Django", "Flask", "FastAPI", "Pyramid", "Tornado"],
  "JavaScript": ["React", "Vue", "Angular", "Next.js", "Express", "Svelte", "Node.js"],
  "TypeScript": ["NestJS", "Next.js", "Angular", "Remix", "tRPC"],
  "Java": ["Spring", "Spring Boot", "Quarkus", "Micronaut", "JSF"],
  "C#": ["ASP.NET Core", "Blazor", "Unity", "Xamarin", "MAUI"],
  "C++": ["Qt", "Boost", "Poco", "JUCE"],
  "Go": ["Gin", "Echo", "Fiber", "Beego", "Revel"],
  "Rust": ["Rocket", "Actix", "Axum", "Yew", "Tide"],
  "PHP": ["Laravel", "Symfony", "CodeIgniter", "Zend Framework", "Yii"],
  "Ruby": ["Ruby on Rails", "Sinatra", "Hanami", "Padrino"],
  "Swift": ["SwiftUI", "UIKit", "Vapor", "Perfect"],
  "Kotlin": ["Ktor", "Spring", "Jetpack Compose", "Exposed"],
  "Scala": ["Play Framework", "Akka HTTP", "Lagom", "Scalatra"]
}

export default function QuestionnaireScreen() {
  const navigation = useNavigation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [stage, setStage] = useState('experience'); // experience | level | frameworks
  const [currentLanguage, setCurrentLanguage] = useState(programmingLanguages[0]);
  const [experienced, setExperienced] = useState([]);
  const [currentLevel, setCurrentLevel] = useState('');
  const [selectedFrameworks, setSelectedFrameworks] = useState({});
  const [finalStage, setFinalStage] = useState(false);
  const [learningGoal, setLearningGoal] = useState('');
  const [step, setStep] = useState('welcome'); // welcome | experience | level | frameworks | final
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleExperience = (hasExperience) => {
    if (hasExperience) {
      setStage('level');
    } else {
      moveToNextLanguage();
    }
  };

  const handleLevel = (level) => {
    setCurrentLevel(level);
    setStage('frameworks');
  };

  const toggleFramework = (framework) => {
    if (selectedFrameworks[framework]) {
      const updated = { ...selectedFrameworks };
      delete updated[framework];
      setSelectedFrameworks(updated);
    } else {
      setSelectedFrameworks({ ...selectedFrameworks, [framework]: '' });
    }
  };

  const setFrameworkLevel = (framework, level) => {
    setSelectedFrameworks({ ...selectedFrameworks, [framework]: level });
  };

  const handleFrameworkSubmit = () => {
    const frameworks = Object.entries(selectedFrameworks)
      .filter(([_, level]) => level)
      .map(([name, level]) => ({ name, level }));

    const updated = [
      ...experienced,
      {
        language: currentLanguage,
        level: currentLevel,
        frameworks,
      },
    ];

    setExperienced(updated);
    setSelectedFrameworks({});
    setCurrentLevel('');
    moveToNextLanguage();
  };

  const moveToNextLanguage = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < programmingLanguages.length) {
      const nextLang = programmingLanguages[nextIndex];
      setCurrentIndex(nextIndex);
      setCurrentLanguage(nextLang);
      setStage('experience');
    } else {
      setFinalStage(true);
    }
  };

  const frameworks = languageFrameworks[currentLanguage] || [];

  return (
    <View style={styles.container}>
      {loading ?
      <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#BB86FC" />
      <Text style={{ color: '#fff', marginTop: 12 }}>Generating your personalized roadmaps...</Text>
    </View>
    :
    <Card style={styles.card}>
        <Card.Content>
          {step === 'welcome' ? (
          <>
            <Text style={styles.question}>👋 Welcome! Let’s get to know you</Text>
            <TextInput
              mode="outlined"
              label="Name"
              value={name}
              onChangeText={setName}
              style={{ marginBottom: 12 }}
            />
            <TextInput
              mode="outlined"
              label="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              style={{ marginBottom: 20 }}
            />
            <Button
              mode="contained"
              onPress={() => setStep('main')}
              disabled={!name.trim() || !email.trim()}
            >
              Start Questionnaire
            </Button>
          </>
        ) : !finalStage ? (
            <>
              {stage === 'experience' && (
                <>
                  <Text style={styles.question}>
                    Do you have experience with{' '}
                    <Text style={styles.language}>{currentLanguage}</Text>?
                  </Text>
                  <View style={styles.buttonRow}>
                    <Button
                      mode="contained"
                      onPress={() => handleExperience(true)}
                      style={styles.button}
                    >
                      Yes
                    </Button>
                    <Button
                      mode="outlined"
                      onPress={() => handleExperience(false)}
                      style={styles.button}
                    >
                      No
                    </Button>
                  </View>
                </>
              )}

              {stage === 'level' && (
                <>
                  <Text style={styles.question}>
                    What is your level in{' '}
                    <Text style={styles.language}>{currentLanguage}</Text>?
                  </Text>
                  <View style={styles.buttonColumn}>
                    {['Entry', 'Intermediate', 'Advanced'].map((level) => (
                      <Button
                        key={level}
                        mode="contained"
                        onPress={() => handleLevel(level)}
                        style={styles.button}
                      >
                        {level}
                      </Button>
                    ))}
                  </View>
                </>
              )}

              {stage === 'frameworks' && (
                <>
                  <Text style={styles.question}>
                    Which frameworks have you used with{' '}
                    <Text style={styles.language}>{currentLanguage}</Text>?
                  </Text>

                  {frameworks.map((fw) => (
                    <View key={fw} style={{ marginBottom: 8 }}>
                      <Checkbox.Item
                        label={fw}
                        status={selectedFrameworks[fw] ? 'checked' : 'unchecked'}
                        onPress={() => toggleFramework(fw)}
                        labelStyle={{ color: '#fff' }}
                        color="#BB86FC"
                      />
                      {selectedFrameworks[fw] !== undefined && (
                        <View style={styles.submenuList}>
                          {['Entry', 'Intermediate', 'Advanced'].map((level) => (
                            <Button
                              key={level}
                              mode={selectedFrameworks[fw] === level ? 'contained' : 'text'}
                              onPress={() => setFrameworkLevel(fw, level)}
                              style={styles.listItem}
                              contentStyle={{ justifyContent: 'flex-start' }}
                              labelStyle={{ textAlign: 'left' }}
                            >
                              {level}
                            </Button>
                          ))}
                        </View>
                      )}
                    </View>
                  ))}

                  <Button
                    mode="contained"
                    onPress={handleFrameworkSubmit}
                    disabled={
                      Object.keys(selectedFrameworks).length > 0 &&
                      Object.values(selectedFrameworks).some((v) => v === '')
                    }
                    style={{ marginTop: 16 }}
                  >
                    Continue
                  </Button>
                </>
              )}
            </>
          ) : (
            <>
              <Text style={styles.question}>What do you want to learn?</Text>
              <TextInput
                mode="outlined"
                placeholder="e.g. I want to learn backend with Node.js"
                value={learningGoal}
                onChangeText={setLearningGoal}
                multiline
                style={{ marginBottom: 12 }}
              />
              <Button
                mode="contained"
                onPress={() => {
                  const userProfile = {
                    username: name.trim(),
                    email: email.trim(),
                    experiencedLanguages: experienced,
                    learningGoal: learningGoal.trim(),
                  };
                  navigation.replace('Home', { userProfile });
                }}
                disabled={!learningGoal.trim()}
              >
                Submit
              </Button>
            </>
          )}
        </Card.Content>
      </Card>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  question: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 24,
  },
  language: {
    fontWeight: 'bold',
    color: '#BB86FC',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom:12,
    flexWrap:"wrap"
  },
  buttonColumn: {
    flexDirection: 'column',
    gap: 12,
  },
  button: {
    marginVertical: 6,
    borderRadius: 12,
    width:"100%"
  },
  submenu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
    marginLeft: 8,
  },
  submenuButton: {
    marginRight: 8,
    marginBottom: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
});
