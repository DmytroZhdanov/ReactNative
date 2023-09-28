import { useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
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

import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";

import { registerUser } from "../redux/auth/authOperations";

// icon import
import { AntDesign } from "@expo/vector-icons";

const initialState = {
  login: "",
  email: "",
  password: "",
  image: null,
};

export default function RegistrationScreen() {
  const [user, setUser] = useState(initialState);

  const [focusedInput, setFocusedInput] = useState("none");
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();

  const windowWidth = Dimensions.get("window").width;

  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const handleUserImagePress = () => {
    user.image ? setUser(prevState => ({ ...prevState, image: null })) : uploadImage();
  };

  const uploadImage = async () => {
    if (!mediaLibraryPermission.granted) {
      await MediaLibrary.requestPermissionsAsync();
      if (!mediaLibraryPermission.granted) return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (result.canceled) return;

    setUser(prevState => ({ ...prevState, image: result.assets[0].uri }));
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
    dispatch(registerUser(user));
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
                <View style={{ ...styles.form, paddingBottom: isKeyboardShown ? 32 : 78 }}>
                  <TouchableOpacity
                    style={{ ...styles.photoContainer, left: windowWidth / 2 - 60 }}
                    activeOpacity={0.8}
                    onPress={handleUserImagePress}
                  >
                    {user.image ? (
                      <>
                        <View style={styles.photoWrapper}>
                          <Image
                            source={{ uri: user.image }}
                            alt={"User Image"}
                            style={styles.userPhoto}
                          />
                        </View>
                        <View style={styles.iconWrapper}>
                          <AntDesign
                            style={styles.photoIcon}
                            name="closecircleo"
                            size={25}
                            color="#E8E8E8"
                          />
                        </View>
                      </>
                    ) : (
                      <View style={styles.iconWrapper}>
                        <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
                      </View>
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
                    placeholderTextColor={"#BDBDBD"}
                  />

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
                    ref={emailInput}
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
                        <Text style={styles.buttonText}>Register</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("Login");
                        }}
                      >
                        <Text style={styles.bottomText}>Already have account? Log In</Text>
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
  photoWrapper: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
  },
  userPhoto: {
    flex: 1,
  },
  iconWrapper: {
    borderRadius: 12.5,
    overflow: "hidden",
    position: "absolute",
    bottom: 16,
    right: -12.5,
  },
  photoIcon: {
    backgroundColor: "#FFFFFF",
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
