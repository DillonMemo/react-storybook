import React, { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Card } from "react-bootstrap";

import { RootState } from "../../modules";
import { PHOTOS_URL, PhotosState, fetchPhotosAsync } from "../../modules/samplephotos";
import Skeleton from "../Interfaces/skeleton/Skeleton";
import Progress from "../Interfaces/nprogress/Progress";
import axios, { AxiosResponse } from "axios";

const usePhotos = () => {
  const photos = useSelector((state: RootState) => state.photos);
  const dispatch = useDispatch();

  const onRequest = useCallback(() => dispatch(fetchPhotosAsync.request()), [dispatch]);
  const onSuccess = useCallback(
    (res: AxiosResponse<any>) => dispatch(fetchPhotosAsync.success(res)),
    [dispatch]
  );
  const onFailure = useCallback(() => dispatch(fetchPhotosAsync.failure()), [dispatch]);

  return {
    photos,
    onRequest,
    onSuccess,
    onFailure
  };
};

export type LoaderProps = {};

const Loader: React.FC<LoaderProps> = ({}) => {
  const { photos, onRequest, onSuccess, onFailure } = usePhotos();

  useMemo(() => {
    onRequest();

    axios
      .get(PHOTOS_URL)
      .then(response => {
        onSuccess(response);
      })
      .catch(error => {
        onFailure();
      });
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
