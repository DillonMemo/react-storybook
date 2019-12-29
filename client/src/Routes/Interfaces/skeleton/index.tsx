import React, { CSSProperties } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Skeleton = () => {
  return (
    <Container>
      <Row>
        <Col sm>
          <Card style={{ width: "18rem" }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <div style={cardImage}>
              <b>input Image</b>
            </div>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the
                card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>{" "}
        </Col>
        <Col sm>
          <Card style={{ width: "18rem" }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <div style={cardImage}>
              <b>input Image</b>
            </div>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the
                card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>{" "}
        </Col>
        <Col sm>
          <Card style={{ width: "18rem" }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <div style={cardImage}>
              <b>input Image</b>
            </div>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the
                card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>{" "}
        </Col>
      </Row>
      <Row style={{ marginTop: 20 }}>
        <Col sm>
          <Card style={{ width: "18rem" }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <div style={cardImage}>
              <b>input Image</b>
            </div>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the
                card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>{" "}
        </Col>
        <Col sm>
          <Card style={{ width: "18rem" }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <div style={cardImage}>
              <b>input Image</b>
            </div>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the
                card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>{" "}
        </Col>
        <Col sm>
          <Card style={{ width: "18rem" }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <div style={cardImage}>
              <b>input Image</b>
            </div>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the
                card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>{" "}
        </Col>
      </Row>
    </Container>
  );
};

const cardImage: CSSProperties = {
  height: 200,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "lightgray"
};

export default Skeleton;
