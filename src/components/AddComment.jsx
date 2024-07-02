import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const AddComment = ({ asin, onAddComment }) => {
  /* state = {
    elementId: "",
    comment: "",
    rate: "1",
  };
 */
  const [elementId, setElementId] = useState("");
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZjlhOTdjMjM5YzAwMTUyZjRiM2QiLCJpYXQiOjE3MTk0OTExNzAsImV4cCI6MTcyMDcwMDc3MH0.hWXOvdsqvExQltlx-3uMY51gcEWGWiG266VOOod96kU",
        },
        body: JSON.stringify({
          elementId: asin,
          comment: comment,
          rate: rate,
        }),
      });
      if (response.ok) {
        const newComment = await response.json();
        onAddComment(newComment);
        /* this.setState({ elementId: "", comment: "", rate: "1" }); */
        setElementId("");
        setComment("");
        setRate("1");
      } else {
        console.error("Error in posting comment");
      }
    } catch (error) {
      console.error("Errore nel submit del commento", error);
    }
  };

  return (
    <Form className="border border-dark mt-2 p-3" onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="elementId">Scrivi il tuo nome</Form.Label>
        <Form.Control
          type="text"
          id="elementId"
          name="elementId"
          placeholder="Scrivi il tuo nome"
          value={elementId}
          onChange={(e) => setElementId(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="comment">Lascia un commento</Form.Label>
        <Form.Control
          type="text"
          id="comment"
          name="comment"
          placeholder="Lascia un commento"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="rate">Lascia un voto</Form.Label>
        <Form.Select id="rate" name="rate" value={rate} onChange={(e) => setRate(e.target.value)} required>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Form.Select>
      </Form.Group>
      <Button variant="outline-primary" type="submit" size="sm">
        Submit
      </Button>
    </Form>
  );
};

export default AddComment;
