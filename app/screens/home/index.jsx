import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Text,
  Card,
} from 'react-native-paper';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';

const allRoadmaps = [
    {
      id: '1',
      title: 'Frontend Developer Path',
      description: 'Learn to build beautiful and functional web interfaces.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'React'],
      steps: [
        {
          id: '1',
          title: 'Intro to HTML',
          description: 'Learn the building blocks of web pages.',
          keywords: ['HTML', 'Elements', 'Tags'],
          paidCourses: [
            {
              label: 'HTML & CSS: Web Development on Udemy',
              url: 'https://www.udemy.com/course/web-design-for-beginners-real-world-coding-in-html-css/',
            },
          ],
        },
        {
          id: '2',
          title: 'Mastering CSS',
          description: 'Style and layout your websites.',
          keywords: ['CSS', 'Flexbox', 'Layout', 'Styling'],
          paidCourses: [
            {
              label: 'Advanced CSS and Sass on Udemy',
              url: 'https://www.udemy.com/course/advanced-css-and-sass/',
            },
          ],
        },
        {
          id: '3',
          title: 'JavaScript Basics',
          description: 'Add interactivity with JS.',
          keywords: ['JavaScript', 'Variables', 'Functions', 'DOM'],
          paidCourses: [
            {
              label: 'JavaScript - The Complete Guide on Udemy',
              url: 'https://www.udemy.com/course/javascript-the-complete-guide-2020-beginner-advanced/',
            },
          ],
        },
        {
          id: '4',
          title: 'React Fundamentals',
          description: 'Build component-based UIs.',
          keywords: ['React', 'Components', 'JSX', 'Props', 'State'],
          paidCourses: [
            {
              label: 'React - The Complete Guide on Udemy',
              url: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/',
            },
          ],
        },
      ],
    },
    {
      id: '2',
      title: 'Backend with Node.js',
      description: 'Build powerful APIs and backend systems using JavaScript.',
      technologies: ['Node.js', 'Express', 'MongoDB'],
      steps: [
        {
          id: '1',
          title: 'Node.js Introduction',
          description: 'Understand the runtime and environment.',
          keywords: ['Node.js', 'V8 Engine', 'Non-blocking I/O'],
          paidCourses: [
            {
              label: 'Node.js Developer Course on Udemy',
              url: 'https://www.udemy.com/course/the-complete-nodejs-developer-course-2/',
            },
          ],
        },
        {
          id: '2',
          title: 'REST APIs with Express',
          description: 'Create APIs and route logic.',
          keywords: ['Express', 'REST API', 'Routing', 'Middleware'],
          paidCourses: [
            {
              label: 'RESTful API with Node.js & Express on Udemy',
              url: 'https://www.udemy.com/course/restful-api-with-nodejs-express-mongodb/',
            },
          ],
        },
        {
          id: '3',
          title: 'Databases with MongoDB',
          description: 'Connect, read, write to MongoDB.',
          keywords: ['MongoDB', 'CRUD', 'NoSQL', 'Mongoose'],
          paidCourses: [
            {
              label: 'MongoDB - The Complete Developer’s Guide on Udemy',
              url: 'https://www.udemy.com/course/mongodb-the-complete-developers-guide/',
            },
          ],
        },
      ],
    },
    {
      id: '3',
      title: 'AI/ML Beginner Guide',
      description: 'Get started with Machine Learning and basic AI concepts.',
      technologies: ['Python', 'Numpy', 'Scikit-Learn'],
      steps: [
        {
          id: '1',
          title: 'Python for ML',
          description: 'Brush up Python essentials.',
          keywords: ['Python', 'Syntax', 'Loops', 'Functions'],
          paidCourses: [
            {
              label: 'Complete Python Bootcamp on Udemy',
              url: 'https://www.udemy.com/course/complete-python-bootcamp/',
            },
          ],
        },
        {
          id: '2',
          title: 'Data Analysis with Numpy',
          description: 'Process and understand data.',
          keywords: ['Numpy', 'Arrays', 'Data Analysis', 'Math Operations'],
          paidCourses: [
            {
              label: 'Data Analysis with Python & Pandas on Udemy',
              url: 'https://www.udemy.com/course/data-analysis-with-pandas/',
            },
          ],
        },
        {
          id: '3',
          title: 'First ML Model',
          description: 'Train a classifier with Scikit-Learn.',
          keywords: ['Machine Learning', 'Scikit-Learn', 'Model Training', 'Classification'],
          paidCourses: [
            {
              label: 'Machine Learning A-Z on Udemy',
              url: 'https://www.udemy.com/course/machinelearning/',
            },
          ],
        },
      ],
    },
    {
      id: '4',
      title: 'Mobile App with React Native',
      description: 'Create cross-platform mobile apps using React Native.',
      technologies: ['React Native', 'Expo', 'AsyncStorage'],
      steps: [
        {
          id: '1',
          title: 'React Native Basics',
          description: 'Understand the structure and core components.',
          keywords: ['React Native', 'Components', 'View', 'Text', 'StyleSheet'],
          paidCourses: [
            {
              label: 'React Native - The Practical Guide on Udemy',
              url: 'https://www.udemy.com/course/react-native-the-practical-guide/',
            },
          ],
        },
        {
          id: '2',
          title: 'Building UI with Expo',
          description: 'Design beautiful layouts.',
          keywords: ['Expo', 'UI Design', 'Flexbox', 'Layout'],
          paidCourses: [
            {
              label: 'The Complete React Native + Hooks Course on Udemy',
              url: 'https://www.udemy.com/course/the-complete-react-native-and-redux-course/',
            },
          ],
        },
        {
          id: '3',
          title: 'Navigation & Storage',
          description: 'Add screen flow and local data.',
          keywords: ['React Navigation', 'AsyncStorage', 'Routing', 'State Persistence'],
          paidCourses: [
            {
              label: 'React Native Advanced Concepts on Udemy',
              url: 'https://www.udemy.com/course/react-native-advanced/',
            },
          ],
        },
      ],
    },
  ];
  
  

export default function HomeScreen({ route }) {
  const navigation = useNavigation();
  const { userProfile } = route.params;

  const { experiencedLanguages,username,email } = userProfile;

  const recommendedRoadmaps = allRoadmaps.slice(0, 3); // top 3

  const handlePress = (roadmap) => {
    navigation.navigate('RoadmapDetail', { roadmap });
  };

  const renderRoadmap = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <Card style={styles.roadmapCard}>
        <Card.Content>
          <Text style={styles.roadmapTitle}>{item.title}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>👋 Welcome back!</Text>
      </View>

      <Card style={styles.profileCard}>
        <Card.Content>
          <Text style={styles.text}>👤 {username}</Text>
          <Text style={styles.text}>📧 {email}</Text>
          <Text style={styles.text}>🧠 Experience: {experiencedLanguages.map(lang => (lang.language + " "))}</Text>
        </Card.Content>
      </Card>

      {/* Recommended Roadmaps */}
      <Text style={styles.sectionTitle}>🌟 Recommended Roadmaps</Text>
      <FlatList
        data={recommendedRoadmaps}
        keyExtractor={(item) => item.id}
        renderItem={renderRoadmap}
        scrollEnabled={false}
      />

      {/* All Roadmaps */}
      <Text style={styles.sectionTitle}>📚 All Roadmaps</Text>
      <FlatList
        data={allRoadmaps}
        keyExtractor={(item) => item.id}
        renderItem={renderRoadmap}
        scrollEnabled={false}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    padding: 16,
    flex: 1,
  },
  header: {
    marginTop: Constants.statusBarHeight,
    marginBottom: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
  },
  profileCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2c2c2e',
    marginBottom: 24,
  },
  text: {
    color: '#ffffff',
    marginBottom: 4,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    marginBottom: 12,
    fontWeight: '600',
  },
  roadmapCard: {
    backgroundColor: '#1e1e1e',
    marginBottom: 12,
    borderRadius: 12,
    borderColor: '#333',
    borderWidth: 1,
  },
  roadmapTitle: {
    color: '#fff',
    fontSize: 16,
  },
});

