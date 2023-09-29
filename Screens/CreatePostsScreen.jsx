// Component to render CreatePostsScreen
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
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Camera } from "expo-camera";

import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";

import { uploadPhotoToServer } from "../utils/uploadPhotoToServer";
import { selectNickName, selectUserId, selectUserPhoto } from "../redux/auth/authSelectors";

// icons import
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const initialState = {
  image: null,
  name: null,
  location: { title: null, coords: { latitude: 0, longitude: 0 } },
  authorId: null,
  likes: [],
  createdAt: null,
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
  const [locationPermission, requestLocationPermission] = Location.useForegroundPermissions();

  const userId = useSelector(selectUserId);
  const userNickName = useSelector(selectNickName);
  const userPhoto = useSelector(selectUserPhoto);

  useEffect(() => {
    params && params.uri && setPost(prevState => ({ ...prevState, image: params.uri }));

    params &&
      params.coords &&
      setPost(prevState => ({
        ...prevState,
        location: { ...prevState.location, coords: params.coords },
      }));

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

    if (!locationPermission) {
      (async () => {
        await Location.requestForegroundPermissionsAsync();
      })();
    }
  }, []);

  useEffect(() => {
    setIsPublishDisabled(!post.image || !post.name || !post.location.title);
  }, [post]);

  /**
   * Upload chosen image from media library and navigate to it preview on PreviewScreen for upcoming uploading to server and publishing
   * @returns undefined if media library permission is not granted or user canceled operation to pick a new photo from media library
   */
  const uploadImage = async () => {
    if (!mediaLibraryPermission.granted) {
      await MediaLibrary.requestPermissionsAsync();
      if (!mediaLibraryPermission.granted) return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (result.canceled) return;

    const info = await MediaLibrary.getAssetInfoAsync(result.assets[0].assetId);

    navigation.navigate("SnapPreview", {
      uri: result.assets[0].uri,
      coords: info?.location || null,
    });
  };

  const handleInputFocus = () => {
    setIsKeyboardShown(true);
  };

  const handleInputBlur = () => {
    setIsKeyboardShown(false);
  };

  /**
   * Publish new post and navigate to Home Screen
   */
  const handlePublish = async () => {
    const photoURL = await uploadPhotoToServer("postImage", post.image, userId);

    const newPost = {
      ...post,
      image: photoURL,
      author: {
        id: userId,
        nickName: userNickName,
        photo: userPhoto,
      },
      createdAt: Date.now(),
    };

    uploadPostToServer(newPost);

    setPost(initialState);
    navigation.replace("Home");
  };

  /**
   * Upload post to database
   * @param {Object} post Object with post details
   */
  const uploadPostToServer = async post => {
    const reference = await collection(db, "posts");
    await addDoc(reference, post);
  };

  /**
   * Reset component post state and navigate to Home Screen
   */
  const handleErase = () => {
    setPost(initialState);
    navigation.replace("Home");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.cameraWrapper}>
          {post.image ? (
            <Image src={post.image} style={styles.camera} />
          ) : (
            <Camera style={styles.camera}>
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
        </View>
        
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
                setPost(prevState => ({
                  ...prevState,
                  location: { ...prevState.location, title: value },
                }));
              }}
              value={post.location.title}
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
  cameraWrapper: {
    borderRadius: 8,
    overflow: "hidden",
    width: Dimensions.get("window").width - 32,
    height: (Dimensions.get("window").width - 32) / 1.43,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginTop: 32,
  },
  camera: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
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
