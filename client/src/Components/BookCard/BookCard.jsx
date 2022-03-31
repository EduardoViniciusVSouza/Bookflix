import React from "react";
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import BookButtonActions from "../ButtonActions/BookButtonActions";
import styles from './BookCard.styles'



const BookCard = ({book}) => {

  

  return (
    <>
      <Card style={styles.card}>
        <CardBody>
          <CardTitle tag="h4" style={{color: 'white'}}>{book.title}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            {book.author}
          </CardSubtitle>

          <img
            style={styles.bookImg}
            src="https://th.bing.com/th/id/R.f56c80c3800ddc327f9c91b80e85cd8f?rik=qmvMLohrEuAWIw&pid=ImgRaw&r=0"
            alt=""
          />
          <CardText tag="h6" style={{color: 'whitesmoke'}}>
            {book.description || book.content}
          </CardText>
          
          <BookButtonActions book={book} />
        </CardBody>
      </Card>
    </>
  );
};
 
export default BookCard;

