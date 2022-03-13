import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";

const UiLoader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DefaultLoader = function ({ desc, size }) {
  const [color] = useState("#000");
  return (
    <UiLoader>
      <ClipLoader color={color} size={size} />
      {desc ? <div>{desc}</div> : ""}
    </UiLoader>
  );
};

export default DefaultLoader;
