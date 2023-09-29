// Component to render when no any post comments posted yet
import { Dimensions, StyleSheet, Text, View } from "react-native";

export default function CommentsListEmpty() {
  const windowHeight = Dimensions.get("window").height;

  return (
    <View style={{ ...styles.noPostTextWrapper, height: windowHeight - 472 }}>
      <Text style={styles.noPostText}>No any comments yet...</Text>
      <Text style={styles.noPostText}>Write the first one!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  noPostTextWrapper: {
    flex: 1,
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
