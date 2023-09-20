import { Image, StyleSheet, Text, View } from "react-native";

export default function Comment({ item, windowWidth }) {
  // Temporary solution for styling comment item
  const isAuthorizedUser = false;

  return (
    <View style={[styles.commentWrapper, isAuthorizedUser && { flexDirection: "row-reverse" }]}>
      <Image source={item.author.image} style={styles.image} />
      <View
        style={[
          styles.commentContainer,
          { width: windowWidth - 76 },
          isAuthorizedUser ? { borderTopLeftRadius: 6 } : { borderTopRightRadius: 6 },
        ]}
      >
        <Text style={styles.commentText}>{item.text}</Text>
        <Text style={[styles.commentTime, !isAuthorizedUser && { textAlign: "right" }]}>
          {item.time}
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
  },
  commentContainer: {
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
