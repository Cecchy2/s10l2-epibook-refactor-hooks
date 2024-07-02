import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CommentList from "./CommentList";
import AddComment from "./AddComment";

class CommentArea extends Component {
  state = {
    recensioni: [], // Manteniamo questo per gestire le recensioni
  };

  fetchReviews = async () => {
    try {
      const resp = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${this.props.asin}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZjlhOTdjMjM5YzAwMTUyZjRiM2QiLCJpYXQiOjE3MTk0OTExNzAsImV4cCI6MTcyMDcwMDc3MH0.hWXOvdsqvExQltlx-3uMY51gcEWGWiG266VOOod96kU",
        },
      });

      if (resp.ok) {
        const reviews = await resp.json();
        this.setState({ recensioni: reviews });
      } else {
        console.error("Errore nel reperimento dei commenti");
      }
    } catch (err) {
      console.error("Errore nella fetch", err);
    }
  };

  componentDidMount() {
    this.fetchReviews(this.props.asin);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.asin !== this.props.asin) {
      this.fetchReviews(this.props.asin);
    }
  }

  render() {
    return (
      <>
        <CommentList recensioni={this.state.recensioni} />
        <AddComment asin={this.props.asin} onAddComment={() => this.fetchReviews(this.props.asin)} />
      </>
    );
  }
}

export default CommentArea;
