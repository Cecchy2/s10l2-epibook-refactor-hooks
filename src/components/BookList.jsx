import { Component } from "react";
import SingleBook from "./SingleBook";
import fantasy from "../data/fantasy.json";
import horror from "../data/horror.json";
import history from "../data/history.json";
import romance from "../data/romance.json";
import scifi from "../data/scifi.json";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import CommentArea from "./CommentArea";

class BookList extends Component {
  state = {
    books: fantasy,
    searchBar: "",
    selected: false,
    selectedBookAsin: null,
  };

  setBooks = (genere) => {
    this.setState({ books: genere });
  };

  render() {
    const filteredBooks = this.state.books.filter((book) =>
      book.title.toLowerCase().includes(this.state.searchBar.toLowerCase())
    );
    console.log(filteredBooks);

    return (
      <Container>
        <Row>
          <Col>
            <Form className="text-start d-flex justify-content-center align-items-center">
              <Form.Group className="w-50" controlId="formName">
                <Form.Control
                  type="text"
                  placeholder="Cerca il tuo libro"
                  value={this.state.searchBar}
                  onChange={(event) => {
                    event.preventDefault();
                    this.setState({ searchBar: event.target.value });
                  }}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            <Button variant="secondary" onClick={() => this.setBooks(fantasy)} className="m-4">
              Fantasy
            </Button>
            <Button variant="secondary" onClick={() => this.setBooks(history)} className="m-4">
              History
            </Button>
            <Button variant="secondary" onClick={() => this.setBooks(horror)} className="m-4">
              Horror
            </Button>
            <Button variant="secondary" onClick={() => this.setBooks(romance)} className="m-4">
              Romance
            </Button>
            <Button variant="secondary" onClick={() => this.setBooks(scifi)} className="m-4">
              SciFi
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            {filteredBooks.map((book, index) => {
              return (
                <SingleBook
                  key={index}
                  img={book.img}
                  title={book.title}
                  price={book.price}
                  category={book.category}
                  asin={book.asin}
                  onClick={() => this.setState({ selectedBookAsin: book.asin })}
                  className={this.state.selectedBookAsin === book.asin ? "selected-card" : ""}
                />
              );
            })}
          </Col>
          <Col xs={3}>
            <h3>Reviews</h3>
            {this.state.selectedBookAsin && <CommentArea asin={this.state.selectedBookAsin} />}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default BookList;
