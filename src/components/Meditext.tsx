//React Native Stateless Componant

import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

interface MediTextProps {
  headingL?: boolean;
  heading?: boolean;
  bodyS?: boolean;
  bold?: boolean;
  center?: boolean;
  color?: string; // optional color prop for custom colors. Default is white (#fff)
  children?: React.ReactNode;
}

const MediText = ({
  headingL,
  heading,
  bodyS,
  center = false,
  bold,
  color,
  children,
}: MediTextProps) => {
  let fontSize = 14;
  if (headingL) {
    fontSize = 40;
  }
  if (heading) {
    fontSize = 34;
  }
  if (bodyS) {
    fontSize = 12;
  }
  return (
    <Text
      style={{
        fontSize,
        alignSelf: center ? "center" : "auto",
        fontWeight: bold ? "800" : "400",
        color: color ? color : "#fff",
      }}
    >
      {children}
    </Text>
  );
};

export default MediText;

const styles = StyleSheet.create({
  container: {},
});
