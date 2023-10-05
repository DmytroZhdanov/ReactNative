// Component to render ProfileScreen
import { useCallback, useState } from "react";
import { View, ImageBackground, StyleSheet, FlatList } from "react-native";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

import ProfileListHeader from "../components/ProfileListHeader/ProfileListHeader";
import Post from "../components/Post/Post";
import ProfileListEmpty from "../components/ProfileListEmpty/ProfileListEmpty";

import { selectNickName, selectUserId, selectUserPhoto } from "../redux/auth/authSelectors";

import { POST_TYPES } from "../utils/variables";

export default function ProfileScreen() {
  const [profileId, setProfileId] = useState(null);
  const [profileNickName, setProfileNickName] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isOwnProfile, setIsOwnProfile] = useState(null);
  const [posts, setPosts] = useState(null);

  const navigation = useNavigation();
  const { params } = useRoute();

  const userId = useSelector(selectUserId);
  const userNickName = useSelector(selectNickName);
  const userPhoto = useSelector(selectUserPhoto);

  useFocusEffect(
    useCallback(() => {
      setProfileId(params ? params.id : userId);
      setProfileNickName(params ? params.nickName : userNickName);
      setProfilePhoto(params ? params.photo : userPhoto);
    }, [params])
  );

  useFocusEffect(
    useCallback(() => {
      setIsOwnProfile(profileId === userId ? true : false);
      getAllPosts();
      const unsubscribe = navigation.addListener("blur", () => {
        navigation.setParams({ id: userId, nickName: userNickName, photo: userPhoto});
      });

      return unsubscribe;
    }, [profileId])
  );

  /**
   * Get all posts published by current user from database and set it to component state
   */
  const getAllPosts = async () => {
    const reference = collection(db, "posts");

    onSnapshot(reference, data =>
      setPosts(
        data.docs
          .filter(doc => doc.data().author.id === profileId)
          .map(doc => ({ ...doc.data(), id: doc.id }))
          .sort((firstPost, secondPost) => secondPost.createdAt - firstPost.createdAt)
      )
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background.jpg")}
        style={styles.background}
      >
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <Post item={item} navigation={navigation} type={POST_TYPES.PROFILE} />
          )}
          keyExtractor={item => item.id}
          ListHeaderComponent={() => (
            <ProfileListHeader
              userNickName={profileNickName}
              userPhoto={profilePhoto}
              userId={profileId}
              isOwnProfile={isOwnProfile}
            />
          )}
          style={styles.contentWrapper}
          ListEmptyComponent={() => (
            <ProfileListEmpty isOwnProfile={isOwnProfile} userNickName={profileNickName} />
          )}
          ListFooterComponent={<></>}
          ListFooterComponentStyle={[
            styles.contentFooter,
            posts?.length === 1 && { height: "100%" },
          ]}
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
