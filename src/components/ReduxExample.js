import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../redux/counter";

const ReduxExample = function () {
  const { count } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div className="bg-primary">
      <p>{count}</p>
      <button type="button" onClick={() => dispatch(increment())}>
        increment
      </button>
      <button type="button" onClick={() => dispatch(decrement())}>
        decrement
      </button>
    </div>
  );
};

export default ReduxExample;
