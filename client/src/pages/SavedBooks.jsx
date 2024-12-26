import { useState, useEffect } from 'react';
import { Container,  Card,  Button,  Row,  Col} from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ME, REMOVE_BOOK, SAVE_BOOK } from '../utils/queries';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';


const SavedBooks = ({ book }) => {
  const { data, loading, error } = useQuery(GET_ME); // Query to fetch the current user's data

  const [saveBook] = useMutation(SAVE_BOOK); // Mutation to save a book
  const [removeBook] = useMutation(REMOVE_BOOK); // Mutation to remove a book

  const handleSave = () => {
    saveBook({
      variables: {
        id: book.id,
        title: book.title,
        authors: book.authors,
        description: book.description,
        image: book.image,
        link: book.link,
      },
    });
  };

  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeBook({ variables: { bookId } });

      // Upon success, remove the book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // While the data is being loaded
  if (loading) return <h2>LOADING...</h2>;

  // Handle errors in fetching data
  if (error) return <h2>Error: {error.message}</h2>;

  const userData = data?.me || {}; // User data is returned by GET_ME query

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData.savedBooks && userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks?.map((book) => {
            return (
              <Col md="4" key={book.bookId}>
                <Card border="dark">
                  {book.image && <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant="top" />}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className="small">Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className="btn-block btn-danger" onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;