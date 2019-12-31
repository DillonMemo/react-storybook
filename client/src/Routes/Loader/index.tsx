import React, { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Card } from "react-bootstrap";

import { RootState } from "../../modules";
import { FETCHPHOTOS, PHOTOS_URL, PhotosState } from "../../modules/samplephotos";
import Skeleton from "../Interfaces/skeleton/Skeleton";
import Progress from "../Interfaces/nprogress/Proress";

export type LoaderProps = {};

const Loader: React.FC<LoaderProps> = ({}) => {
  const photos: PhotosState = useSelector((state: RootState) => state.photos);
  const dispatch = useDispatch();

  useMemo(() => {
    const result: Promise<PhotosState> = fetch(PHOTOS_URL, { cache: "no-cache" }).then(res =>
      res.json()
    );

    dispatch(FETCHPHOTOS(result));
  }, []);

  return (
    <div>
      {photos.isLoading ? (
        <span>
          <Skeleton width={100} height={15} />
        </span>
      ) : (
        <span>Hello Loader</span>
      )}
      <Progress isAnimating={photos.isLoading} />
      {console.log(photos.isLoading)}
      <Container style={{ marginTop: 20 }}>
        <Row>
          {photos.isLoading ? (
            <>
              <Col sm>
                <div style={{ flex: 1 }}>
                  <Skeleton width={150} height={150} />
                </div>
              </Col>
              <Col sm>
                <div style={{ flex: 1 }}>
                  <Skeleton width={150} height={150} />
                </div>
              </Col>
              <Col sm>
                <div style={{ flex: 1 }}>
                  <Skeleton width={150} height={150} />
                </div>
              </Col>
              <Col sm>
                <div style={{ flex: 1 }}>
                  <Skeleton width={150} height={150} />
                </div>
              </Col>
              <Col sm>
                <div style={{ flex: 1 }}>
                  <Skeleton width={150} height={150} />
                </div>
              </Col>
            </>
          ) : (
            <>
              {photos.result.length > 0
                ? photos.result.map((photo, index) => (
                    <Col sm key={`Col-${index}`}>
                      <div className="flex-auto" key={photo.id}>
                        <img src={photo.thumbnailUrl} alt={photo.title} />
                      </div>
                    </Col>
                  ))
                : null}
            </>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Loader;
