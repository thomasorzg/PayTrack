import LogoDark from "../../assets/images/logos/adminpro.svg";
import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <Link to="/">
            <img src={LogoDark} alt="Logo" />
        </Link>
    );
};

export default Logo;
