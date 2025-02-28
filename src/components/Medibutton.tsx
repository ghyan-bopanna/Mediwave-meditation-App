import * as React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
} from "react-native";
import COLORS from "../utils/COLORS";
import { SCREEN_WIDTH } from "../utils/CONST_LAYOUT";

interface MediButtonProps {
  children: React.ReactNode;
  secondary?: boolean;
  style?: StyleProp<any>;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const MediButton = ({
  children,
  secondary,
  style,
  onPress,
  loading,
  disabled,
}: MediButtonProps) => {
  let backgroundColor = COLORS.PRIMARY_COLOR;
  if (secondary) backgroundColor = COLORS.SECONDARY_COLOR;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={{
        backgroundColor,
        borderRadius: 10,
        margin: 10,
        height: 50,
        width: SCREEN_WIDTH * 0.85,
        justifyContent: "center",
        alignItems: "center",
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text
          style={{
            color: COLORS.TEXT_COLOR,
            fontSize: 15,
            fontWeight: "600",
          }}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default MediButton;
