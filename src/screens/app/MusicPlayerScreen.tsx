import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import { AntDesign } from "@expo/vector-icons";
import { Video } from "expo-av";
import { useMusicPlayer } from "../../context/MusicPlayerProvider";
import MediText from "../../components/Meditext";
import COLORS, { BACKGROUND_COLOR } from "../../utils/COLORS";
import seaOverlay from "./../../../assets/videos/seaOverlay.mp4";
import { db } from "../../../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useProfile } from "../../context/ProfileProvider";
import MusicSkeletonLoader from "../../components/MusicSkeletonLoader";

const MusicPlayerScreen = ({ navigation }) => {
  const {
    currentTrack,
    pauseTrack,
    resumeTrack,
    stopTrack,
    nextTrack,
    previousTrack,
  } = useMusicPlayer();
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const { profile } = useProfile();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentTrack) {
      const interval = setInterval(async () => {
        const status = await currentTrack.sound.getStatusAsync();
        if (status.isLoaded) {
          setCurrentTime(status.positionMillis / 1000);
          setDuration(status.durationMillis / 1000);
          setLoading(false); // Set loading to false when the track is loaded
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentTrack]);

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const fadeVolume = async (sound, fromVolume, toVolume, duration) => {
    const steps = 10;
    const stepDuration = duration / steps;
    const volumeStep = (toVolume - fromVolume) / steps;

    for (let i = 0; i <= steps; i++) {
      await sound.setVolumeAsync(fromVolume + volumeStep * i);
      await new Promise((resolve) => setTimeout(resolve, stepDuration));
    }
  };

  const handlePlayPause = async () => {
    if (isPlaying) {
      await pauseTrack();
    } else {
      await fadeVolume(currentTrack.sound, 0, 1, 500); // Fade in over 500ms
      await resumeTrack();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSliderComplete = async (value: number) => {
    if (currentTrack && currentTrack.sound) {
      await currentTrack.sound.setVolumeAsync(0); // Set volume to 0 before seeking
      await currentTrack.sound.setPositionAsync(value * 1000);
      await fadeVolume(currentTrack.sound, 0, 1, 500); // Fade in over 500ms
      setCurrentTime(value);
    }
  };

  const handleTrackEnd = async () => {
    if (currentTrack && profile) {
      const metricsRef = doc(db, `users/${profile.uid}/metrics/streak`);
      const metricsDoc = await getDoc(metricsRef);
      const completedTracks = metricsDoc.data()?.completed_tracks || [];

      const newTotalMeditationTime =
        (metricsDoc.data()?.total_meditation_time || 0) +
        Math.floor(duration / 60);

      if (!completedTracks.includes(currentTrack.id)) {
        const newTracksCompleted =
          (metricsDoc.data()?.tracks_completed || 0) + 1;

        await setDoc(
          metricsRef,
          {
            tracks_completed: newTracksCompleted,
            total_meditation_time: newTotalMeditationTime,
            completed_tracks: [...completedTracks, currentTrack.id],
          },
          { merge: true }
        );
      } else {
        await setDoc(
          metricsRef,
          {
            total_meditation_time: newTotalMeditationTime,
          },
          { merge: true }
        );
      }
    }
  };

  useEffect(() => {
    if (currentTime >= duration && duration > 0) {
      handleTrackEnd();
    }
  }, [currentTime, duration]);

  if (loading) {
    return <MusicSkeletonLoader />;
  }

  if (!currentTrack) {
    return (
      <View style={styles.container}>
        <MediText heading bold center>
          No track playing
        </MediText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Video
        source={seaOverlay}
        rate={0.5}
        volume={0.0}
        isMuted={true}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.overlay} />
      <View style={styles.albumArtContainer}>
        <Image source={{ uri: currentTrack.imgUrl }} style={styles.albumArt} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.songTitle}>{currentTrack.title}</Text>
        <Text style={styles.artistName}>{currentTrack.artist}</Text>
      </View>
      <View style={styles.progressContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={currentTime}
          onSlidingComplete={handleSliderComplete}
          minimumTrackTintColor="#fff"
          maximumTrackTintColor="#ddd"
          thumbTintColor="#fff"
        />
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
      </View>
      <View style={styles.controlsContainer}>
        <TouchableOpacity onPress={previousTrack} style={styles.controlButton}>
          <AntDesign name="stepbackward" size={32} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlePlayPause}
          style={styles.controlButton}
        >
          <AntDesign
            name={isPlaying ? "pausecircleo" : "playcircleo"}
            size={64}
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={nextTrack} style={styles.controlButton}>
          <AntDesign name="stepforward" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MusicPlayerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(1, 4, 34, 0.80)", // Adjust the opacity as needed
  },
  albumArtContainer: {
    width: 300,
    height: 300,
    marginBottom: 30,
  },
  albumArt: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  infoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  songTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fff",
  },
  artistName: {
    fontSize: 18,
    color: "#ccc",
  },
  progressContainer: {
    width: "80%",
    marginBottom: 30,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  timeText: {
    fontSize: 12,
    color: "#ccc",
  },
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "60%",
  },
  controlButton: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 50,
  },
});
