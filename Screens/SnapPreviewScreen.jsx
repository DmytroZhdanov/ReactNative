// Component to render SnapPreviewScreen
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

// icons import
import { Ionicons } from "@expo/vector-icons";

export default function SnapPreviewScreen() {
  const navigation = useNavigation();
  const { uri, coords } = useRoute().params;

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image style={styles.image} src={uri} />
      </View>

      <View style={styles.btnWrapper}>
        <TouchableOpacity
          style={{ ...styles.btn, ...styles.backBtn }}
          activeOpacity={0.7}
          onPress={navigation.goBack}
        >
          <Ionicons
            name="md-arrow-undo-sharp"
            size={24}
            color="#FF6C00"
            style={{ marginRight: 16 }}
          />

          <Text style={{ ...styles.text, color: "#FF6C00" }}>Retake</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ ...styles.btn, ...styles.doneBtn }}
          activeOpacity={0.7}
          onPress={() => navigation.replace("CreatePosts", { uri, coords })}
        >
          <Text style={{ ...styles.text, color: "#ffffff" }}>Done</Text>
          
          <Ionicons name="checkmark-done" size={24} color="#ffffff" style={{ marginLeft: 16 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: "center",
    paddingTop: 200,
  },
  imageWrapper: {
    borderRadius: 8,
    overflow: "hidden",
    width: Dimensions.get("window").width - 32,
    height: (Dimensions.get("window").width - 32) / 1.43,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  btnWrapper: {
    width: "100%",
    marginTop: 32,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btn: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
  },
  backBtn: {
    borderWidth: 1,
    borderColor: "#FF6C00",
    paddingHorizontal: 31,
    paddingVertical: 15,
  },
  doneBtn: {
    backgroundColor: "#FF6C00",
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 20,
  },
});
