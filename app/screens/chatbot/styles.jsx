import { StyleSheet } from "react-native";
import {theme} from "./index"

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
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
      fontSize: 16,
    },
    button: {
      marginTop: 12,
      borderRadius: 12,
    },
  });