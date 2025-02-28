import * as React from "react";
import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import MediText from "../../components/Meditext";
import { SCREEN_WIDTH } from "../../utils/CONST_LAYOUT";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../config/firebase";
import COLORS, { BACKGROUND_COLOR } from "../../utils/COLORS";

interface LibraryScreenProps {
  navigation: any;
}

const LibraryScreen = ({ navigation }: LibraryScreenProps) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "songs"), (snapshot) => {
      const songsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Group songs by subtype and pick a random image for each subtype
      const categoriesData = songsData.reduce((acc, song) => {
        if (!acc[song.subtype]) {
          acc[song.subtype] = {
            name: song.subtype,
            coverUrl: song.imgUrl,
          };
        }
        return acc;
      }, {});

      setCategories(Object.values(categoriesData));
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.screenContainer}>
      <MediText heading bold center style={styles.headerText}>
        Let's Meditate
      </MediText>
      <MediText opacity={0.5} center subtitle style={styles.subHeaderText}>
        Search entire library of meditations and more
      </MediText>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.name}
            style={styles.categoryContainer}
            onPress={() => navigation.navigate("PlaylistScreen", { category })}
          >
            <Image source={{ uri: category.coverUrl }} style={styles.image} />
            <MediText heading subtitle center>
              {category.name}
            </MediText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  headerText: {
    marginTop: 40, // Adjust this value as needed
  },
  subHeaderText: {
    marginBottom: 20, // Adjust this value as needed
  },
  scrollContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  categoryContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  image: {
    width: SCREEN_WIDTH * 0.85,
    height: 200,
    borderRadius: 15,
    marginBottom: 10,
  },
});
