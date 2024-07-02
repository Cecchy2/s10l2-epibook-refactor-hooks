import React from "react";
import { ListGroup } from "react-bootstrap";

const CommentList = ({ recensioni }) => (
  <ListGroup>
    {recensioni.map((recensione) => (
      <ListGroup.Item key={recensione._id}>
        <h5 className="overflow-hidden">{recensione.author}</h5>
        <p>{recensione.comment}</p>
        <small>Rating: {recensione.rate}</small>
      </ListGroup.Item>
    ))}
  </ListGroup>
);

export default CommentList;
