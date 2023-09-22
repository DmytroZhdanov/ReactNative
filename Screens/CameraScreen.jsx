import { Camera } from "expo-camera";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

// icons import
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function CameraScreen() {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [cameraRef, setCameraRef] = useState(null);

  const navigation = useNavigation();

  const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();
  const [galleryImage, setGalleryImage] = useState(null);

  useEffect(() => {
    if (mediaLibraryPermission) {
      (async () => {
        const { assets } = await MediaLibrary.getAssetsAsync();
        const { uri } = assets[0];
        setGalleryImage(uri);
      })();
    }
  }, []);

  const handleGalleryPress = async () => {
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

  const handleSnap = async () => {
    const { uri } = await cameraRef.takePictureAsync();
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync();

    navigation.navigate("SnapPreview", { uri, coords: { latitude, longitude } });
  };

  const handleFlipCamera = () => {
    setType(
      type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
    );
  };

  return (
    <Camera style={styles.camera} type={type} ref={setCameraRef}>
      <TouchableOpacity style={styles.gallery} onPress={handleGalleryPress}>
        {galleryImage && <Image src={galleryImage} style={styles.galleryImage} />}
      </TouchableOpacity>
      <View style={styles.snapBtnWrapper}>
        <TouchableOpacity style={styles.snapBtn} onPress={handleSnap}></TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.flipBtn} onPress={handleFlipCamera}>
        <MaterialIcons name="flip-camera-ios" size={40} color="#ffffff" />
      </TouchableOpacity>
    </Camera>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  gallery: {
    position: "absolute",
    bottom: 50,
    left: 32,
    width: 40,
    height: 40,
    backgroundColor: "#000000",
    borderRadius: 8,
  },
  galleryImage: {
    flex: 1,
  },
  snapBtnWrapper: {
    position: "absolute",
    bottom: 32,
    left: "50%",
    transform: [{ translateX: -38 }],
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 4,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  snapBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#ffffff",
  },
  flipBtn: {
    position: "absolute",
    bottom: 50,
    right: 32,
  },
});
