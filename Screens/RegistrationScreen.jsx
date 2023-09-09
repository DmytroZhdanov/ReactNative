import { useEffect, useRef, useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Image,
} from "react-native";
import AddIcon from "../assets/images/add.svg";
import RemoveIcon from "../assets/images/remove.svg";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen() {
  const [userImage, setUserImage] = useState(require("../assets/images/userImage.jpg"));
  const [user, setUser] = useState(initialState);

  const [focusedInput, setFocusedInput] = useState("none");
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const [windowWidth, setWindowWidth] = useState(Dimensions.get("window").width);

  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setWindowWidth(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const handleUserImagePress = () => {
    userImage ? setUserImage(null) : setUserImage(require("../assets/images/userImage.jpg"));
  };

  const handleInputFocus = input => {
    setIsKeyboardShown(true);
    setFocusedInput(input);
  };

  const handleInputBlur = () => {
    setIsKeyboardShown(false);
    setFocusedInput("none");
  };

  const handleSubmit = () => {
    console.log(user);
    setUser(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        source={require("../assets/images/background.jpg")}
        style={styles.background}
      >
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <ScrollView>
            <View style={styles.formWrapper}>
              <View style={{ ...styles.form, paddingBottom: isKeyboardShown ? 32 : 78 }}>
                <TouchableOpacity
                  style={{ ...styles.photoContainer, left: windowWidth / 2 - 60 }}
                  activeOpacity={0.8}
                  onPress={handleUserImagePress}
                >
                  {userImage ? (
                    <>
                      <View style={styles.photoWrapper}>
                        <Image source={userImage} />
                      </View>
                      <RemoveIcon style={styles.photoIcon} />
                    </>
                  ) : (
                    <AddIcon style={styles.photoIcon} />
                  )}
                </TouchableOpacity>

                <Text style={styles.title}>Registration</Text>

                <TextInput
                  style={[styles.input, focusedInput === "login" && styles.inputFocused]}
                  onFocus={() => handleInputFocus("login")}
                  onBlur={() => handleInputBlur("login")}
                  onChangeText={value => setUser(prevState => ({ ...prevState, login: value }))}
                  onSubmitEditing={() => emailInput.current.focus()}
                  placeholder="Login"
                  autoComplete={"name"}
                  value={user.login}
                  returnKeyType={"next"}
                />

                <TextInput
                  style={[styles.input, focusedInput === "email" && styles.inputFocused]}
                  onFocus={() => handleInputFocus("email")}
                  onBlur={() => handleInputBlur("email")}
                  onChangeText={value => setUser(prevState => ({ ...prevState, email: value }))}
                  onSubmitEditing={() => passwordInput.current.focus()}
                  placeholder="Email address"
                  autoComplete={"email"}
                  value={user.email}
                  returnKeyType={"next"}
                  inputMode={"email"}
                  ref={emailInput}
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
                  />

                  <TouchableOpacity
                    style={styles.passwordShowWrapper}
                    activeOpacity={0.5}
                    onPress={() => setIsPasswordShown(!isPasswordShown)}
                  >
                    <Text style={styles.passwordShowText}>{isPasswordShown ? "Hide" : "Show"}</Text>
                  </TouchableOpacity>
                </View>

                {!isKeyboardShown && (
                  <View>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={handleSubmit}
                      activeOpacity={0.5}
                    >
                      <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>

                    <View style={styles.bottomTextBox}>
                      <Text style={styles.bottomText}>Already have account? </Text>

                      <TouchableOpacity>
                        <Text style={styles.bottomText}>Log In</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  formWrapper: {
    paddingTop: 207,
  },
  form: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    paddingTop: 92,
    paddingHorizontal: 16,
  },
  photoContainer: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
    overflow: "visible",
  },
  photoWrapper: { borderRadius: 16, overflow: "hidden" },
  photoIcon: {
    position: "absolute",
    bottom: 8,
    right: -18.5,
  },
  title: {
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    marginBottom: 33,
    color: "#212121",
  },
  input: {
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
  bottomTextBox: {
    flexDirection: "row",
    justifyContent: "center",
  },
  bottomText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#1B4371",
  },
});
