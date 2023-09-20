import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";

import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

// icons import
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const Tabs = createBottomTabNavigator();

export default function Home() {
  const navigation = useNavigation();

  const tabBarOptions = {
    common: {
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontSize: 17,
        fontFamily: "Roboto-Medium",
        color: "#212121",
        paddingVertical: 11,
        paddingHorizontal: 48,
      },
      tabBarShowLabel: false,
      tabBarStyle: { height: Platform.OS === "ios" ? 83 : 63 },
    },
    postsScreen: {
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout} activeOpacity={0.7}>
          <Feather name="log-out" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      ),
      headerRightContainerStyle: { paddingHorizontal: 16, paddingVertical: 10 },
      headerTitleStyle: { marginLeft: 32 },
      tabBarIcon: () => (
        <Feather name="grid" size={24} color="rgba(33, 33, 33, 0.8)" style={styles.tabBtnLeft} />
      ),
      tabBarAccessibilityLabel: "Posts",
    },
    createPostScreen: {
      headerTitle: "Create Post",
      headerLeft: () => (
        <Feather name="arrow-left" size={24} color="#212121" onPress={navigation.goBack} />
      ),
      headerLeftContainerStyle: { paddingHorizontal: 16, paddingVertical: 10 },
      headerTitleStyle: { marginRight: 32 },
      tabBarIcon: () => (
        <View style={styles.tabBtnCenter}>
          <AntDesign name="plus" size={20} color="#ffffff" />
        </View>
      ),
      tabBarStyle: { display: "none" },
      tabBarAccessibilityLabel: "Create Post",
    },
    profileScreen: {
      headerShown: false,
      tabBarIcon: () => (
        <Feather name="user" size={24} color="rgba(33, 33, 33, 0.8)" style={styles.tabBtnRight} />
      ),
      tabBarAccessibilityLabel: "Profile",
    },
  };

  const handleLogout = () => {
    navigation.navigate("Login");
  };

  return (
    <Tabs.Navigator screenOptions={tabBarOptions.common}>
      <Tabs.Screen name="Posts" component={PostsScreen} options={tabBarOptions.postsScreen} />
      <Tabs.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={tabBarOptions.createPostScreen}
      />
      <Tabs.Screen name="Profile" component={ProfileScreen} options={tabBarOptions.profileScreen} />
    </Tabs.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBtnLeft: {
    marginTop: 17,
    marginLeft: "auto",
    marginRight: 12,
  },
  tabBtnRight: {
    marginTop: 17,
    marginRight: "auto",
    marginLeft: 12,
  },
  tabBtnCenter: {
    width: 70,
    height: 40,
    borderRadius: 35,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 9,
  },
});
