import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Linking, TouchableOpacity } from 'react-native';
import { Text, Card, Modal, Portal, Button, Divider } from 'react-native-paper';

export default function RoadmapDetail({ route }) {
  const { roadmap } = route.params;

  const [selectedStep, setSelectedStep] = useState(null);

  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{roadmap.title}</Text>
      <Text style={styles.description}>{roadmap.description}</Text>

      <Text style={styles.techHeader}>🧪 Technologies You'll Learn:</Text>
      <View style={styles.techList}>
        {roadmap.technologies.map((tech, idx) => (
          <Text key={idx} style={styles.techItem}>• {tech}</Text>
        ))}
      </View>

      <Text style={styles.stepsHeader}>📌 Roadmap Steps:</Text>
      <FlatList
        data={roadmap.steps}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedStep(item)}>
            <Card style={styles.stepCard}>
              <Card.Content>
                <Text style={styles.stepTitle}>{item.title}</Text>
                <Text style={styles.stepDesc}>{item.description}</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
      />

      {/* Popup Modal */}
      <Portal>
        <Modal
          visible={!!selectedStep}
          onDismiss={() => setSelectedStep(null)}
          contentContainerStyle={styles.modal}
        >
          {selectedStep && (
            <>
              <Text style={styles.modalTitle}>{selectedStep.title}</Text>
              <Text style={styles.modalDesc}>{selectedStep.description}</Text>
              <Divider style={{ marginVertical: 12 }} />

              <Text style={styles.keywordsHeader}>🔑 Keywords:</Text>
              <View style={styles.keywordContainer}>
                {(selectedStep.keywords || []).map((kw, i) => (
                  <Text key={i} style={styles.keywordBadge}>
                    {kw}
                  </Text>
                ))}
              </View>

              <Text style={styles.linkHeader}>📚 Free Courses:</Text>
              {(selectedStep.freeCourses || []).map((link, i) => (
                <Button
                  key={i}
                  onPress={() => openLink(link.url)}
                  mode="text"
                  style={styles.linkButton}
                  labelStyle={styles.linkText}
                >
                  {link.label}
                </Button>
              ))}

              <Text style={styles.linkHeader}>💼 Paid Courses:</Text>
              {(selectedStep.paidCourses || []).map((link, i) => (
                <Button
                  key={i}
                  onPress={() => openLink(link.url)}
                  mode="text"
                  style={styles.linkButton}
                  labelStyle={styles.linkText}
                >
                  {link.label}
                </Button>
              ))}

              <Button
                mode="outlined"
                onPress={() => setSelectedStep(null)}
                style={{ marginTop: 16 }}
              >
                Close
              </Button>
            </>
          )}
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 16,
  },
  techHeader: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  techList: {
    marginBottom: 20,
  },
  techItem: {
    color: '#bbb',
    fontSize: 16,
    marginLeft: 8,
    marginBottom: 4,
  },
  stepsHeader: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  stepCard: {
    backgroundColor: '#1e1e1e',
    marginBottom: 12,
    borderRadius: 12,
    borderColor: '#333',
    borderWidth: 1,
  },
  stepTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  stepDesc: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 4,
  },
  modal: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    margin: 16,
    borderRadius: 12,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  modalDesc: {
    color: '#ccc',
    fontSize: 15,
  },
  linkHeader: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  linkButton: {
    alignItems: 'flex-start',
    paddingHorizontal: 0,
  },
  linkText: {
    color: '#BB86FC',
    textDecorationLine: 'underline',
  },
  keywordsHeader: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
  },
  keywordContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  keywordBadge: {
    backgroundColor: '#2c2c2e',
    color: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    fontSize: 14,
    marginRight: 8,
    marginBottom: 6,
  },
});
