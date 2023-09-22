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

export default function useRouter(isAuth) {
  // Temporary solution to handle login and logout. Will be deleted after authorization implementation
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={headerOptions} />
      <Stack.Screen name="Posts" component={PostsScreen} options={headerOptions} />
      <Stack.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={createPostsScreenOptions}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} options={headerOptions} />
      <Stack.Screen name="Comments" component={CommentsScreen} options={commentsScreenOptions} />
      <Stack.Screen name="Register" component={RegistrationScreen} options={headerOptions} />
      <Stack.Screen name="Login" component={LoginScreen} options={headerOptions} />
      <Stack.Screen name="Camera" component={CameraScreen} options={headerOptions} />
      <Stack.Screen name="SnapPreview" component={SnapPreviewScreen} options={headerOptions} />
    </Stack.Navigator>
  );

  // Working solution. Will be uncommented after authorization implementation
  // return isAuth ? (
  //   <Stack.Navigator>
  //     <Stack.Screen name="Home" component={Home} options={headerOptions} />
  //     <Stack.Screen name="Posts" component={PostsScreen} options={headerOptions} />
  //     <Stack.Screen name="CreatePosts" component={CreatePostsScreen} options={headerOptions} />
  //     <Stack.Screen name="Profile" component={ProfileScreen} options={headerOptions} />
  //     <Stack.Screen name="Comments" component={CommentsScreen} options={commentsScreenOptions} />
  //     <Stack.Screen name="Camera" component={CameraScreen} options={headerOptions} />;
  //   </Stack.Navigator>
  // ) : (
  //   <Stack.Navigator>
  //     <Stack.Screen name="Register" component={RegistrationScreen} options={headerOptions} />
  //     <Stack.Screen name="Login" component={LoginScreen} options={headerOptions} />
  //   </Stack.Navigator>
  // );
}
