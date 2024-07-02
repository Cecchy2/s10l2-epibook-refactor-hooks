import { useState } from "react";
import SingleBook from "./SingleBook";
import fantasy from "../data/fantasy.json";
import horror from "../data/horror.json";
import history from "../data/history.json";
import romance from "../data/romance.json";
import scifi from "../data/scifi.json";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import CommentArea from "./CommentArea";

const BookList = () => {
  /* state = {
    books: fantasy,
    searchBar: "",
    selected: false,
    selectedBookAsin: null,
  }; */

  const [books, setBooks] = useState(fantasy);
  const [searchBar, setSearchBar] = useState("");
  const [selected, setSelected] = useState(false);
  const [selectedBookAsin, setSelectedBookAsin] = useState(null);

  const changeBooks = (genere) => {
    setBooks(genere);
  };

  const filteredBooks = books.filter((book) => book.title.toLowerCase().includes(searchBar.toLowerCase()));
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
                value={searchBar}
                onChange={(event) => {
                  event.preventDefault();
                  setSearchBar(event.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Button variant="secondary" onClick={() => changeBooks(fantasy)} className="m-4">
            Fantasy
          </Button>
          <Button variant="secondary" onClick={() => changeBooks(history)} className="m-4">
            History
          </Button>
          <Button variant="secondary" onClick={() => changeBooks(horror)} className="m-4">
            Horror
          </Button>
          <Button variant="secondary" onClick={() => changeBooks(romance)} className="m-4">
            Romance
          </Button>
          <Button variant="secondary" onClick={() => changeBooks(scifi)} className="m-4">
            SciFi
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={9}>
          <Row className="g-3">
            {filteredBooks.map((book, index) => {
              return (
                <Col md={3} key={index} className="p-0">
                  <SingleBook
                    img={book.img}
                    title={book.title}
                    price={book.price}
                    category={book.category}
                    asin={book.asin}
                    onClick={() => setSelectedBookAsin(book.asin)}
                    className={selectedBookAsin === book.asin ? "selected-card" : ""}
                  />
                </Col>
              );
            })}
          </Row>
        </Col>
        <Col xs={3}>
          <h3>Reviews</h3>
          {selectedBookAsin && <CommentArea asin={selectedBookAsin} />}
        </Col>
      </Row>
    </Container>
  );
};

export default BookList;
