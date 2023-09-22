import { useNavigation, useRoute } from "@react-navigation/native";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// icons import
import { Ionicons } from "@expo/vector-icons";

export default function SnapPreviewScreen() {
  const windowWidth = Dimensions.get("window").width;

  const navigation = useNavigation();
  const { uri, coords } = useRoute().params;

  return (
    <View style={styles.container}>
      <Image
        style={{
          ...styles.image,
          width: windowWidth - 32,
          height: (windowWidth - 32) / 1.43,
        }}
        src={uri}
      />
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
  image: {
    borderRadius: 8,
    overflow: "hidden",
  },
  btnWrapper: {
    width: "100%",
    marginTop: 32,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: "50%",
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
    fontSize: 16,
  },
});
