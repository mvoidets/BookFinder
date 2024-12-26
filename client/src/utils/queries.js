import { gql } from '@apollo/client';


// Query to get the current user's data
export const GET_ME = gql`
  query getMe {
    me {
      savedBooks {
        bookId
        title
        authors
        description
        image
        link
      }
    }
  }
`;

// export const QUERY_USER = gql`
// query createUser($username: String!, $email: String!, $password: String!) {
//     createUser(username: $username, email: $email, password: $password) {
//         token
//         user {
//             _id
//             username
//             email
//             bookCount
//             savedBooks         
//     }
// }
// `;

export const QUERY_BOOKS = gql`
  query queryBooks($query: String!) {
    queryBooks(query: $query) {
      id
      title
      authors
      description
      image
    }
  }
`;

export const LOGIN_USER = gql`
query loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
        token
        user {
            _id
            username
      
        }
    }
}
`;

export const SAVE_BOOK = gql`
  mutation saveBook($id: ID!, $title: String!, $authors: [String]!, $description: String!, $image: String, $link: String) {
    saveBook(id: $id, title: $title, authors: $authors, description: $description, image: $image, link: $link) {
      savedBooks {
        bookId
        title
      }
    }
  }
`;
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      savedBooks {
        bookId
        title
      }
    }
  }
`;

