import { Container } from "reactstrap";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Sidebar from "./sidebar";

const FullLayout = ({ children }: any) => {
    return (
        <main>
            {/* Header */}
            <Header />
            <div className="pageWrapper d-lg-flex">
                {/* Sidebar */}
                <aside className="sidebarArea shadow" id="sidebarArea">
                    <Sidebar />
                </aside>

                {/* Content Area */}
                <div className="contentArea">
                    {/* Middle Content */}
                    <Container className="p-4" fluid>
                        {children || <Outlet />}
                    </Container>
                </div>
            </div>
        </main>
    )
};

export default FullLayout;