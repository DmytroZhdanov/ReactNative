import { useNavigation } from "@react-navigation/native";
import { View, ImageBackground, StyleSheet, FlatList } from "react-native";

import ProfilePost from "../components/ProfilePost/ProfilePost";
import ProfileListHeader from "../components/ProfileListHeader/ProfileListHeader";
import ProfileListEmpty from "../components/ProfileListEmpty/ProfileListEmpty";

// Temporary solution as db
import { posts } from "../posts";

export default function ProfileScreen() {
  const navigation = useNavigation();

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
          ListHeaderComponent={ProfileListHeader}
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
