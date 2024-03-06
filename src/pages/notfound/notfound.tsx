import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <Container className="vh-100 d-flex align-items-center justify-content-center">
            <Row>
                <Col md={12} className="text-center">
                    <h1 className="display-1 fw-bold">404</h1>
                    <p className="fs-3"> <span className="text-muted">¡Página no encontrada!</span></p>
                    <p className="lead">
                        La página que estás buscando no se encuentra.
                    </p>
                    <Link to="/" className="btn btn-primary">
                        Volver al inicio
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFound;
