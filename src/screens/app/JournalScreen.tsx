import * as React from "react";
import { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ImageBackground,
} from "react-native";
import MediText from "../../components/Meditext";
import MediButton from "../../components/Medibutton";
import { SCREEN_WIDTH } from "../../utils/CONST_LAYOUT";
import { db } from "../../../config/firebase";
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { useProfile } from "../../context/ProfileProvider";
import happyemo from "./../../../assets/emoticons/happy-emo.png";
import tiredemo from "./../../../assets/emoticons/tired-emo.png";
import sademo from "./../../../assets/emoticons/sad-emo.png";
import angryemo from "./../../../assets/emoticons/angry-emo.png";
import calmemo from "./../../../assets/emoticons/calm-emo.png";
import anxiousemo from "./../../../assets/emoticons/anxious-emo.png";
import historyIcon from "./../../../assets/emoticons/historyIcon.png";
import journalcover from "./../../../assets/images/journalcover.png";
import COLORS from "../../utils/COLORS";

interface JournalScreenProps {
  navigation: any;
}

const JournalScreen = ({ navigation }: JournalScreenProps) => {
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const { profile } = useProfile();

  const moods = [
    { name: "Happy", emoji: happyemo },
    { name: "Tired", emoji: tiredemo },
    { name: "Sad", emoji: sademo },
    { name: "Angry", emoji: angryemo },
    { name: "Calm", emoji: calmemo },
    { name: "Anxious", emoji: anxiousemo },
  ];

  const handleSubmit = async () => {
    if (!content || !mood) {
      Alert.alert("Please enter content and select a mood.");
      return;
    }

    if (!profile || !profile.uid) {
      Alert.alert("User profile not found. Please log in again.");
      return;
    }

    const date = new Date().toISOString();

    try {
      const journalRef = collection(db, "users", profile.uid, "journal");
      await addDoc(journalRef, {
        date,
        content,
        mood,
      });

      // Check if this is the first entry of the day
      const metricsRef = doc(db, `users/${profile.uid}/metrics/streak`);
      const metricsDoc = await getDoc(metricsRef);
      const lastEntryDate = metricsDoc.data()?.last_entry_date;
      const today = new Date().toISOString().split("T")[0];

      if (lastEntryDate !== today) {
        const newStreakCount = (metricsDoc.data()?.streak_count || 0) + 1;
        const longestStreak = Math.max(
          newStreakCount,
          metricsDoc.data()?.longest_streak || 0
        );

        await setDoc(
          metricsRef,
          {
            streak_count: newStreakCount,
            longest_streak: longestStreak,
            last_entry_date: today,
          },
          { merge: true }
        );
      }

      Alert.alert("Journal entry added successfully");
      setContent("");
      setMood("");
    } catch (error) {
      console.error("Error adding journal entry: ", error);
      Alert.alert("Error adding journal entry");
    }
  };

  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <MediText heading bold center style={styles.headerText}>
          Your Journal
        </MediText>
        <MediText center style={styles.subHeaderText}>
          How are you feeling today?
        </MediText>
        <View style={styles.moodContainer}>
          {moods.map((m) => (
            <TouchableOpacity
              key={m.name}
              style={[
                styles.moodButton,
                mood === m.name && styles.selectedMoodButton,
              ]}
              onPress={() => setMood(m.name)}
            >
              <Image source={m.emoji} style={styles.emoji} />
              <MediText>{m.name}</MediText>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.headerWithButton}>
          <MediText subtitle bold center style={styles.headerText}>
            Tell me about your day!!
          </MediText>
          <TouchableOpacity
            style={styles.historyButton}
            onPress={() => navigation.navigate("JournalEntriesScreen")}
          >
            <Image source={historyIcon} style={styles.historyIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <ImageBackground
            source={journalcover}
            style={styles.journalCover}
            resizeMode="cover"
          >
            <TextInput
              style={styles.textInput}
              placeholder="Write your journal entry here..."
              placeholderTextColor="#000"
              multiline
              value={content}
              onChangeText={setContent}
            />
          </ImageBackground>
        </View>
        <View style={styles.buttonContainer}>
          <MediButton onPress={handleSubmit}>Make Entry</MediButton>
        </View>
      </ScrollView>
    </View>
  );
};

export default JournalScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_COLOR,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  headerText: {
    marginBottom: 10,
  },
  subHeaderText: {
    marginBottom: 10,
  },
  moodContainer: {
    width: SCREEN_WIDTH * 0.85,
    backgroundColor: "rgba(44, 53, 86, 0.8)",
    borderRadius: 15,
    padding: 10,
    marginBottom: 50,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  moodButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2C3556",
    borderRadius: 10,
    padding: 10,
    margin: 5,
    width: 80,
    height: 80,
  },
  selectedMoodButton: {
    backgroundColor: "#4C5C76",
  },
  emoji: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  headerWithButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  inputContainer: {
    width: SCREEN_WIDTH * 0.85,
    height: 300,
    marginBottom: 20,
  },
  journalCover: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    width: "100%",
    height: "100%",
    padding: 10,
    color: "#000",
    backgroundColor: "transparent", // Make the text input background transparent
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: SCREEN_WIDTH * 0.85,
  },
  historyButton: {
    width: 40,
    height: 40,
    backgroundColor: "#2C3556",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 80,
  },

  historyIcon: {
    width: 30,
    height: 30,
  },
});
