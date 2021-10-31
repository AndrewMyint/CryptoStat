import React, { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { Link } from "react-router-dom";
import icon from "../images/CryptoStat_logos_transparent.png";
import { Section, Container } from "../components/ui/Layout";
import { MenuIcon } from "@heroicons/react/solid";

const CustomSection = styled(Section)`
  ${Section} {
  }
  ${tw` shadow-lg `}
  background-color: rgb(0, 24, 113);
  border-bottom: 1px solid rgb(236, 239, 241);
  position: relative;
  z-index: 200;
`;

const NavContainer = styled(Container)`
  ${Container} {
  }
  ${tw`flex justify-between items-center px-8 py-6`}
  margin: 0px auto;
`;

const Logo = styled.div`
  ${tw`flex `}
  justify-content: flex-start;

  @media (min-width: 640px) {
    width: 220px;
    height: 60px;
  }
  width: 180px;
  height: 50px;

  a {
    display: inline-flex;
    text-decoration: none;
    cursor: pointer;
    background-color: transparent;
  }
  img {
    width: 100%;
    height: 100%;
  }
`;

const NavBar = styled.nav`
  ${tw`hidden sm:flex sm:justify-center text-white`}
`;

const Div = styled.div`
  margin: 0px 18px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
`;
const DropDown = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: absolute;
  background-color: white;
  width: 100%;
`;

const Overlay = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  inset: 0px;
  outline: 0px;
  opacity: 0.5;
  background-color: rgb(19, 30, 41);
  position: fixed;
  z-index: 10;
`;

const DropDownItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  > div {
    padding-bottom: 20px;
    justify-content: center;
  }
`;

const NavItem = ({ text, endpoint, onClick }) => {
  return (
    <div
      style={{ lineHeight: "15px", display: "inline-flex" }}
      onClick={onClick}
    >
      <Div>
        <span>
          <Link to={endpoint}>{text}</Link>
        </span>
      </Div>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOnClick = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
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
          <div className="absolute right-0 sm:hidden flex md:space-x-20">
            <button>
              <MenuIcon
                className="w-6 h-6 m-5 text-white border-black border-solid"
                onClick={handleOnClick}
              />
            </button>
          </div>

          {/* <SideNav isOpen={false}> */}
          {/* <NavItem text="Home" endpoint="/" />
          <NavItem text="Crytocurrencies" endpoint="/cryptocurrencies" />
          <NavItem text="Exchanges" endpoint="/exchanges" />
          <NavItem text="News" endpoint="/news" /> */}
          {/* </SideNav> */}
        </NavContainer>
        <DropDown isOpen={isOpen}>
          <DropDownItemContainer>
            <NavItem text="Home" endpoint="/" onClick={handleOnClick} />
            <NavItem
              text="Crytocurrencies"
              endpoint="/cryptocurrencies"
              onClick={handleOnClick}
            />
            <NavItem
              text="Exchanges"
              endpoint="/exchanges"
              onClick={handleOnClick}
            />
            <NavItem text="News" endpoint="/news" onClick={handleOnClick} />
          </DropDownItemContainer>
        </DropDown>
      </CustomSection>
      <Overlay isOpen={isOpen} onClick={handleOnClick} />
    </>
  );
};

export default Navbar;
