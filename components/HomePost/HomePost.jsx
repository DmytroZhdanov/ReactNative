// Component to render one post on PostsScreen
import { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { addDoc, collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { selectUserId } from "../../redux/auth/authSelectors";

// icon import
import { Feather } from "@expo/vector-icons";

export default function HomePost({ item, navigation }) {
  const [commentsCount, setCommentsCount] = useState(null);
  const [likesCount, setLikesCount] = useState(null);
  const [isUserLiked, setIsUserLiked] = useState(null);
  const [likeId, setLikeId] = useState(null);

  const userId = useSelector(selectUserId);

  const windowWidth = Dimensions.get("window").width;

  useEffect(() => {
    countAllComments();
    countAllLikes();
    checkIsUserLiked();
  }, []);

  /**
   * Count number of comments published to current post and set it to component state
   */
  const countAllComments = async () => {
    const reference = collection(db, `posts/${item.id}/comments`);
    onSnapshot(reference, data => setCommentsCount(data.docs.length));
  };

  /**
   * Count number of users who liked this post and set it to component state
   */
  const countAllLikes = async () => {
    const reference = collection(db, `posts/${item.id}/likes`);
    onSnapshot(reference, data => setLikesCount(data.docs.length));
  };

  /**
   * Check if current user liked this post and set boolean to component state
   */
  const checkIsUserLiked = async () => {
    const reference = collection(db, `posts/${item.id}/likes`);
    onSnapshot(reference, data =>
      setIsUserLiked(data.docs.find(doc => doc.data().userId === userId) ? true : false)
    );
  };

  /**
   * Navigate to CommentsScreen passing postId as parameter
   */
  const handleCommentsPress = () => {
    navigation.navigate("Comments", { postId: item.id });
  };

  /**
   * Check component state to get info about liked the current user this post before or not.
   * If already liked - removes user from the list who liked this post.
   * If didn't liked before - add user to the list who liked this post.
   */
  const handleLikePress = async () => {
    const reference = collection(db, `posts/${item.id}/likes`);

    if (isUserLiked) {
      onSnapshot(reference, data =>
        setLikeId(data.docs.find(doc => doc.data().userId === userId)?.id)
      );
      const likeDocRef = doc(db, `posts/${item.id}/likes/${likeId}`);
      await deleteDoc(likeDocRef);
    } else {
      await addDoc(reference, { userId });
    }
  };

  /**
   * Navigate to MapScreen passing location coordinates as parameter
   */
  const handleLocationPress = () => {
    navigation.navigate("Map", { coords: item.location.coords });
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item.image }}
        alt={item.name}
        style={{ width: windowWidth - 32, height: (windowWidth - 32) / 1.43, borderRadius: 8 }}
        resizeMode={"cover"}
      />

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
    paddingHorizontal: 16,
  },
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
