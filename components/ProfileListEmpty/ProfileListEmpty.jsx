// Component to render in ProfileScreen if user didn't publish any post
import { Dimensions, StyleSheet, Text, View } from "react-native";

export default function ProfileListEmpty({ isOwnProfile, userNickName }) {
  const windowHeight = Dimensions.get("window").height;

  return (
    <View style={{ ...styles.noPostTextWrapper, height: windowHeight - 390 }}>
      {isOwnProfile ? (
        <>
          <Text style={styles.noPostText}>No posts yet...</Text>
          <Text style={styles.noPostText}>Create your first post now!</Text>
        </>
      ) : (
        <Text style={styles.noPostText}>{userNickName} has nothing posted yet...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  noPostTextWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    marginBottom: -11,
  },
  noPostText: {
    fontFamily: "Roboto-Regular",
    fontSize: 20,
    color: "#212121",
  },
});
