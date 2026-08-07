import React, { useState } from "react";
import { Container, PostForm } from "../components";
import { setError, setPosts as setPostsInStore } from "../store/postsSlice";
import { useDispatch } from "react-redux";
import authService from "../appwrite/config";

const CreatePost = () => {
  const dispatch = useDispatch();
  // const [submitStatus, setSubmitStatus] = useState(false);

  async function handleSubmitStatus() {
    authService
      .getPosts()
      .then((posts) => {
        if (posts) {
          dispatch(setPostsInStore(posts.rows));
        }
      })
      .catch((error) => dispatch(setError(error.message)));
  }

  return (
    <div>
      <Container>
        <PostForm onSubmitForm={handleSubmitStatus} />
      </Container>
    </div>
  );
};

export default CreatePost;
