import React, { useEffect, useState } from "react";
import { Container, PostForm, LoadingScreen } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import authService from "../appwrite/config";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const EditPost = () => {
  const [post, setPost] = useState(null);
  const id = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userData);

  useEffect(() => {
    appwriteService.getPost(id.id).then((e) => {
      if (e.userId !== user.$id) {
        toast.error("access denied");
        navigate("/");
        return;
      }
      setPost(e);
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
