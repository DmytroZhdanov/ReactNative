import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import Comment from "../Comment/Comment";
import CommentsListEmpty from "../CommentsListEmpty/CommentsListEmpty";

// icon import
import { Feather } from "@expo/vector-icons";

// Temporary solution as db
const { posts } = require("../posts");

export default function CommentsScreen() {
  const [comment, setComment] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const { postId } = useRoute().params;
  const post = posts.find(post => post.id === postId);

  const [windowWidth, setWindowWidth] = useState(Dimensions.get("window").width);
  const [windowHeight, setWindowHeight] = useState(Dimensions.get("window").height);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      const height = Dimensions.get("window").height;
      setWindowWidth(width);
      setWindowHeight(height);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const handleCommentSend = () => {
    Keyboard.dismiss();
    console.log(comment);
    setComment("");
  };

  return (
    <View
      style={[
        styles.container,
        { height: windowHeight - (Platform.OS === "ios" ? 103 : 80) },
        isInputFocused && { paddingBottom: 340 },
      ]}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <>
          <FlatList
            data={post.comments}
            renderItem={({ item }) => <Comment item={item} windowWidth={windowWidth} />}
            ListHeaderComponent={
              <Image
                source={post.image}
                alt={post.name}
                style={{ width: windowWidth - 32, borderRadius: 8 }}
                resizeMode={"cover"}
              />
            }
            ListHeaderComponentStyle={{ marginBottom: 32 }}
            ListEmptyComponent={CommentsListEmpty}
            style={[
              { marginBottom: Platform.OS === "ios" ? 8 : -16 },
              isInputFocused && { marginBottom: Platform.OS === "ios" ? 40 : 8 },
            ]}
          />
          <KeyboardAvoidingView behavior="position">
            <View
              style={[
                styles.commentInputWrapper,
                { bottom: Platform.OS === "ios" ? -16 : -48 },
                isInputFocused && { bottom: Platform.OS === "ios" ? 16 : -16 },
              ]}
            >
              <TextInput
                placeholder="Comment..."
                placeholderTextColor="#BDBDBD"
                inputMode="text"
                style={{ ...styles.input, width: windowWidth - 32 }}
                multiline={true}
                onChangeText={value => setComment(value)}
                value={comment}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
              />
              <TouchableOpacity
                style={styles.sendBtn}
                activeOpacity={0.7}
                disabled={comment === ""}
                onPress={handleCommentSend}
              >
                <Feather name="arrow-up" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 57,
    backgroundColor: "#ffffff",
  },
  commentInputWrapper: {
    position: "absolute",
    left: 0,
  },
  input: {
    height: 50,
    // maxHeight: 100,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 25,
    paddingTop: 16,
    paddingRight: 42,
    paddingBottom: 15,
    paddingLeft: 16,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#212121",
  },
  sendBtn: {
    position: "absolute",
    bottom: 9,
    right: 8,
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 17,
  },
});
