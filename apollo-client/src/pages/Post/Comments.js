import { Divider, Button } from "antd";
import React, { useState } from "react";
import { Comment, List } from "antd";
import { useLazyQuery } from "@apollo/client";
import { GET_POST_COMMENTS_BY_ID } from "./queries";

// eslint-disable-next-line no-unused-vars
const comments2 = [
  {
    author: "Han Solo",
    avatar: "https://joeschmoe.io/api/v1/random",
    content: (
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure), to help people create their
        product prototypes beautifully and efficiently.
      </p>
    ),
  },
  {
    author: "Han Solo",
    avatar: "https://joeschmoe.io/api/v1/random",
    content: (
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure), to help people create their
        product prototypes beautifully and efficiently.
      </p>
    ),
  },
];

function Comments({ post_id }) {
  const [btnIsVisible, setBtnIsVisible] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [loadGreeting, { called, loading, data }] = useLazyQuery(
    GET_POST_COMMENTS_BY_ID,
    { variables: { id: post_id } }
  );

  const getComments = () => {
    loadGreeting();
    setBtnIsVisible(false);
  };

  console.log(data);
  return (
    <>
      <Divider>Comments</Divider>
      {btnIsVisible && (
        <Button loading={loading} onClick={getComments}>
          Show Comments
        </Button>
      )}
      {!loading && data && (
        <List
          className="comment-list"
          header={`${data.post.comments.length} replies`}
          itemLayout="horizontal"
          dataSource={data.post.comments}
          renderItem={(item) => (
            <li>
              <Comment
                author={item.user.fullName}
                avatar={item.user.profile_photo}
                content={item.text}
              />
            </li>
          )}
        />
      )}
    </>
  );
}
export default Comments;