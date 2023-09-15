import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// icon import
import { Feather } from "@expo/vector-icons";

export default function HomePost({ item, navigation }) {
  const width = Dimensions.get("window").width;

  const handleCommentsPress = () => {
    navigation.navigate("Comments", { postId: item.id });
  };

  return (
    <View style={styles.container}>
      <Image
        source={item.image}
        alt={item.name}
        style={{ width: width - 32, borderRadius: 8 }}
        resizeMode={"cover"}
      />
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.details}>
        <TouchableOpacity
          onPress={handleCommentsPress}
          style={styles.detailWrapper}
          activeOpacity={0.6}
        >
          <Feather name="message-circle" size={24} color="#BDBDBD" />
          <Text style={{ ...styles.detailsText, marginLeft: 6 }}>{item.comments.length}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.detailWrapper} activeOpacity={0.6}>
          <Feather name="map-pin" size={24} color="#BDBDBD" style={{ marginLeft: "auto" }} />
          <Text style={{ ...styles.detailsText, marginLeft: 4, textDecorationLine: "underline" }}>
            {item.location}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  name: {
    marginVertical: 8,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#212121",
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailsText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#BDBDBD",
  },
});
