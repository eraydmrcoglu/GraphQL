import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Image } from "antd";
import { GET_POST_BY_ID } from "./queries.js";
import Comments from "./Comments.js";

function Post() {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_POST_BY_ID, {
    variables: {
      id,
    },
  });

  if (error) {
    return <div>Error {error.message} </div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  const { post } = data;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.description} </p>
      <Image src={post.cover} />
      <Comments post_id={id} />
    </div>
  );
}

export default Post;