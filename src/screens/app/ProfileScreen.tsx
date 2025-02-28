import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import HeaderImage from "../../components/HeaderImage";
import { db } from "../../../config/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  setDoc,
} from "firebase/firestore";
import { useProfile } from "../../context/ProfileProvider";
import { format, differenceInDays, isSameDay, subDays } from "date-fns";
import flameemo from "./../../../assets/emoticons/flames.png";
import COLORS from "../../utils/COLORS";
import profileimage from "./../../../assets/images/LS_1 1.png";
import { SCREEN_WIDTH } from "../../utils/CONST_LAYOUT";
import { signOut } from "firebase/auth";
import { auth } from "../../../config/firebase";
import Calendar from "../../components/Calendar";

const ProfileScreen = () => {
  const { profile } = useProfile();
  const [journalEntries, setJournalEntries] = useState([]);
  const [streakCount, setStreakCount] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [tracksCompleted, setTracksCompleted] = useState(0);
  const [totalMeditationTime, setTotalMeditationTime] = useState(0);
  const [completedTracks, setCompletedTracks] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (!profile || !profile.uid) return;

    const journalRef = collection(db, "users", profile.uid, "journal");
    const q = query(journalRef, orderBy("date", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const entriesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJournalEntries(entriesData);

      // Calculate streak count
      if (entriesData.length > 0) {
        const now = new Date();
        let streak = 1;
        let longestStreak = 1;

        for (let i = 1; i < entriesData.length; i++) {
          const currentEntryDate = new Date(entriesData[i].date);
          const previousEntryDate = new Date(entriesData[i - 1].date);

          if (isSameDay(currentEntryDate, subDays(previousEntryDate, 1))) {
            streak++;
            if (streak > longestStreak) {
              longestStreak = streak;
            }
          } else if (
            differenceInDays(currentEntryDate, previousEntryDate) > 1
          ) {
            streak = 1;
          }
        }

        const lastEntryDate = new Date(entriesData[0].date);
        if (differenceInDays(now, lastEntryDate) > 1) {
          streak = 1;
        }

        setStreakCount(streak);
        setLongestStreak(longestStreak);

        const metricsRef = doc(db, `users/${profile.uid}/metrics/streak`);
        setDoc(
          metricsRef,
          { streak_count: streak, longest_streak: longestStreak },
          { merge: true }
        );
      }
    });

    const metricsRef = doc(db, `users/${profile.uid}/metrics/streak`);
    const unsubscribeMetrics = onSnapshot(metricsRef, async (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setTracksCompleted(data.tracks_completed);
        setTotalMeditationTime(data.total_meditation_time);
        setCompletedTracks(data.completed_tracks || []);
      }
    });

    return () => {
      unsubscribe();
      unsubscribeMetrics();
    };
  }, [profile]);

  const handleDatePress = (date) => {
    const entry = journalEntries.find(
      (entry) =>
        format(new Date(entry.date), "yyyy-MM-dd") ===
        format(date, "yyyy-MM-dd")
    );
    if (entry) {
      setSelectedMood(entry.mood);
      setModalVisible(true);
    }
  };

  const handleLogout = () => {
    signOut(auth).catch((error) => {
      console.error("Error signing out: ", error);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <HeaderImage image={profileimage} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.streakContainer}>
          <View style={styles.streakCircle}>
            <Image source={flameemo} style={styles.streakIcon} />
            <Text style={styles.streakText}>{streakCount}</Text>
          </View>
        </View>
        <Calendar
          journalEntries={journalEntries}
          handleDatePress={handleDatePress}
        />
        <View style={styles.metricsContainer}>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Longest Streak</Text>
            <Text style={styles.metricValue}>{longestStreak}</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Tracks Completed</Text>
            <Text style={styles.metricValue}>{tracksCompleted}</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Total Meditation Time</Text>
            <Text style={styles.metricValue}>{totalMeditationTime} min</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>You felt {selectedMood}</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_COLOR,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
  },
  streakContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  streakCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.SURFACE_COLOR,
    justifyContent: "center",
    alignItems: "center",
  },
  streakIcon: {
    width: 50,
    height: 50,
  },
  streakText: {
    color: COLORS.TEXT_COLOR,
    fontWeight: "bold",
    fontSize: 20,
    position: "absolute",
    bottom: 10,
  },
  metricsContainer: {
    width: SCREEN_WIDTH * 0.9,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  metricBox: {
    width: "30%",
    backgroundColor: COLORS.SURFACE_COLOR,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  metricLabel: {
    color: COLORS.TEXT_COLOR,
    fontWeight: "bold",
    marginBottom: 5,
  },
  metricValue: {
    color: COLORS.TEXT_COLOR,
    fontWeight: "bold",
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: COLORS.PRIMARY_COLOR,
    borderRadius: 5,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: COLORS.SURFACE_COLOR,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    color: COLORS.TEXT_COLOR,
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    padding: 10,
    backgroundColor: COLORS.PRIMARY_COLOR,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
