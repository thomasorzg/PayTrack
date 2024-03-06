import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/auth/loginForm';

const Login = () => {
    const navigate = useNavigate();

    const handleLoginSuccess = (enrollment: string, nip: string) => {
        console.log('Matrícula:', enrollment, 'NIP:', nip);
        // Simular la obtención de un token de autenticación después de un iniciar sesión
        const fakeToken = '123456789';
        localStorage.setItem('authToken', fakeToken);
        navigate('/dashboard');
    };

    const handleCancel = () => {
        console.log('Login cancelado');
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md="6">
                    <Card>
                        <CardBody>
                            <h1 className="text-center">Login</h1>
                            <LoginForm onLogin={handleLoginSuccess} onCancel={handleCancel} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
