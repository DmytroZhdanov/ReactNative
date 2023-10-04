import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// icon import
import { Feather } from "@expo/vector-icons";

export default function HomePostDetails(props) {
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
      <View style={styles.descriptionWrapper}>
        <Text style={styles.name}>{item.name}</Text>

        <View style={styles.author}>
          <Feather name="user" size={20} color="rgba(33, 33, 33, 0.8)" />
          <Text style={styles.authorName}>{item.author.nickName}</Text>
        </View>
      </View>

      <View style={styles.details}>
        <TouchableOpacity
          onPress={handleCommentsPress}
          style={styles.detailWrapper}
          activeOpacity={0.6}
        >
          <Feather name="message-circle" size={24} color="#BDBDBD" />
          <Text style={{ ...styles.detailsText, marginLeft: 6 }}>{commentsCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ ...styles.detailWrapper, marginLeft: 24 }}
          activeOpacity={0.7}
          onPress={handleLikePress}
        >
          <Feather name="thumbs-up" size={24} color={isUserLiked ? "#FF6C00" : "#BDBDBD"} />

          <Text
            style={[{ ...styles.detailsText, marginLeft: 6 }, isUserLiked && { color: "#FF6C00" }]}
          >
            {likesCount}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ ...styles.detailWrapper, marginLeft: "auto" }}
          activeOpacity={0.6}
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
  descriptionWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  name: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#212121",
  },
  author: {
    flexDirection: "row",
    alignItems: "center",
  },
  authorName: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
    marginLeft: 8,
  },
  details: {
    flexDirection: "row",
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
