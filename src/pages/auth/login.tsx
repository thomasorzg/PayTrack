import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../services/apiService';
import { useAuth } from '../../context/AuthContext';
import LoginForm from '../../components/auth/loginForm';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import functionsService from '../../services/functionsService';
import '../auth/login.css';

const Login = () => {
    const navigate = useNavigate();
    const { setLogin } = useAuth();
    const [loading, setLoading] = useState(false);

    console.log(loading); 

    const handleLoginSuccess = async (formData: { email: string, password: string }) => {
        setLoading(true);
        try {
            const { email, password } = formData;

            const response = await apiService.login(email, password);

            setLogin(response); // Aquí pasamos directamente la respuesta del servidor

            navigate(response.user.role === 'STUDENT' ? '/pagosAcademicos' : '/dashboard');
        } catch (error: any) {
            functionsService.presentAlertError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center gradient-background">
            <Row className="justify-content-center">
                <Col md="12">
                    <Card>
                        <CardBody>
                        <div className="text-center mb-4">
                                <img src="../../src/assets/images/logos/logouts.jpg" alt="Logo" className="logo"/>
                            </div>                            
                            <h1 className="text-center">Inicio de sesión</h1>
                            <LoginForm onLoginSuccess={handleLoginSuccess} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;