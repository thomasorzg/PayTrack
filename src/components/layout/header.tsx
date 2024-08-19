import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import user1 from "../../assets/images/users/user4.jpg";
import Logo from "./logo";
import { useAuth } from "../../context/AuthContext";
import functionsService from "../../services/functionsService";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [formattedDateTime, setFormattedDateTime] = React.useState(functionsService.formatCurrentDateTime());
  const { user, isAuthenticated, logout } = useAuth();

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  
  const showMobilemenu = () => {
    const sidebarArea = document.getElementById("sidebarArea");
    if (sidebarArea) {
      sidebarArea.classList.toggle("showSidebar");
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setFormattedDateTime(functionsService.formatCurrentDateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Navbar color="white" light expand="md" className="fix-header">
      <div className="d-flex align-items-center">
        <div className="d-lg-block d-none me-5 pe-3">
          <Link to={"/"}>
            <Logo />
          </Link>
        </div>
        <NavbarBrand>
          <Link to="/" className="navbar-brand">
            <h1 className="d-lg-none">PayTrack</h1>
          </Link>
        </NavbarBrand>
        <Button
          color="primary"
          className=" d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="fa fa-bars"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="fa fa-times"></i>
          ) : (
            <i className="fa fa-bars"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          <NavItem>
            <span>{formattedDateTime}</span>
          </NavItem>
        </Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="transparent">
            <span className="me-2">{isAuthenticated && user && user?.name}</span>
            <img
              src={user1}
              alt="profile"
              className="rounded-circle"
              width="30"
            ></img>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={logout}>Cerrar sesión</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;
