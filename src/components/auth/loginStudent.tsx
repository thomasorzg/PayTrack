import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import functionService from '../../services/functionsService';

interface LoginFormProps {
    onLoginSuccess: (formData: { matricula: string, password: string }) => void;
}

const LoginFormStudent: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
    const [matricula, setMatricula] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();

        if (!matricula || !password) {
            functionService.presentAlertError("Por favor, completa todos los campos");
            return;
        }

        onLoginSuccess({ matricula, password });
    };

    return (
        <Form onSubmit={handleLogin}>
            <FormGroup>
                <Label for="matricula">Matrícula</Label>
                <Input
                    type="text"
                    name="matricula"
                    id="matricula"
                    placeholder="Introduce tu matrícula"
                    value={matricula}
                    onChange={(e) => setMatricula(e.target.value)}
                />
            </FormGroup>

            <FormGroup>
                <Label for="password">NIP</Label>
                <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Introduce tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormGroup>

            <Button color="primary" block type="submit">
                Iniciar sesión
            </Button>
        </Form>
    );
};

export default LoginFormStudent;
