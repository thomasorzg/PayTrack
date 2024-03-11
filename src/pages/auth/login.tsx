import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../services/apiService';
import { useAuth } from '../../context/AuthContext';
import LoginForm from '../../components/auth/loginForm';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

const Login = () => {
    const navigate = useNavigate();
    const { setLogin } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleLoginSuccess = async (formData: { email: string, password: string }) => {
        setLoading(true);
        try {
            const { email, password } = formData;

            const response = await apiService.login(email, password);

            setLogin(response); // Aquí pasamos directamente la respuesta del servidor
            navigate('/dashboard');
        } catch (error) {
            handleLoginFail(error);
        } finally {
            setLoading(false);
        }
    };

    const handleLoginFail = async (data: any) => {
        toastr.options = {
            positionClass : 'toast-top-center',
            hideDuration: 300,
            timeOut: 60000
        }

        toastr.error(data.message);
    }

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md="6">
                    <Card>
                        <CardBody>
                            <h1 className="text-center">Inicio de sesión</h1>
                            <LoginForm onLoginSuccess={handleLoginSuccess} onLoginFail={handleLoginFail} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
