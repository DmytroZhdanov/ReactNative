import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { collection, onSnapshot } from "firebase/firestore";

import { db } from "../firebase/config";

import HomePost from "../components/HomePost/HomePost";

import { selectEmail, selectNickName, selectUserPhoto } from "../redux/auth/authSelectors";

export default function PostsScreen() {
  const [posts, setPosts] = useState(null);

  const navigation = useNavigation();

  const userNickName = useSelector(selectNickName);
  const userEmail = useSelector(selectEmail);
  const userPhoto = useSelector(selectUserPhoto);

  const getAllPosts = async () => {
    const reference = await collection(db, "posts");
    await onSnapshot(reference, data =>
      setPosts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    );
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <View style={styles.photoWrapper}>
          <Image source={{ uri: userPhoto }} alt={"User Image"} style={styles.userImage} />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userNickName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        renderItem={({ item }) => <HomePost item={item} navigation={navigation} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  user: {
    flexDirection: "row",
    marginVertical: 32,
    marginLeft: 16,
  },
  photoWrapper: {
    borderRadius: 16,
    overflow: "hidden",
  },
  userImage: {
    width: 60,
    height: 60,
    backgroundColor: "#f6f6f6",
  },
  userInfo: {
    marginLeft: 8,
    justifyContent: "center",
  },
  userName: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    color: "#212121",
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    color: " rgba(33, 33, 33, 0.80)",
  },
});
