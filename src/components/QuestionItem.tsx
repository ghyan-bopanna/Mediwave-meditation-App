import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { OnboardingQuestionProps } from "../utils/TYPES";
import MediText from "./Meditext";
import { SCREEN_HORIZONTAL_PADDING, SCREEN_WIDTH } from "../utils/CONST_LAYOUT";
import MediTextInput from "./MeditextInput";
import MediOptionButton from "./MediOptionButton";

interface QuestionItemProps {
  item: OnboardingQuestionProps;
  onAnswer: (value: string) => void;
  answer: string;
}

const QuestionItem = ({ item, onAnswer, answer }: QuestionItemProps) => (
  <View style={styles.container}>
    <View style={styles.questionText}>
      <MediText subtitle bold center>
        {item.question}
      </MediText>
    </View>
    {item?.type === "multi" &&
      item?.options?.length &&
      item?.options?.map((option, index) => {
        const isSelected = option?.key === answer;
        return (
          <MediOptionButton
            key={option?.key}
            text={option?.value}
            onPress={() => onAnswer(option?.key)}
            isSelected={isSelected}
          />
        );
      })}
    {(item?.type === "text" || item.type === "number") && (
      <MediTextInput
        placeholder={item?.placeholder}
        value={answer}
        onChangeText={onAnswer}
      />
    )}
  </View>
);

export default QuestionItem;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  questionText: {
    marginBottom: 20,
  },
});
