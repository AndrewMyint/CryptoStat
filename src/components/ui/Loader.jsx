import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const Loader = () => {
  return (
    <LoaderContainer className=" w-full h-full">
      <div className="flex justify-center items-center w-full h-full">
        <FontAwesomeIcon
          icon={faSpinner}
          className={"animate-spin h-8 w-8 mr-2 text-blue-600"}
        />
        Loading...
      </div>
    </LoaderContainer>
  );
};

export default Loader;
