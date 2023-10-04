import { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import { addDoc, collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";

import { selectUserId } from "../../redux/auth/authSelectors";

import HomePostDetails from "../HomePostDetails/HomePostDetails";
import ProfilePostDetails from "../ProfilePostDetails/ProfilePostDetails";

import { POST_TYPES } from "../../utils/variables";

export default function Post({ item, navigation, type }) {
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
        style={{ ...styles.image, width: windowWidth - 32, height: (windowWidth - 32) / 1.43 }}
        resizeMode={"cover"}
      />

      {type === POST_TYPES.HOME && (
        <HomePostDetails
          item={item}
          commentsCount={commentsCount}
          likesCount={likesCount}
          isUserLiked={isUserLiked}
          onCommentPress={handleCommentsPress}
          onLikePress={handleLikePress}
          onLocationPress={handleLocationPress}
        />
      )}

      {type === POST_TYPES.PROFILE && (
        <ProfilePostDetails
          item={item}
          commentsCount={commentsCount}
          likesCount={likesCount}
          isUserLiked={isUserLiked}
          onCommentPress={handleCommentsPress}
          onLikePress={handleLikePress}
          onLocationPress={handleLocationPress}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 32,
    paddingHorizontal: 16,

    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ffffff",
  },
  image: {
    borderRadius: 8,
  },
});
