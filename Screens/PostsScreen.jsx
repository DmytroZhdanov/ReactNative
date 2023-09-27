import { useNavigation } from "@react-navigation/native";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

import HomePost from "../components/HomePost/HomePost";

// Temporary solution as db
import { posts } from "../posts";

const userImage = require("../assets/images/userImage.jpg");

export default function PostsScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <View style={styles.photoWrapper}>
          <Image source={userImage} alt={"User Image"} style={styles.userImage} />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
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
