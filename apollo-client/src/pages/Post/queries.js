import { gql } from "@apollo/client";
export const GET_POST_BY_ID = gql`
  query getPost($id: ID!) {
    post(id: $id) {
      id
      title
      description
      cover
    }
  }
`;

export const GET_POST_COMMENTS_BY_ID = gql`
  query getPost($id: ID!) {
    post(id: $id) {
      comments {
        text
        user {
          fullName
          profile_photo
        }
      }
    }
  }
`;
