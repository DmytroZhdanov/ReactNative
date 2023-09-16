import { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// icon import
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function ProfileListHeader() {
  const [userImage, setUserImage] = useState(require("../assets/images/userImage.jpg"));
  const [windowWidth, setWindowWidth] = useState(Dimensions.get("window").width);

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

  return (
    <View style={styles.contentWrapper}>
      <View style={styles.content}>
        <TouchableOpacity
          style={{ ...styles.photoContainer, left: windowWidth / 2 - 60 }}
          activeOpacity={0.8}
          onPress={handleUserImagePress}
        >
          {userImage ? (
            <>
              <View style={styles.photoWrapper}>
                <Image source={userImage} alt={"User Image"} />
              </View>
              <View style={styles.iconWrapper}>
                <AntDesign style={styles.photoIcon} name="closecircleo" size={25} color="#E8E8E8" />
              </View>
            </>
          ) : (
            <View style={styles.iconWrapper}>
              <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutBtn}>
          <Feather name="log-out" size={24} color="#BDBDBD" />
        </TouchableOpacity>
        <Text style={styles.userName}>Natali Romanova</Text>
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
    borderRadius: 16,
    overflow: "hidden",
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
