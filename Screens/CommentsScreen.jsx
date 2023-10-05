// Component to render CommentsScreen with relevant comments to appropriate post
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
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

import { db } from "../firebase/config";

import Comment from "../components/Comment/Comment";
import CommentsListEmpty from "../components/CommentsListEmpty/CommentsListEmpty";

import { selectNickName, selectUserId, selectUserPhoto } from "../redux/auth/authSelectors";

// icon import
import { Feather } from "@expo/vector-icons";

export default function CommentsScreen() {
  const [post, setPost] = useState(null);
  const [allComments, setAllComments] = useState([]);
  const [comment, setComment] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const userId = useSelector(selectUserId);
  const userPhoto = useSelector(selectUserPhoto);
  const userName = useSelector(selectNickName);

  const { postId } = useRoute().params;

  useEffect(() => {
    getCurrentPost();
    getAllComments();
  }, []);

  /**
   * Get appropriate post details from database and set it to component state
   */
  const getCurrentPost = async () => {
    const reference = collection(db, "posts");
    onSnapshot(reference, data => setPost(data.docs.filter(doc => doc.id === postId)[0].data()));
  };

  /**
   * Get all comments details relevant to the current post and set it to component state
   */
  const getAllComments = async () => {
    const reference = collection(db, `posts/${postId}/comments`);
    onSnapshot(reference, data =>
      setAllComments(
        data.docs
          .map(doc => doc.data())
          .sort((firstComment, secondComment) => firstComment.time - secondComment.time)
      )
    );
  };

  /**
   * Publish new comment and reset component comment state
   */
  const handleCommentSend = () => {
    Keyboard.dismiss();

    const newComment = {
      author: {
        id: userId,
        name: userName,
        image: userPhoto,
      },
      text: comment,
      time: Date.now(),
    };

    addComment(newComment);

    setComment("");
  };

  /**
   * Upload comment details to to database to relevant post
   * @param {Object} comment Comment details
   */
  const addComment = async comment => {
    const reference = collection(db, `posts/${postId}/comments`);
    await addDoc(reference, comment);
  };

  return (
    <View style={[styles.container, isInputFocused && { paddingBottom: 340 }]}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <>
          <FlatList
            data={allComments}
            renderItem={({ item }) => <Comment item={item} />}
            ListHeaderComponent={
              <Image
                source={{ uri: post?.image }}
                alt={post?.name}
                style={styles.image}
                resizeMode={"cover"}
              />
            }
            ListHeaderComponentStyle={{ marginBottom: 32 }}
            ListEmptyComponent={CommentsListEmpty}
            style={[
              styles.commentsContainer,
              isInputFocused && { marginBottom: Platform.OS === "ios" ? 40 : 8 },
            ]}
          />

          <KeyboardAvoidingView behavior="position">
            <View
              style={[
                styles.commentInputWrapper,
                isInputFocused && { bottom: Platform.OS === "ios" ? 16 : -16 },
              ]}
            >
              <TextInput
                placeholder="Comment..."
                placeholderTextColor="#BDBDBD"
                inputMode="text"
                style={styles.input}
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
    height: Dimensions.get("window").height - (Platform.OS === "ios" ? 103 : 80),
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 57,
    backgroundColor: "#ffffff",
  },
  image: {
    width: Dimensions.get("window").width - 32,
    borderRadius: 8,
    height: (Dimensions.get("window").width - 32) / 1.43,
  },
  commentsContainer: {
    marginBottom: Platform.OS === "ios" ? 8 : -16,
  },
  commentInputWrapper: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? -16 : -48,
    left: 0,
  },
  input: {
    width: Dimensions.get("window").width - 32,
    height: 50,
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
