import { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

export default function ProfileListEmpty() {
  const [windowHeight, setWindowHeight] = useState(Dimensions.get("window").height);

  useEffect(() => {
    const onChange = () => {
      const height = Dimensions.get("window").height;
      setWindowHeight(height);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <View style={{ ...styles.noPostTextWrapper, height: windowHeight - 390 }}>
      <Text style={styles.noPostText}>No posts yet...</Text>
      <Text style={styles.noPostText}>Create your first post now!</Text>
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
