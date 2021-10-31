import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const ErrorContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Error = () => {
  return (
    <ErrorContainer className=" w-full h-full">
      <div className="flex justify-center items-center">
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          className={" h-8 w-8 mr-2 text-red-600"}
        />
        Oops..Somthing went wrong!
      </div>
    </ErrorContainer>
  );
};

export default Error;
