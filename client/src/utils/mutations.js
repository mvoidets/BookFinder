import {gql } from '@apollo/client'

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
            email
            
        }
    }
}
`;
export const LOGIN_USER = gql`
mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
            email
            
        }
    }
}
`;



// Mutation to remove a book from saved books
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

// Mutation to save a new book
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
