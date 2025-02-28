import React from "react";
import { Image, StyleSheet, View } from "react-native";
import MediText from "./Meditext";
import convertSecondToMinute from "../utils/helper/convertSecondToMinute";

interface MediMediaCardsProps {
  title: string;
  image: string;
  duration: number;
  type: string;
}

const MediMediaCards = ({
  title,
  image,
  duration,
  type,
}: MediMediaCardsProps) => (
  <View style={styles.cardContainer}>
    <Image source={{ uri: image }} style={styles.image} />
    <MediText subtitle style={{ marginTop: 10 }} bold>
      {title}
    </MediText>
    <MediText style={{ marginTop: 5 }} bold opacity={0.6}>
      {type.toUpperCase()} -{convertSecondToMinute(duration)}
    </MediText>
  </View>
);

export default MediMediaCards;

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 100,
    borderRadius: 10,
  },
  cardContainer: {
    marginRight: 10,
  },
});
