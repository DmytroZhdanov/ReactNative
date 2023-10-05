// Component to render in ProfileScreen if user didn't publish any post
import { Dimensions, StyleSheet, Text, View } from "react-native";

export default function ProfileListEmpty({ isOwnProfile, userNickName }) {
  return (
    <View style={styles.noPostTextWrapper}>
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
    height: Dimensions.get("window").height - 390,
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
