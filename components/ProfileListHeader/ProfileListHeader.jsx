// Component to render on top of user posts showing info about currently authorized user
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";

import { logOutUser, updateProfilePhoto } from "../../redux/auth/authOperations";
import { uploadPhotoToServer } from "../../utils/uploadPhotoToServer";

// icon import
import { AntDesign, Feather } from "@expo/vector-icons";

export default function ProfileListHeader({ userNickName, userPhoto, userId, isOwnProfile }) {
  const dispatch = useDispatch();

  const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();

  const windowWidth = Dimensions.get("window").width;

  /**
   * Uploading new photo if user currently doesn't have one.
   * Deleting user photo if existed.
   */
  const handleUserImagePress = () => {
    userPhoto ? dispatch(updateProfilePhoto("")) : uploadImage();
  };

  /**
   * Upload chosen image from media library to server and update user profile info
   * @returns undefined if media library permission is not granted or user canceled operation to pick a new photo from media library
   */
  const uploadImage = async () => {
    if (!mediaLibraryPermission.granted) {
      await MediaLibrary.requestPermissionsAsync();
      if (!mediaLibraryPermission.granted) return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (result.canceled) return;

    const { uri } = result.assets[0];
    const url = await uploadPhotoToServer("userPhoto", uri, userId);

    dispatch(updateProfilePhoto(url));
  };

  /**
   * Log out user
   */
  const handleLogout = () => {
    dispatch(logOutUser());
  };

  return (
    <View style={styles.contentWrapper}>
      <View style={styles.content}>
        <TouchableOpacity
          style={{ ...styles.photoContainer, left: windowWidth / 2 - 60 }}
          activeOpacity={0.8}
          onPress={handleUserImagePress}
          disabled={!isOwnProfile}
        >
          {userPhoto || userPhoto !== "" ? (
            <>
              <View style={styles.photoWrapper}>
                <Image source={{ uri: userPhoto }} alt={"User Image"} style={styles.userPhoto} />
              </View>

              {isOwnProfile && (
                <View style={styles.iconWrapper}>
                  <AntDesign
                    style={styles.photoIcon}
                    name="closecircleo"
                    size={25}
                    color="#E8E8E8"
                  />
                </View>
              )}
            </>
          ) : (
            isOwnProfile && (
              <View style={styles.iconWrapper}>
                <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
              </View>
            )
          )}
        </TouchableOpacity>

        {isOwnProfile && (
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        )}

        <Text style={styles.userName}>{userNickName}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    paddingTop: 60,
    marginBottom: -1,
  },
  content: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#ffffff",
    paddingTop: 92,
    paddingBottom: 33,
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
  logoutBtn: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  userName: {
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    color: "#212121",
  },
});
