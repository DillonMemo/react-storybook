import React, { CSSProperties } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Skeleton from "./Skeleton";

const SkeletonUI = () => {
  return (
    <Container>
      <Row>
        <Col sm>
          <Card style={{ width: "18rem" }}>
            <div>
              <Skeleton width={`100%`} height={200} />
            </div>
            <Card.Body>
              <Card.Title style={{ display: "flex", alignItems: "center" }}>
                <Skeleton width={50} height={50} isRadius={true} />
                <Skeleton flex={4} height={24} />
                <Skeleton flex={1} height={24} />
                <Skeleton flex={3} height={24} />
                <Skeleton flex={5} height={24} />
              </Card.Title>
              <Card.Text>
                <Skeleton width={`100%`} height={50} />
              </Card.Text>
              <Skeleton width={50} height={24} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SkeletonUI;
