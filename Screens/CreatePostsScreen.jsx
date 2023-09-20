import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from "react-native";

// icons import
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const initialState = {
  name: "",
  location: "",
};

export default function CreatePostsScreen() {
  const [windowWidth, setWindowWidth] = useState(Dimensions.get("window").width);
  const [imageInfo, setImageInfo] = useState(initialState);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);

  const navigation = useNavigation()

  const locationInput = useRef(null);

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

  const handleInputFocus = () => {
    setIsKeyboardShown(true);
  };

  const handleInputBlur = () => {
    setIsKeyboardShown(false);
  };

  const handlePublish = () => {
    console.log(imageInfo);
    setImageInfo(initialState);

    navigation.navigate("Home")
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.7}>
          <View
            style={{
              ...styles.imageWrapper,
              width: windowWidth - 32,
              height: (windowWidth - 32) / 1.43,
            }}
          >
            <View style={styles.addImageBtn}>
              <FontAwesome name="camera" size={24} color="#BDBDBD" />
            </View>
          </View>

          <Text style={styles.text}>Upload image</Text>
        </TouchableOpacity>

        <View style={styles.form}>
          <TextInput
            placeholder="Name..."
            placeholderTextColor={"#BDBDBD"}
            style={{ ...styles.input, fontFamily: "Roboto-Medium" }}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onChangeText={value => {
              setImageInfo(prevState => ({ ...prevState, name: value }));
            }}
            onSubmitEditing={() => locationInput.current.focus()}
            value={imageInfo.name}
            returnKeyType={"next"}
          />

          <View>
            <TextInput
              placeholder="Location..."
              placeholderTextColor={"#BDBDBD"}
              style={{ ...styles.input, fontFamily: "Roboto-Regular", paddingLeft: 28 }}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onChangeText={value => {
                setImageInfo(prevState => ({ ...prevState, location: value }));
              }}
              value={imageInfo.location}
              ref={locationInput}
            />
            <Feather name="map-pin" size={24} color="#BDBDBD" style={styles.locationIcon} />
          </View>
        </View>

        <TouchableOpacity style={styles.publishBtn} activeOpacity={0.7} onPress={handlePublish}>
          <Text style={styles.publishBtnText}>Publish</Text>
        </TouchableOpacity>

        {!isKeyboardShown && (
          <View style={styles.removeBtnWrapper}>
            <TouchableOpacity style={styles.removeBtn} activeOpacity={0.7}>
              <Feather name="trash-2" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
  },
  imageWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  addImageBtn: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 30,
  },
  text: {
    marginTop: 8,
    marginRight: "auto",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#BDBDBD",
  },
  form: {
    marginVertical: 32,
    gap: 16,
  },
  input: {
    height: 50,
    paddingTop: 16,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    fontSize: 16,
    color: "#212121",
  },
  locationIcon: {
    position: "absolute",
    top: 13,
  },
  publishBtn: {
    backgroundColor: "#FF6C00",
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: "center",
  },
  publishBtnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#FFFFFF",
  },
  removeBtnWrapper: {
    marginTop: "auto",
    marginBottom: 34,
    alignItems: "center",
  },
  removeBtn: {
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    justifyContent: "center",
  },
});
