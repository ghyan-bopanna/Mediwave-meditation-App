import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import useAuthentication from "../../hooks/useAuthentication";
import MediButton from "../../components/Medibutton";
import headerImage from "./../../../assets/images/header-image.png";
import HeaderImage from "../../components/HeaderImage";
import MediText from "../../components/Meditext";
import MediTextInput from "../../components/MeditextInput";
import SearchIcon from "../../../assets/icons/SearchIcon";
import MediMediaCards from "../../components/MediMediaCards";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { Audio } from "expo-av";
import { useMusicPlayer } from "../../context/MusicPlayerProvider";
import COLORS from "../../utils/COLORS";

const fetchSongs = async () => {
  const querySnapshot = await getDocs(collection(db, "songs"));
  const songs = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const songData = doc.data();
      const { sound } = await Audio.Sound.createAsync({
        uri: songData.songUrl,
      });
      const status = await sound.getStatusAsync();
      const duration = status.isLoaded
        ? Math.round(status.durationMillis / 1000)
        : 0;
      await sound.unloadAsync();
      return { ...songData, duration };
    })
  );
  return songs;
};

const HomeScreen = ({ navigation }) => {
  const { logout } = useAuthentication();
  const [searchText, setSearchText] = useState("");
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [moodSongs, setMoodSongs] = useState([]);
  const { playTrack, setPlaylist } = useMusicPlayer();

  useEffect(() => {
    const fetchAllSongs = async () => {
      const fetchedSongs = await fetchSongs();
      setSongs(fetchedSongs);
      setFilteredSongs(fetchedSongs); // Initialize filteredSongs with all songs
      setMoodSongs(fetchedSongs); // Assuming moodSongs are the same for now
      setPlaylist(fetchedSongs);
    };

    fetchAllSongs();
  }, []);

  useEffect(() => {
    // Filter songs based on search text
    const filtered = songs.filter((song) =>
      song.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredSongs(filtered);
  }, [searchText, songs]);

  const handlePlayTrack = (song) => {
    playTrack(song);
    navigation.navigate("MusicPlayerScreen");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeaderImage image={headerImage} />
      <MediText heading bold center>
        Let's Meditate
      </MediText>
      <MediText opacity={0.5} center subtitle>
        Search entire library of meditations and more
      </MediText>

      <View style={styles.searchWrapper}>
        <MediTextInput
          placeholder="Search"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          icon={() => <SearchIcon />}
        />
      </View>

      <View>
        <View style={styles.contentContainer}>
          <MediText heading bold fontSize={22} style={{ marginTop: 20 }}>
            Recommended for You
          </MediText>
        </View>
        <FlatList
          horizontal
          data={filteredSongs}
          contentContainerStyle={{ paddingHorizontal: 20, marginTop: 20 }}
          keyExtractor={(item) => item.id}
          snapToInterval={150}
          decelerationRate="fast"
          disableIntervalMomentum
          snapToAlignment="start"
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePlayTrack(item)}>
              <View>
                <MediMediaCards
                  title={item.title}
                  image={item.imgUrl}
                  duration={item.duration}
                  type={item.type}
                />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <View>
        <View style={styles.contentContainer}>
          <MediText heading bold fontSize={22} style={{ marginTop: 20 }}>
            Based on Your Mood
          </MediText>
        </View>
        <FlatList
          horizontal
          data={moodSongs}
          contentContainerStyle={{ paddingHorizontal: 20, marginTop: 20 }}
          keyExtractor={(item) => item.id}
          snapToInterval={150}
          decelerationRate="fast"
          disableIntervalMomentum
          snapToAlignment="start"
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePlayTrack(item)}>
              <View>
                <MediMediaCards
                  title={item.title}
                  image={item.imgUrl}
                  duration={item.duration}
                  type={item.type}
                />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 20,
    backgroundColor: COLORS.BACKGROUND_COLOR,
  },
  searchWrapper: {
    marginTop: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
});
