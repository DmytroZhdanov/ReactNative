import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, ImageBackground, StyleSheet, FlatList } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";

import { db } from "../firebase/config";

import ProfilePost from "../components/ProfilePost/ProfilePost";
import ProfileListHeader from "../components/ProfileListHeader/ProfileListHeader";
import ProfileListEmpty from "../components/ProfileListEmpty/ProfileListEmpty";
import { useSelector } from "react-redux";
import { selectNickName, selectUserId, selectUserPhoto } from "../redux/auth/authSelectors";

export default function ProfileScreen() {
  const [posts, setPosts] = useState(null);

  const navigation = useNavigation();

  const userId = useSelector(selectUserId);
  const userNickName = useSelector(selectNickName);
  const userPhoto = useSelector(selectUserPhoto);

  const getAllPosts = async () => {
    const reference = await collection(db, "posts");
    await onSnapshot(reference, data =>
      setPosts(
        data.docs
          .filter(doc => doc.data().author.id === userId)
          .map(doc => ({ ...doc.data(), id: doc.id }))
      )
    );
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background.jpg")}
        style={styles.background}
      >
        <FlatList
          data={posts}
          renderItem={({ item }) => <ProfilePost item={item} navigation={navigation} />}
          keyExtractor={item => item.id}
          ListHeaderComponent={() => (
            <ProfileListHeader userNickName={userNickName} userPhoto={userPhoto} userId={userId} />
          )}
          style={styles.contentWrapper}
          ListEmptyComponent={ProfileListEmpty}
          ListFooterComponent={<></>}
          ListFooterComponentStyle={styles.contentFooter}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  contentWrapper: {
    paddingTop: 87,
  },
  contentFooter: {
    height: 98,
    backgroundColor: "#ffffff",
  },
});
