// Component to render when no any post comments posted yet
import { Dimensions, StyleSheet, Text, View } from "react-native";

export default function CommentsListEmpty() {
  return (
    <View style={styles.noPostTextWrapper}>
      <Text style={styles.noPostText}>No any comments yet...</Text>
      <Text style={styles.noPostText}>Write the first one!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  noPostTextWrapper: {
    flex: 1,
    height: Dimensions.get("window").height - 512,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    paddingBottom: 110,
  },
  noPostText: {
    fontFamily: "Roboto-Regular",
    fontSize: 20,
    color: "#212121",
  },
});
