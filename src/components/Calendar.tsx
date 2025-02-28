import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { format, eachDayOfInterval, startOfMonth, endOfMonth } from "date-fns";
import COLORS from "../utils/COLORS";
import { SCREEN_WIDTH } from "../utils/CONST_LAYOUT";

const moodEmojis = {
  Happy: require("./../../assets/emoticons/happy-emo.png"),
  Tired: require("./../../assets/emoticons/tired-emo.png"),
  Sad: require("./../../assets/emoticons/sad-emo.png"),
  Angry: require("./../../assets/emoticons/angry-emo.png"),
  Calm: require("./../../assets/emoticons/calm-emo.png"),
  Anxious: require("./../../assets/emoticons/anxious-emo.png"),
};

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Calendar = ({ journalEntries, handleDatePress }) => {
  const [dateColors, setDateColors] = useState({});

  const getMoodForDate = (date) => {
    const entry = journalEntries.find(
      (entry) =>
        format(new Date(entry.date), "yyyy-MM-dd") ===
        format(date, "yyyy-MM-dd")
    );
    return entry ? moodEmojis[entry.mood] : null;
  };

  const handleDatePressWithColor = (date) => {
    handleDatePress(date);
    setDateColors((prevColors) => ({
      ...prevColors,
      [date]: getRandomColor(),
    }));
  };

  const currentMonth = eachDayOfInterval({
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date()),
  });

  const monthName = format(new Date(), "MMMM");

  return (
    <View style={styles.calendarWrapper}>
      <Text style={styles.monthText}>{monthName}</Text>
      <View style={styles.calendarContainer}>
        {currentMonth.map((date) => (
          <TouchableOpacity
            key={date.toString()}
            style={[
              styles.dateContainer,
              { backgroundColor: dateColors[date] || COLORS.BACKGROUND_COLOR },
            ]}
            onPress={() => handleDatePressWithColor(date)}
          >
            <Text style={styles.dateText}>{format(date, "d")}</Text>
            {getMoodForDate(date) && (
              <Image source={getMoodForDate(date)} style={styles.emoji} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  calendarWrapper: {
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: COLORS.SURFACE_COLOR,
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  monthText: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.TEXT_COLOR,
    marginBottom: 10,
  },
  calendarContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  dateContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 10,
  },
  dateText: {
    color: COLORS.TEXT_COLOR,
    fontWeight: "bold",
  },
  emoji: {
    width: 20,
    height: 20,
    marginTop: 5,
  },
});
