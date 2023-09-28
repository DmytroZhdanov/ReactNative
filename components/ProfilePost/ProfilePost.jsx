import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// icon import
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import { db } from "../../firebase/config";
import { addDoc, collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserId } from "../../redux/auth/authSelectors";

export default function ProfilePost({ item, navigation }) {
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

  const countAllComments = async () => {
    const reference = await collection(db, `posts/${item.id}/comments`);
    await onSnapshot(reference, data => setCommentsCount(data.docs.length));
  };

  const countAllLikes = async () => {
    const reference = await collection(db, `posts/${item.id}/likes`);
    await onSnapshot(reference, data => setLikesCount(data.docs.length));
  };

  const handleCommentsPress = () => {
    navigation.navigate("Comments", { postId: item.id });
  };

  const handleLikePress = async () => {
    const reference = await collection(db, `posts/${item.id}/likes`);

    if (isUserLiked) {
      await onSnapshot(reference, data =>
        setLikeId(data.docs.find(doc => doc.data().userId === userId)?.id)
      );
      const likeDocRef = await doc(db, `posts/${item.id}/likes/${likeId}`);
      await deleteDoc(likeDocRef);
    } else {
      await addDoc(reference, { userId });
    }
  };

  const checkIsUserLiked = async () => {
    const reference = await collection(db, `posts/${item.id}/likes`);
    await onSnapshot(reference, data =>
      setIsUserLiked(data.docs.find(doc => doc.data().userId === userId) ? true : false)
    );
  };

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
