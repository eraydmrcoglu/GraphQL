import { gql } from "@apollo/client";
export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      description
      user {
        fullName
        profile_photo
      }
    }
  }
`;

export const POST_SUBSCRIPTION = gql`
  subscription {
    postCreated {
      id
      title
      user_name
    }
  }
`;
