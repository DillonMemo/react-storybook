import React, { CSSProperties, useCallback } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { showLoading } from "react-redux-loading-bar";

const NProgress = () => {
  const dispatch = useDispatch();

  const onProgressBar = useCallback(() => dispatch(showLoading()), [dispatch]);

  return (
    <Container>
      <Row>
        <Col sm>
          <Button variant="primary" onClick={onProgressBar}>
            Click
          </Button>
        </Col>
        <Col sm>section 2</Col>
        <Col sm>section 3</Col>
      </Row>
      <Row style={{ marginTop: 20 }}>
        <Col sm>section 4</Col>
        <Col sm>section 5</Col>
        <Col sm>section 6</Col>
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

export default NProgress;
