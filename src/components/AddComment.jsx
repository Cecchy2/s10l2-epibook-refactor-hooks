import React, { Component } from "react";
import { Alert, Button, Form } from "react-bootstrap";

class AddComment extends Component {
  state = {
    elementId: "",
    comment: "",
    rate: "1",
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { elementId, comment, rate } = this.state;

    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZjlhOTdjMjM5YzAwMTUyZjRiM2QiLCJpYXQiOjE3MTk0OTExNzAsImV4cCI6MTcyMDcwMDc3MH0.hWXOvdsqvExQltlx-3uMY51gcEWGWiG266VOOod96kU",
        },
        body: JSON.stringify({
          elementId: this.props.asin,
          comment: comment,
          rate: rate,
        }),
      });
      if (response.ok) {
        const newComment = await response.json();
        this.props.onAddComment(newComment);
        this.setState({ elementId: "", comment: "", rate: "1" });
      } else {
        console.error("Error in posting comment");
      }
    } catch (error) {
      console.error("Errore nel submit del commento", error);
    }
  };

  handleChange = (e) => {
    /* const { name, value } = e.target;*/
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <Form className="border border-dark mt-2 p-3" onSubmit={this.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="elementId">Scrivi il tuo nome</Form.Label>
          <Form.Control
            type="text"
            id="elementId"
            name="elementId"
            placeholder="Scrivi il tuo nome"
            value={this.state.elementId}
            onChange={this.handleChange}
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
            value={this.state.comment}
            onChange={this.handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="rate">Lascia un voto</Form.Label>
          <Form.Select id="rate" name="rate" value={this.state.rate} onChange={this.handleChange} required>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default AddComment;
