import { useRoute } from "@react-navigation/native";
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
import { useState } from "react";

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

  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  const handleCommentSend = () => {
    Keyboard.dismiss();
    console.log(comment);
    setComment("");
  };

  return (
    <View
      style={[
        { ...styles.container, height: height - 103 },
        isInputFocused && { paddingBottom: 340 },
      ]}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <>
          <FlatList
            data={post.comments}
            renderItem={Comment}
            ListHeaderComponent={
              <Image
                source={post.image}
                alt={post.name}
                style={{ width: width - 32, borderRadius: 8 }}
                resizeMode={"cover"}
              />
            }
            ListHeaderComponentStyle={{ marginBottom: 32 }}
            ListEmptyComponent={CommentsListEmpty}
            style={{ marginBottom: 43 }}
          />
          <KeyboardAvoidingView behavior="position">
            <View style={[styles.commentInputWrapper, isInputFocused && { bottom: 16 }]}>
              <TextInput
                placeholder="Comment..."
                placeholderTextColor="#BDBDBD"
                style={{ ...styles.input, width: width - 32 }}
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
    bottom: -16,
    left: 0,
  },
  input: {
    maxHeight: 100,
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
