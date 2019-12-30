import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Card } from "react-bootstrap";

import { RootState } from "../../modules";
import { FETCHPHOTOS, PHOTOS_URL, PhotosState } from "../../modules/samplephotos";
import Skeleton from "../Interfaces/skeleton/Skeleton";

export type LoaderProps = {};

const Loader: React.FC<LoaderProps> = ({}) => {
  const photos: PhotosState[] = useSelector((state: RootState) => state.photos);
  const dispatch = useDispatch();

  const onPhotos = useCallback(() => {
    const result: Promise<PhotosState> = fetch(PHOTOS_URL, { cache: "no-cache" }).then(res =>
      res.json()
    );
    dispatch(FETCHPHOTOS(result));
  }, [dispatch]);

  const onGetState = useCallback(() => console.log(photos as any), []);

  return (
    <div>
      Hello Loader
      {/* <Progress isAnimating={isLoading} /> */}
      <div>
        <button onClick={onPhotos}>Click!!</button>
        <button onClick={onGetState}>Get State!!</button>
      </div>
      <Container>
        <Row>
          {photos.length > 0
            ? photos.map(photo => (
                <Col sm>
                  <div className="flex-auto" key={photo.id}>
                    <img src={photo.thumbnailUrl} alt={photo.title} />
                  </div>
                </Col>
              ))
            : null}
        </Row>
        <Row>
          <Col sm>
            <div style={{ flex: 1 }}>
              <Skeleton width={`100%`} height={100} />
            </div>
          </Col>
          <Col sm>
            <div style={{ flex: 1 }}>
              <Skeleton width={`100%`} height={100} />
            </div>
          </Col>
          <Col sm>
            <div style={{ flex: 1 }}>
              <Skeleton width={`100%`} height={100} />
            </div>
          </Col>
          <Col sm>
            <div style={{ flex: 1 }}>
              <Skeleton width={`100%`} height={100} />
            </div>
          </Col>
          <Col sm>
            <div style={{ flex: 1 }}>
              <Skeleton width={`100%`} height={100} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Loader;
