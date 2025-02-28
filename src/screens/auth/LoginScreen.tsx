//React Native Stateless Componant

import * as React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import backgroundImage from "./../../../assets/images/login_bg.png";
import Logo from "./../../../assets/images/logo_light.png";
import BackgroundScreenWrapper from "./../../components/BackgroundScreenWrapper";
import MediText from "../../components/Meditext";
import MediTextInput from "../../components/MeditextInput";
import MediButton from "../../components/Medibutton";
import { NavigationProp } from "@react-navigation/native";
import useAuthentication from "../../hooks/useAuthentication";

interface LoginScreenProps {
  navigation: NavigationProp<any>;
}

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
  });

  //call login from useAuthService
  const { login, loading } = useAuthentication();

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
                placeholder={key}
                secureTextEntry={key === "password"}
                value={credentials[key]}
                onChangeText={(text) =>
                  setCredentials((prevState) => ({ ...prevState, [key]: text }))
                }
              />
            ))}
          </View>
          <View style={{ marginTop: 15 }}>
            <MediButton
              onPress={() => login(credentials.email, credentials.password)}
              loading={loading}
            >
              Login
            </MediButton>
          </View>
          <View style={{ marginTop: 1 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Signup");
              }}
            >
              <MediText>Dont have an account? Signup</MediText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BackgroundScreenWrapper>
  );
};

export default LoginScreen;

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
