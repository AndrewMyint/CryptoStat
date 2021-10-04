import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const Form = styled.div`
  ${tw` form-control mt-5 mx-auto p-2 `}
`;

const SearchInput = styled.input`
  ${tw` pr-16 input input-ghost input-md input-bordered`}
  width: 300px;
`;

console.log("Form: ", Form);
const SearchBar = ({ onSearch }) => {
  return (
    <Form>
      <div className="relative">
        <SearchInput
          onChange={onSearch}
          type="text"
          placeholder="Search for Currencies"
        />
      </div>
    </Form>
  );
};

export default SearchBar;
