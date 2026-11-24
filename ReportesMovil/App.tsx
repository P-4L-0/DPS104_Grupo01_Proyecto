import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Header } from "./components/Header";
import IssueCard from "./components/IssueCard";

export default function App() {
  return (
    <ScrollView style={styles.ScrollView}
      contentContainerStyle={styles.ScrollContent}>
      <IssueCard />
      <IssueCard />
      <IssueCard />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  ScrollView: {
    flex: 1,
  },
  ScrollContent: {
    padding: 16,
    paddingBottom: 12
  },
});
