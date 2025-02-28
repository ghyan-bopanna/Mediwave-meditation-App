//React Native Stateless Componant

import * as React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import backgroundImage from "./../../../assets/images/signup_bg.png";
import Logo from "./../../../assets/images/logo_light.png";
import BackgroundScreenWrapper from "./../../components/BackgroundScreenWrapper";
import MediText from "../../components/Meditext";
import MediTextInput from "../../components/MeditextInput";
import MediButton from "../../components/Medibutton";
import { NavigationProp } from "@react-navigation/native";
import useAuthentication from "../../hooks/useAuthentication";

interface SignupScreenProps {
  navigation: NavigationProp<any>;
}

const SignupScreen = ({ navigation }: SignupScreenProps) => {
  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
  });

  const { register, loading } = useAuthentication();

  return (
    <BackgroundScreenWrapper image={backgroundImage}>
      <View style={styles.container}>
        <View style={styles.inputsWrapper}>
          {/* view to show titile text */}
          <Image source={Logo} style={styles.Logo} />
          <MediText heading bold>
            Mediwave
          </MediText>
          <MediText>Find Peace, Feel Joy, Embrace Life</MediText>
          <View style={styles.inputWrapper}>
            {Object.keys(credentials).map((key: string) => (
              <MediTextInput
                key={key}
                secureTextEntry={key === "password"}
                placeholder={key}
                value={credentials[key]}
                onChangeText={(text) =>
                  setCredentials((prevState) => ({ ...prevState, [key]: text }))
                }
              />
            ))}
          </View>
          <View style={{ marginTop: 15 }}>
            <MediButton
              onPress={() => {
                register(credentials.email, credentials.password);
              }}
              loading={loading}
            >
              Signup
            </MediButton>
          </View>
          <View style={{ marginTop: 1 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <MediText>Have an account? Login</MediText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BackgroundScreenWrapper>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  textTitile: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  inputsWrapper: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },

  Logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },

  inputWrapper: {
    marginTop: 25,
  },
});
