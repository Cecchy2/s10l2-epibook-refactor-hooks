import { Button, ListGroup } from "react-bootstrap";

const CommentList = ({ recensioni, removeComment }) => (
  <ListGroup>
    {recensioni.map((recensione) => (
      <>
        <ListGroup.Item key={recensione._id}>
          <p className="overflow-hidden">{recensione.author}</p>
          <h6>{recensione.comment}</h6>
          <small>Rating: {recensione.rate}</small>
        </ListGroup.Item>
        <Button variant="outline-danger" onClick={() => removeComment(recensione._id)} className="mb-3 w-50" size="sm">
          rimuovi commento
        </Button>
      </>
    ))}
  </ListGroup>
);

export default CommentList;
