import React from "react";
import { Card } from "react-bootstrap";

const SingleBook = ({ img, title, price, category, asin, onClick, className }) => (
  <Card onClick={onClick} className={className}>
    <Card.Img variant="top" src={img} />
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>Price: {price}</Card.Text>
      <Card.Text>Category: {category}</Card.Text>
    </Card.Body>
  </Card>
);

export default SingleBook;
