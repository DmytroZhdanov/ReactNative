import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// icon import
import { Feather, FontAwesome } from "@expo/vector-icons";

export default function ProfilePostDetails(props) {
  const {
    item,
    commentsCount,
    likesCount,
    isUserLiked,
    onCommentPress,
    onLikePress,
    onLocationPress,
  } = props;
  
  const handleCommentsPress = () => {
    onCommentPress();
  };

  const handleLikePress = () => {
    onLikePress();
  };

  const handleLocationPress = () => {
    onLocationPress();
  };

  return (
    <>
      <Text style={styles.name}>{item.name}</Text>

      <View style={styles.details}>
        <TouchableOpacity
          style={styles.detailsItem}
          activeOpacity={0.7}
          onPress={handleCommentsPress}
        >
          <FontAwesome name="comment" size={24} color="#FF6C00" />

          <Text style={{ ...styles.detailsText, marginLeft: 6 }}>{commentsCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ ...styles.detailsItem, marginLeft: 24 }}
          activeOpacity={0.7}
          onPress={handleLikePress}
        >
          <Feather name="thumbs-up" size={24} color="#FF6C00" />

          <Text
            style={[{ ...styles.detailsText, marginLeft: 6 }, isUserLiked && { color: "#FF6C00" }]}
          >
            {likesCount}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ ...styles.detailsItem, marginLeft: "auto" }}
          activeOpacity={0.7}
          onPress={handleLocationPress}
          disabled={!item.location.coords}
        >
          <Feather name="map-pin" size={24} color="#BDBDBD" />

          <Text style={{ ...styles.detailsText, marginLeft: 4, textDecorationLine: "underline" }}>
            {item.location.title}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
