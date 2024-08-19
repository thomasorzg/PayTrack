import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import apiService from '../../services/apiService';
import { useAuth } from '../../context/AuthContext';
import LoginFormStudent from '../../components/auth/loginStudent';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import functionsService from '../../services/functionsService';
import '../auth/login.css';
import LoginForm from '../../components/auth/loginForm';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setLogin } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleLoginSuccess = async (formData: { email: string, password: string }) => {
        setLoading(true);
        try {
            const { email, password } = formData;

            const response = await apiService.login(email, password);

            setLogin(response); // Aquí pasamos directamente la respuesta del servidor

            navigate('/dashboard');
        } catch (error: any) {
            functionsService.presentAlertError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLoginSuccess_student = async (formData: { matricula: string, password: string }) => {
        setLoading(true);
        try {
            const { matricula, password } = formData;

            const response = await apiService.loginStudent(matricula, password);

            setLogin(response); // Aquí pasamos directamente la respuesta del servidor

            navigate('/pagosAcademicos');
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
                                <img src="https://sic.cultura.gob.mx/galeria_imagen/5ce3d78fb2890logo.jpg" alt="Logo" className="logo"/>
                            </div>
                            <h1 className="text-center">
                                {location.pathname.includes('/admin/login') ? 'Inicio de sesión' : 'Inicio de sesión para Estudiantes'}
                            </h1>
                            {location.pathname.includes('/admin/login') ? (
                                <LoginForm onLoginSuccess={handleLoginSuccess} />
                            ) : (
                                <LoginFormStudent onLoginSuccess={handleLoginSuccess_student} />
                            )}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
