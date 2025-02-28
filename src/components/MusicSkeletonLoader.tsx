import React from "react";
import { View, StyleSheet } from "react-native";
import SkeletonLoading from "expo-skeleton-loading";
import COLORS from "../utils/COLORS";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "./../utils/CONST_LAYOUT";

const MusicSkeletonLoader = () => {
  return (
    <View style={styles.container}>
      {/* Album Art Placeholder */}
      <SkeletonLoading
        background={COLORS.SURFACE_COLOR}
        highlight={COLORS.BACKGROUND_COLOR}
      >
        <View style={styles.square}></View>
      </SkeletonLoading>

      {/* Slider Placeholder */}
      <SkeletonLoading
        background={COLORS.SURFACE_COLOR}
        highlight={COLORS.BACKGROUND_COLOR}
      >
        <View style={styles.slider}></View>
      </SkeletonLoading>

      {/* Music Player Controls Placeholder */}
      <View style={styles.controlsContainer}>
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonLoading
            key={index}
            background={COLORS.SURFACE_COLOR}
            highlight={COLORS.BACKGROUND_COLOR}
          >
            <View style={styles.controlButton}></View>
          </SkeletonLoading>
        ))}
      </View>
    </View>
  );
};

export default MusicSkeletonLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: COLORS.BACKGROUND_COLOR,
    paddingBottom: SCREEN_HEIGHT * 0.15, // Moves everything up
  },
  square: {
    width: 300,
    height: 300,
    backgroundColor: COLORS.BACKGROUND_COLOR,
    borderRadius: 10,
    marginBottom: 40,
  },
  slider: {
    width: SCREEN_WIDTH * 0.8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.BACKGROUND_COLOR,
    marginBottom: 40,
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SCREEN_WIDTH * 0.6,
    paddingTop: SCREEN_HEIGHT * 0.1,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.BACKGROUND_COLOR,
  },
});
