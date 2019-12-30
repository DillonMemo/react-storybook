import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Dropdown } from "react-bootstrap";

import { RootState } from "../../../modules";
import { increase, decrease, increaseBy } from "../../../modules/counter";
import { FETCHPHOTOS, PhotosState } from "../../../modules/samplephotos";

/**
 * Custom Hooks
 */
const useCounter = () => {
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch();

  const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
  const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);
  const onIncreaseBy = useCallback((diff: number) => dispatch(increaseBy(diff)), [dispatch]);

  return {
    count,
    onIncrease,
    onDecrease,
    onIncreaseBy
  };
};

type TestProps = {};

const Test: React.FC<TestProps> = ({}) => {
  const photos: PhotosState[] = useSelector((state: RootState) => state.photos);
  const dispatch = useDispatch();

  const { count, onIncrease, onDecrease, onIncreaseBy } = useCounter();

  const onPhotos = () => {
    dispatch(FETCHPHOTOS());
  };

  return (
    <div className={`p-3`}>
      <h2 style={{ margin: 0, padding: 0 }}>{count}</h2>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
      <button onClick={() => onIncreaseBy(5)}>+5</button>

      <div style={{ display: "flex" }}>
        {photos.length > 0
          ? photos.map(photo => (
              <div className="flex-auto" key={photo.id}>
                <img src={photo.thumbnailUrl} alt={photo.title} />
              </div>
            ))
          : null}
      </div>

      <h2>Buttons</h2>
      <div className="p-1">
        <Button variant="primary" className="mr-1" onClick={onPhotos}>
          Primary
        </Button>
        <Button variant="secondary" className="mr-1">
          Secondary
        </Button>
        <Button variant="success" className="mr-1">
          Success
        </Button>
        <Button variant="warning" className="mr-1">
          Warning
        </Button>
        <Button variant="danger" className="mr-1">
          Danger
        </Button>
        <Button variant="info" className="mr-1">
          Info
        </Button>
        <Button variant="light" className="mr-1">
          Light
        </Button>
        <Button variant="dark" className="mr-1">
          Dark
        </Button>
        <Button variant="link" className="mr-1">
          Link
        </Button>
      </div>

      <h2>DropDown</h2>
      <Dropdown>
        <Dropdown.Toggle variant="light" id="dropdown-basic" style={{ borderColor: "black" }}>
          Dropdown Button
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Test;
