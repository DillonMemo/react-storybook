import React, { useCallback } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { FETCHPHOTOS, PhotosState } from "../../../modules/samplephotos";
import { RootState } from "../../../modules";

const NProgress = () => {
  const PHOTOS_URL =
    "https://gist.githubusercontent.com/mironov/90943481802c227a1585cb979d73b261/raw/e5ffa6e7b8e160be478ef2d63b6212581930d2c1/photos.json";

  const photos: any[] = useSelector((state: RootState) => state.photos);
  const dispatch = useDispatch();

  const handleClickTest = useCallback(() => {
    dispatch(FETCHPHOTOS());
  }, [dispatch]);

  const renderPhotos = () => {
    return photos.map(photo => (
      <div className="flex-auto" key={photo.id}>
        <img src={photo.thumbnailUrl} alt={photo.title} />
      </div>
    ));
  };

  return (
    <Container>
      <Row>
        <Col sm>
          <Button variant="primary" onClick={handleClickTest}>
            Click!!
          </Button>
        </Col>
        <Col sm>section 2</Col>
        <Col sm>section 3</Col>
      </Row>
      <Row style={{ marginTop: 20 }}>
        <Col sm>
          {photos.length > 0 ? <div style={{ display: "flex" }}>{renderPhotos()}</div> : null}
        </Col>
      </Row>
    </Container>
  );
};

export default NProgress;
