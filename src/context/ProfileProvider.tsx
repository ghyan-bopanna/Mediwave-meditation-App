import { onAuthStateChanged } from "firebase/auth";
import React, { useState, createContext, useContext, useEffect } from "react";
import {
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  setDoc,
  collection,
} from "firebase/firestore";
import { auth } from "../../config/firebase";

const db = getFirestore();

type ProfileData = Record<string, string | number | boolean>;

const ProfileProviderContext = createContext(null);

const { Provider } = ProfileProviderContext;

const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData | undefined>(undefined);

  // Get all user data from the database
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user?.uid) {
        const profileRef = doc(db, `users/${user.uid}`);
        const metricsRef = doc(db, `users/${user.uid}/metrics/streak`);

        // Create metrics subcollection if it doesn't exist
        const metricsDoc = await getDoc(metricsRef);
        if (!metricsDoc.exists()) {
          await setDoc(metricsRef, {
            streak_count: 0,
            longest_streak: 0,
            tracks_completed: 0,
            total_meditation_time: 0,
            completed_tracks: [],
          });
        }

        // Instead of using getDoc, we use onSnapshot here
        // because it acts as a listener and fetches real-time data
        onSnapshot(profileRef, (document) => {
          if (document.exists()) {
            setProfile({ uid: user.uid, ...document.data() }); // Include uid in the profile data
          }
        });
      } else {
        setProfile(undefined);
      }
    });
  }, []);

  const updateProfile = async (data: ProfileData) => {
    if (!auth?.currentUser?.uid) return;
    try {
      const profileRef = doc(db, `users/${auth?.currentUser?.uid}`);
      await setDoc(profileRef, data, { merge: true });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return <Provider value={{ profile, updateProfile }}>{children}</Provider>;
};

export const useProfile = () => {
  const { profile, updateProfile } = useContext<{
    profile: ProfileData | undefined;
    updateProfile: (data: ProfileData) => Promise<void>;
  }>(ProfileProviderContext);

  return { profile, updateProfile };
};

export default ProfileProvider;
