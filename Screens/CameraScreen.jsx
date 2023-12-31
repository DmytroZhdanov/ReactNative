// Component to render CameraScreen
import { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Camera, CameraType } from "expo-camera";

import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

// icon import
import { MaterialIcons, Feather } from "@expo/vector-icons";

export default function CameraScreen() {
  const [type, setType] = useState(CameraType.back);
  const [cameraRef, setCameraRef] = useState(null);
  const [galleryImage, setGalleryImage] = useState(null);

  const navigation = useNavigation();

  const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (mediaLibraryPermission) {
      (async () => {
        const { assets } = await MediaLibrary.getAssetsAsync();
        const { uri } = assets[0];
        setGalleryImage(uri);
      })();
    }
  }, []);

  /**
   * Upload chosen image from media library and navigate to it preview on PreviewScreen for upcoming uploading to server and publishing
   * @returns undefined if media library permission is not granted or user canceled operation to pick a new photo from media library
   */
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

  /**
   * Taking picture from the camera navigate to it preview on PreviewScreen for upcoming uploading to server and publishing
   */
  const handleSnap = async () => {
    const { uri } = await cameraRef.takePictureAsync();
    cameraRef.pausePreview();
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync();

    navigation.navigate("SnapPreview", { uri, coords: { latitude, longitude } });
  };

  /**
   * Toggle camera type from back to front and vice versa
   */
  const handleFlipCamera = () => {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  };

  return isFocused ? (
    <Camera style={styles.camera} type={type} ref={setCameraRef}>
      <TouchableOpacity style={styles.back} onPress={navigation.goBack}>
        <Feather name="arrow-left" size={24} color="#212121" />
      </TouchableOpacity>

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
  ) : (
    <></>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  back: {
    position: "absolute",
    top: 60,
    left: 16,
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
