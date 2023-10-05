// Component for rendering one post comment
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { selectUserId } from "../../redux/auth/authSelectors";
import { transformDate } from "../../utils/transformDate";

export default function Comment({ item }) {
  const { id, image } = item.author;

  const userId = useSelector(selectUserId);
  const isAuthorizedUser = id === userId;

  const commentTime = transformDate(item.time);

  return (
    <View style={[styles.commentWrapper, isAuthorizedUser && { flexDirection: "row-reverse" }]}>
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <View style={styles.image}></View>
      )}

      <View
        style={[
          styles.commentContainer,
          isAuthorizedUser ? { borderTopLeftRadius: 6 } : { borderTopRightRadius: 6 },
        ]}
      >
        <Text style={styles.commentText}>{item.text}</Text>

        <Text style={[styles.commentTime, !isAuthorizedUser && { textAlign: "right" }]}>
          {commentTime}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  commentWrapper: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },
  image: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#f6f6f6",
  },
  commentContainer: {
    width: Dimensions.get("window").width - 76,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    padding: 16,
    gap: 8,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  commentText: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    color: "#212121",
    lineHeight: 18,
  },
  commentTime: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    color: "#BDBDBD",
  },
});
