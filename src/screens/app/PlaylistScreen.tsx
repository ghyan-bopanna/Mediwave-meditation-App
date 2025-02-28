import * as React from "react";
import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Animated,
  TouchableOpacity,
} from "react-native";
import MediText from "../../components/Meditext";
import { SCREEN_WIDTH } from "../../utils/CONST_LAYOUT";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Audio, AVPlaybackStatusSuccess } from "expo-av";
import COLORS, { BACKGROUND_COLOR } from "../../utils/COLORS";
import { useMusicPlayer } from "../../context/MusicPlayerProvider";
import SkeletonLoader from "../../components/SkeletonLoader"; // Import SkeletonLoader

interface PlaylistScreenProps {
  route: any;
  navigation: any;
}

interface Song {
  id: string;
  title: string;
  imgUrl: string;
  songUrl: string;
  duration: number;
  subtype: string;
}

const PlaylistScreen = ({ route, navigation }: PlaylistScreenProps) => {
  const { category } = route.params;
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const scrollY = new Animated.Value(0);
  const { playTrack, setPlaylist } = useMusicPlayer();

  useEffect(() => {
    const fetchSongs = async () => {
      const q = query(
        collection(db, "songs"),
        where("subtype", "==", category.name)
      );
      const querySnapshot = await getDocs(q);
      const songsData = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const songData = doc.data();
          const song: Song = {
            id: doc.id,
            title: songData.title,
            imgUrl: songData.imgUrl,
            songUrl: songData.songUrl,
            duration: 0, // Initialize duration to 0
            subtype: songData.subtype,
          };
          const audioUrl = await getDownloadURL(
            ref(getStorage(), song.songUrl)
          );
          const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
          const status = await sound.getStatusAsync();
          if (status.isLoaded) {
            song.duration =
              (status as AVPlaybackStatusSuccess).durationMillis / 1000; // Duration in seconds
          }
          await sound.unloadAsync();
          return song;
        })
      );
      console.log("Fetched songs:", songsData);
      setSongs(songsData);
      setPlaylist(songsData);
      setLoading(false); // Set loading to false after fetching data
    };

    fetchSongs();
  }, [category.name]);

  const handlePlayTrack = (song: Song) => {
    console.log("Playing track:", song);
    playTrack(song);
    navigation.navigate("MusicPlayerScreen");
  };

  if (loading) {
    return <SkeletonLoader />; // Show skeleton loader while loading
  }

  return (
    <View style={styles.screenContainer}>
      <MediText heading bold center style={styles.headerText}>
        Welcome to {category.name} Playlist
      </MediText>
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        {songs.map((song) => (
          <TouchableOpacity key={song.id} onPress={() => handlePlayTrack(song)}>
            <View style={styles.songContainer}>
              <View style={styles.songContent}>
                <View style={styles.songTextContainer}>
                  <MediText heading subtitle>
                    {song.title}
                  </MediText>
                  <MediText>
                    {Math.floor(song.duration / 60)}:
                    {Math.floor(song.duration % 60)
                      .toString()
                      .padStart(2, "0")}{" "}
                    mins
                  </MediText>
                </View>
                <Image source={{ uri: song.imgUrl }} style={styles.image} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default PlaylistScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  headerText: {
    marginTop: 40,
  },
  scrollContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  songContainer: {
    width: SCREEN_WIDTH * 0.9,
    height: 120, // Adjust the height as needed
    backgroundColor: "#2C3556",
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  songContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  songTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});
