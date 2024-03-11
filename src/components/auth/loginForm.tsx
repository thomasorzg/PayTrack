import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

interface LoginFormProps {
    onLoginSuccess: (formData: { email: string, password: string }) => void;
    onLoginFail: (data: any) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();

        if (!email || !password) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        onLoginSuccess({ email, password });
    };

    return (
        <Form onSubmit={handleLogin}>
            <FormGroup>
                <Label for="email">Correo electrónico</Label>
                <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Introduce tu correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormGroup>

            <FormGroup>
                <Label for="password">Contraseña</Label>
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

export default LoginForm;
