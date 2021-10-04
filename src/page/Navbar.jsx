import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { Link } from "react-router-dom";
import icon from "../images/CryptoStat.svg";
import { Section, Container } from "../components/ui/Layout";

const CustomSection = styled(Section)`
  ${Section} {
  }
  ${tw`bg-white`}
  background-color: white;
  border-bottom: 1px solid rgb(236, 239, 241);
`;

const NavContainer = styled(Container)`
  ${Container} {
  }
  ${tw`flex justify-between `}
  margin: 0px auto;
`;

const Logo = styled.div`
  ${tw`flex `}
  justify-content: flex-end;
  a {
    display: inline-flex;
    text-decoration: none;
    cursor: pointer;
    background-color: transparent;
  }
  img {
    height: 60px;
    width: 112px;
  }
`;

const NavBar = styled.nav`
  ${tw`flex justify-center`}
`;

const Div = styled.div`
  margin: 0px 18px;
  display: inline-flex;
  align-items: center;

  cursor: pointer;
`;

const NavItem = ({ text, endpoint }) => {
  return (
    <div style={{ lineHeight: "15px", display: "inline-flex" }}>
      <Div>
        <span>
          <Link to={endpoint}>{text}</Link>
        </span>
      </Div>
    </div>
  );
};

const Navbar = () => {
  return (
    <CustomSection>
      <NavContainer>
        <Logo>
          <a href="/">
            <img src={icon} alt={"cryptostat log"} />
          </a>
        </Logo>
        <NavBar>
          <NavItem text="Home" endpoint="/" />
          <NavItem text="Crytocurrencies" endpoint="/cryptocurrencies" />
          <NavItem text="Exchanges" endpoint="/exchanges" />
          <NavItem text="News" endpoint="/news" />
        </NavBar>
      </NavContainer>
    </CustomSection>
  );
};

export default Navbar;
