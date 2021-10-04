import styled from "styled-components";
import tw from "twin.macro";

export const Title = styled.div`
  ${tw`py-5 `}
  font-size: 32px;
  line-height: 42px;
  font-weight: 500;
`;

export const Content = styled.p`
  ${tw`text-base leading-normal text-gray-600`}
`;

export const Value = styled.p`
  ${tw`text-lg font-semibold text-gray-700`}
`;
export const Header = styled.div`
  ${tw`text-lg py-5`}
`;

export const SubHeading = styled.h1`
  text-align: left;
  color: #58667e;
  font-size: 10px;
  font-weight: 400;
  line-weight: 18px;
`;

export const SubContent = styled.div`
  text-align: left;
  font-size: 10px;
  font-weight: 400;
  line-height: 18px;
`;

export const CardTitle = styled.div`
  ${tw`text-base text-gray-700`}
`;

export const CardContent = styled.p`
  ${tw`text-sm text-gray-500`}
`;

export const Icon = styled.div`
  img {
    width: 30px;
    height: 30px;
  }
`;
