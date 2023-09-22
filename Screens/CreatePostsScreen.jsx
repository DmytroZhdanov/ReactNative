import { useNavigation, useRoute } from "@react-navigation/native";
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
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";

// icons import
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const initialState = {
  imageUri: "",
  name: "",
  location: "",
};

export default function CreatePostsScreen() {
  const [post, setPost] = useState(initialState);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [isPublishDisabled, setIsPublishDisabled] = useState(true);

  const navigation = useNavigation();
  const params = useRoute().params;

  const locationInput = useRef(null);

  const [cameraPermission, requestCameraPermission] = Camera.useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();

  const windowWidth = Dimensions.get("window").width;

  if (!cameraPermission) {
    (async () => {
      await Camera.requestCameraPermissionsAsync();
    })();
  }

  if (!mediaLibraryPermission) {
    (async () => {
      await MediaLibrary.requestPermissionsAsync();
    })();
  }

  useEffect(() => {
    params && params.uri && setPost(prevState => ({ ...prevState, imageUri: params.uri }));
  }, []);

  useEffect(() => {
    setIsPublishDisabled(post.imageUri === "" || post.name === "" || post.location === "");
  }, [post]);

  const uploadImage = async () => {
    if (!mediaLibraryPermission.granted) {
      await MediaLibrary.requestPermissionsAsync();
      if (!mediaLibraryPermission.granted) return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (result.canceled) return;

    navigation.navigate("SnapPreview", { uri: result.assets[0].uri });
  };

  const handleInputFocus = () => {
    setIsKeyboardShown(true);
  };

  const handleInputBlur = () => {
    setIsKeyboardShown(false);
  };

  const handlePublish = () => {
    console.log(post);
    setPost(initialState);

    navigation.replace("Home");
  };

  const handleErase = () => {
    setPost(initialState);
    navigation.replace("Home");
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {post.imageUri !== "" ? (
          <Image
            src={post.imageUri}
            style={{
              ...styles.camera,
              width: windowWidth - 32,
              height: (windowWidth - 32) / 1.43,
            }}
          />
        ) : (
          <Camera
            style={{
              ...styles.camera,
              width: windowWidth - 32,
              height: (windowWidth - 32) / 1.43,
            }}
          >
            <TouchableOpacity
              style={styles.addImageBtn}
              onPress={() => {
                navigation.navigate("Camera");
              }}
            >
              <FontAwesome name="camera" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </Camera>
        )}
        <TouchableOpacity activeOpacity={0.7} onPress={uploadImage}>
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
              setPost(prevState => ({ ...prevState, name: value }));
            }}
            onSubmitEditing={() => locationInput.current.focus()}
            value={post.name}
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
                setPost(prevState => ({ ...prevState, location: value }));
              }}
              value={post.location}
              ref={locationInput}
            />
            <Feather name="map-pin" size={24} color="#BDBDBD" style={styles.locationIcon} />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.publishBtn, isPublishDisabled && { opacity: 0.5 }]}
          activeOpacity={0.7}
          onPress={handlePublish}
          disabled={isPublishDisabled}
        >
          <Text style={styles.publishBtnText}>Publish</Text>
        </TouchableOpacity>

        {!isKeyboardShown && (
          <View style={styles.removeBtnWrapper}>
            <TouchableOpacity style={styles.removeBtn} activeOpacity={0.7} onPress={handleErase}>
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
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
  },
  camera: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    overflow: "hidden",
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
