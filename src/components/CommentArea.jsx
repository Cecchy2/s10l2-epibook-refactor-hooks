/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import CommentList from "./CommentList";
import AddComment from "./AddComment";

const CommentArea = ({ asin }) => {
  const [recensioni, setRecensioni] = useState([]);

  const fetchReviews = async () => {
    try {
      const resp = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${asin}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZjlhOTdjMjM5YzAwMTUyZjRiM2QiLCJpYXQiOjE3MTk0OTExNzAsImV4cCI6MTcyMDcwMDc3MH0.hWXOvdsqvExQltlx-3uMY51gcEWGWiG266VOOod96kU",
        },
      });

      if (resp.ok) {
        const reviews = await resp.json();
        setRecensioni(reviews);
      } else {
        console.error("Errore nel reperimento dei commenti");
      }
    } catch (err) {
      console.error("Errore nella fetch", err);
    }
  };

  const removeComment = async (id) => {
    try {
      const resp = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${id}`, {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZjlhOTdjMjM5YzAwMTUyZjRiM2QiLCJpYXQiOjE3MTk0OTExNzAsImV4cCI6MTcyMDcwMDc3MH0.hWXOvdsqvExQltlx-3uMY51gcEWGWiG266VOOod96kU",
        },
      });

      if (resp.ok) {
        fetchReviews();
      } else {
        console.error("Errore nella rimozione del commento");
      }
    } catch (err) {
      console.error("Errore nella fetch", err);
    }
  };

  /* componentDidMount() {
    this.fetchReviews(this.props.asin);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.asin !== this.props.asin) {
      this.fetchReviews(this.props.asin);
    }
  } */
  useEffect(() => {
    fetchReviews();
  }, [asin]);

  return (
    <>
      <CommentList recensioni={recensioni} removeComment={removeComment} />
      <AddComment asin={asin} onAddComment={() => fetchReviews(asin)} />
    </>
  );
};

export default CommentArea;
