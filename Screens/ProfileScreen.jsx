import { useNavigation } from "@react-navigation/native";
import { View, ImageBackground, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";

import ProfilePost from "../components/ProfilePost/ProfilePost";
import ProfileListHeader from "../components/ProfileListHeader/ProfileListHeader";
import ProfileListEmpty from "../components/ProfileListEmpty/ProfileListEmpty";

import { selectNickName, selectUserId, selectUserPhoto } from "../redux/auth/authSelectors";

// Temporary solution as db
import { posts } from "../posts";

export default function ProfileScreen() {
  const navigation = useNavigation();

  const userNickName = useSelector(selectNickName);
  const userPhoto = useSelector(selectUserPhoto);
  const userId = useSelector(selectUserId);

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
