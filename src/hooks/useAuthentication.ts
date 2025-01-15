import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { Alert } from "react-native";

const auth = getAuth();

const validate = (email: string, password: string) => {
  if (!email || !password) {
    return false;
  }
  return true;
};

// login and sign in
const useAuthentication = () => {
  const register = async (email: string, password: string) => {
    console.log(
      "Registering user with email: ",
      email,
      " and password: ",
      password
    );
    if (!validate(email, password))
      return Alert.alert("Invalid email or password");
    try {
      const registeredUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User registered successfully: ", registeredUser);
    } catch (error) {
      Alert.alert("Failed to register user: ", error.message);
      console.log("Could not register user: ", error);
    }
  };

  const login = async (email: string, password: string) => {
    console.log(
      "Logging in user with email: ",
      email,
      " and password: ",
      password
    );
    if (!validate(email, password))
      return Alert.alert("Invalid email or password");
    try {
      const loggedInUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in successfully: ", loggedInUser);
    } catch (error) {
      Alert.alert("Failed to log in user: ", error.message);
      console.log("Could not log in user: ", error);
    }
  };

  // logout
  const logout = async() => {
    console.log("Logging out user");
    try {
      await signOut(auth);
      console.log("User logged out successfully");
    } catch (error) {
      Alert.alert("Failed to log out user: ", error.message);
      console.log("Could not log out user: ", error);
    }
  }

  return { register, login,logout };
};

export default useAuthentication;
