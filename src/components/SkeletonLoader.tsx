import React from "react";
import { View, StyleSheet } from "react-native";
import SkeletonLoading from "expo-skeleton-loading";
import COLORS from "../utils/COLORS";
import { SCREEN_WIDTH } from "./../utils/CONST_LAYOUT";

const SkeletonLoader = () => {
  return (
    <View style={styles.container}>
      {Array.from({ length: 5 }).map((_, index) => (
        <View key={index} style={styles.songContainer}>
          <View style={styles.songContent}>
            <View style={styles.textContainer}>
              <SkeletonLoading
                background={COLORS.SURFACE_COLOR}
                highlight={COLORS.BACKGROUND_COLOR}
              >
                <View style={styles.textField}></View>
              </SkeletonLoading>
            </View>
            <SkeletonLoading
              background={COLORS.SURFACE_COLOR}
              highlight={COLORS.BACKGROUND_COLOR}
            >
              <View style={styles.square}></View>
            </SkeletonLoading>
          </View>
        </View>
      ))}
    </View>
  );
};

export default SkeletonLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH,
    backgroundColor: COLORS.BACKGROUND_COLOR,
    paddingTop: 60,
  },
  songContainer: {
    width: SCREEN_WIDTH * 0.9,
    height: 120,
    backgroundColor: COLORS.SURFACE_COLOR,
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
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  textField: {
    width: "40%",
    height: 20,
    backgroundColor: COLORS.SURFACE_COLOR,
    borderRadius: 5,
    marginBottom: 10,
  },

  square: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.BACKGROUND_COLOR,
    borderRadius: 10,
  },
});
