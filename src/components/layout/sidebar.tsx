import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "fa fa-dashboard",
  },
  {
    title: "Usuarios",
    href: "/users",
    icon: "fa fa-users",
  },
  {
    title: "Pagos",
    href: "/payments",
    icon: "fa fa-money"
  },
  {
    title: "Conceptos",
    href: "/conceptos",
    icon: "fa fa-list-alt"
  },
  {
    title: "Reportes",
    href: "/reports",
    icon: "fa fa-file"
  },
  {
    title: "Configuración",
    href: "/settings",
    icon: "fa fa-cog"
  }
];

const Sidebar = () => {
  const showMobilemenu = () => {
    const sidebarArea = document.getElementById("sidebarArea");
    if (sidebarArea) {
      sidebarArea.classList.toggle("showSidebar");
    }
  };
  let location = useLocation();

  return (
    <div className="bg-dark">
      <div className="d-flex">
        <Button
          color="white"
          className="ms-auto text-white d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="fa fa-times"></i>
        </Button>
      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "active nav-link py-3"
                    : "nav-link py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
          <Button
            color="danger"
            tag="a"
            target="_blank"
            className="mt-3"
            href="#"
          >
            Necesito ayuda
          </Button>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
