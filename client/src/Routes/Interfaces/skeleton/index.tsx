import React, { CSSProperties } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Skeleton from "./Skeleton";

const SkeletonUI = () => {
  return (
    <Container>
      <Row>
        <Col sm>
          <Card style={{ width: "18rem" }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <div>
              <Skeleton width={`100%`} height={200} />
            </div>
            <Card.Body>
              <Card.Title>
                <Skeleton width={`100%`} height={24} />
              </Card.Title>
              <Card.Text>
                <Skeleton width={`100%`} height={50} />
              </Card.Text>
              <Skeleton width={50} height={24} />
              {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
          </Card>{" "}
        </Col>
        <Col sm>
          <Card style={{ width: "18rem" }}>
            <div>
              <Skeleton width={`100%`} height={200} />
            </div>
            <Card.Body>
              <Card.Title>
                <Skeleton width={`100%`} height={24} />
              </Card.Title>
              <Card.Text>
                <Skeleton width={`100%`} height={50} />
              </Card.Text>
              <Skeleton width={50} height={24} />
            </Card.Body>
          </Card>{" "}
        </Col>
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
          </Card>{" "}
        </Col>
      </Row>
      <Row style={{ marginTop: 20 }}>
        <Col sm>
          <Card style={{ width: "18rem" }}>
            <div>
              <Skeleton width={`100%`} height={200} />
            </div>
            <Card.Body>
              <Card.Title>
                <Skeleton width={`100%`} height={24} />
              </Card.Title>
              <Card.Text>
                <Skeleton width={`100%`} height={50} />
              </Card.Text>
              <Skeleton width={50} height={24} />
            </Card.Body>
          </Card>{" "}
        </Col>
        <Col sm>
          <Card style={{ width: "18rem" }}>
            <div>
              <Skeleton width={`100%`} height={200} />
            </div>
            <Card.Body>
              <Card.Title>
                <Skeleton width={`100%`} height={24} />
              </Card.Title>
              <Card.Text>
                <Skeleton width={`100%`} height={50} />
              </Card.Text>
              <Skeleton width={50} height={24} />
            </Card.Body>
          </Card>{" "}
        </Col>
        <Col sm>
          <Card style={{ width: "18rem" }}>
            <div>
              <Skeleton width={`100%`} height={200} />
            </div>
            <Card.Body>
              <Card.Title style={{ display: "flex" }}>
                <Skeleton flex={2} height={24} />
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

export default SkeletonUI;
