import React, { useEffect, useState } from "react";
import { Container, PostForm, LoadingScreen } from "../components";
import { useParams } from "react-router-dom";
import authService from "../appwrite/config";
import appwriteService from "../appwrite/config";

const EditPost = () => {
  const [post, setPost] = useState(null);
  const id = useParams();
  // console.log(id.id);

  useEffect(() => {
    appwriteService.getPost(id.id).then((e) => {
      if (e) {
        setPost(e);
      }
    });
  }, [id]);

  return (
    <div>
      <Container>
        {!post ? <LoadingScreen /> : <PostForm post={post} />}
      </Container>
    </div>
  );
};

export default EditPost;
