// Component to render LoginScreen
import { useRef, useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { logInUser } from "../redux/auth/authOperations";

const initialState = {
  email: "",
  password: "",
};

export default function RegistrationScreen() {
  const [focusedInput, setFocusedInput] = useState("none");
  const [user, setUser] = useState(initialState);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const passwordInput = useRef(null);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const handleInputFocus = input => {
    setIsKeyboardShown(true);
    setFocusedInput(input);
  };

  const handleInputBlur = () => {
    setIsKeyboardShown(false);
    setFocusedInput("none");
  };

  const handleSubmit = () => {
    dispatch(logInUser(user));
    setUser(initialState);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ImageBackground
          source={require("../assets/images/background.jpg")}
          style={styles.background}
        >
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView>
              <View style={styles.formWrapper}>
                <View
                  style={{
                    ...styles.form,
                    paddingBottom: isKeyboardShown ? 32 : 144,
                  }}
                >
                  <Text style={styles.title}>Login</Text>

                  <TextInput
                    style={[styles.input, focusedInput === "email" && styles.inputFocused]}
                    onFocus={() => handleInputFocus("email")}
                    onBlur={() => handleInputBlur("email")}
                    onChangeText={value => setUser(prevState => ({ ...prevState, email: value }))}
                    onSubmitEditing={() => passwordInput.current.focus()}
                    placeholder="Email address"
                    autoComplete={"email"}
                    keyboardType={"email-address"}
                    value={user.email}
                    returnKeyType={"next"}
                    inputMode={"email"}
                    placeholderTextColor={"#BDBDBD"}
                  />

                  <View>
                    <TextInput
                      style={[
                        { ...styles.input, paddingRight: 64 },
                        focusedInput === "password" && styles.inputFocused,
                      ]}
                      onFocus={() => handleInputFocus("password")}
                      onBlur={() => handleInputBlur("password")}
                      onChangeText={value =>
                        setUser(prevState => ({ ...prevState, password: value }))
                      }
                      placeholder="Password"
                      autoComplete={"new-password"}
                      secureTextEntry={isPasswordShown ? false : true}
                      value={user.password}
                      ref={passwordInput}
                      placeholderTextColor={"#BDBDBD"}
                    />

                    <TouchableOpacity
                      style={styles.passwordShowWrapper}
                      activeOpacity={0.5}
                      onPress={() => setIsPasswordShown(!isPasswordShown)}
                    >
                      <Text style={styles.passwordShowText}>
                        {isPasswordShown ? "Hide" : "Show"}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {!isKeyboardShown && (
                    <View>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={handleSubmit}
                        activeOpacity={0.5}
                      >
                        <Text style={styles.buttonText}>Log In</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("Register");
                        }}
                      >
                        <Text style={styles.bottomText}>Don't have an account yet? Register</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  formWrapper: {
    paddingTop: 81,
  },
  form: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  title: {
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    marginBottom: 33,
    color: "#212121",
  },
  input: {
    height: 50,
    backgroundColor: "#e8e8e8",
    borderWidth: 1,
    borderColor: "#f6f6f6",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 15,
    marginBottom: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
  },
  inputFocused: {
    backgroundColor: "#ffffff",
    borderColor: "#FF6C00",
  },
  passwordShowWrapper: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  passwordShowText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#1B4371",
  },
  button: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginTop: 27,
    marginBottom: 16,
  },
  buttonText: {
    color: "#ffffff",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  bottomText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#1B4371",
    textAlign: "center",
  },
});
