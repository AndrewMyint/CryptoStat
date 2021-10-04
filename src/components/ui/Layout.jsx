import styled from "styled-components";
import tw from "twin.macro";

export const Section = styled.section`
  ${tw`block`}
`;

export const Container = styled.div`
  ${tw`my-0 mx-auto px-4 max-w-6xl `}
`;

export const Card = styled.div`
  box-shadow: rgb(0 0 0 / 8%) 0px 3px 11px 0px;
  position: relative;

  border: none;
  background: rgb(255, 255, 255, 1);
  border-radius: 6px;
`;

export const CardButton = styled.span`
  display: inline-block;
  width: 100px;
  height: 35px;
  line-height: 35px;
  padding: 0;
  font-weight: 800;
  font-size: 11px;
  color: #001871;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #001871;
  text-transform: uppercase;
  white-space: nowrap;
  background-color: transparent;
  text-align: center;

  &:hover {
    color: white;
    background-color: #001871;
  }
`;
