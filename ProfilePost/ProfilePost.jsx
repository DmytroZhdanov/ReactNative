import { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// icon import
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default function ProfilePost({ item, navigation }) {
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

  const handleCommentsPress = () => {
    navigation.navigate("Comments", { postId: item.id });
  };

  return (
    <View style={styles.container}>
      <Image
        source={item.image}
        alt={item.name}
        style={{ ...styles.image, width: windowWidth - 32, height: (windowWidth - 32) / 1.43 }}
        resizeMode={"cover"}
      />
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.details}>
        <TouchableOpacity
          style={styles.detailsItem}
          activeOpacity={0.7}
          onPress={handleCommentsPress}
        >
          <FontAwesome name="comment" size={24} color="#FF6C00" />
          <Text style={{ ...styles.detailsText, marginLeft: 6 }}>{item.comments.length}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ ...styles.detailsItem, marginLeft: 24 }} activeOpacity={0.7}>
          <Feather name="thumbs-up" size={24} color="#FF6C00" />
          <Text style={{ ...styles.detailsText, marginLeft: 6 }}>{item.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ ...styles.detailsItem, marginLeft: "auto" }} activeOpacity={0.7}>
          <Feather name="map-pin" size={24} color="#BDBDBD" />
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
    paddingBottom: 32,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
  },
  image: {
    borderRadius: 8,
  },
  name: {
    marginVertical: 8,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#212121",
  },
  details: {
    flexDirection: "row",
  },
  detailsItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailsText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
  },
});
