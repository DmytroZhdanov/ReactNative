// import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";
import Home from "./Screens/Home";
import PostsScreen from "./Screens/PostsScreen";
import CreatePostsScreen from "./Screens/CreatePostsScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import CommentsScreen from "./Screens/CommentsScreen";
import CameraScreen from "./Screens/CameraScreen";
import SnapPreviewScreen from "./Screens/SnapPreviewScreen";
import MapScreen from "./Screens/MapScreen";

// icon import
import { Feather } from "@expo/vector-icons";

const Stack = createStackNavigator();

const headerOptions = { headerShown: false };

const commentsScreenOptions = {
  headerBackTitleVisible: false,
  headerBackImage: () => <Feather name="arrow-left" size={24} color="#212121" />,
  headerLeftContainerStyle: { paddingHorizontal: 16, paddingVertical: 10 },
  headerTitleAlign: "center",
  headerTitleStyle: { marginRight: 32 },
};

const createPostsScreenOptions = {
  headerTitle: "Create Post",
  headerTitleStyle: { marginRight: 32 },
  headerBackTitleVisible: false,
  headerBackImage: () => <Feather name="arrow-left" size={24} color="#212121" />,
  headerLeftContainerStyle: { paddingHorizontal: 16, paddingVertical: 10 },
};

const mapScreenOptions = {
  headerTitleStyle: { display: "none" },
  headerTransparent: true,
  headerBackTitleVisible: false,
  headerBackImage: () => <Feather name="arrow-left" size={24} color="#212121" />,
  headerLeftContainerStyle: { paddingHorizontal: 16, paddingVertical: 10 },
};

export default function useRouter(isAuth) {
  return isAuth ? (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={headerOptions} />
      <Stack.Screen name="Posts" component={PostsScreen} options={headerOptions} />
      <Stack.Screen name="CreatePosts" component={CreatePostsScreen} options={headerOptions} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={headerOptions} />
      <Stack.Screen name="Comments" component={CommentsScreen} options={commentsScreenOptions} />
      <Stack.Screen name="Camera" component={CameraScreen} options={headerOptions} />
      <Stack.Screen name="SnapPreview" component={SnapPreviewScreen} options={headerOptions} />
      <Stack.Screen name="Map" component={MapScreen} options={mapScreenOptions} />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Screen name="Register" component={RegistrationScreen} options={headerOptions} />
      <Stack.Screen name="Login" component={LoginScreen} options={headerOptions} />
    </Stack.Navigator>
  );
}
