import * as React from "react";
import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  ImageBackground,
} from "react-native";
import { db } from "../../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useProfile } from "../../context/ProfileProvider";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../utils/CONST_LAYOUT";
import journalcover from "./../../../assets/images/journalcover.png";
import COLORS from "../../utils/COLORS";
import MediText from "../../components/Meditext";
import { format } from "date-fns";

interface JournalEntriesScreenProps {}

const JournalEntriesScreen = (props: JournalEntriesScreenProps) => {
  const [entries, setEntries] = useState([]);
  const [expandedEntry, setExpandedEntry] = useState(null);
  const { profile } = useProfile();

  useEffect(() => {
    const fetchEntries = async () => {
      if (!profile || !profile.uid) return;

      const journalRef = collection(db, "users", profile.uid, "journal");
      const querySnapshot = await getDocs(journalRef);
      const entriesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEntries(entriesData);
    };

    fetchEntries();
  }, [profile]);

  const handleExpand = (id) => {
    setExpandedEntry(expandedEntry === id ? null : id);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "do MMMM, h:mm a");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={journalcover}
        style={styles.background}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <MediText heading bold center style={styles.headerText}>
            Your Entries
          </MediText>
          {entries.map((entry) => (
            <TouchableOpacity
              key={entry.id}
              style={styles.entryContainer}
              onPress={() => handleExpand(entry.id)}
            >
              <View style={styles.entryContent}>
                <Text style={styles.entryDate}>{formatDate(entry.date)}</Text>
                {expandedEntry === entry.id ? (
                  <Text style={styles.entryText}>{entry.content}</Text>
                ) : (
                  <Text numberOfLines={1} style={styles.entryText}>
                    {entry.content}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default JournalEntriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_COLOR,
  },
  background: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  headerText: {
    color: "#000",
    marginBottom: 20,
  },
  entryContainer: {
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: "transparent",
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 15,
    marginBottom: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  entryContent: {
    alignItems: "center",
  },
  entryDate: {
    color: "#000",
    marginBottom: 10,
  },
  entryText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
