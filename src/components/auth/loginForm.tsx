import React, { useState, FormEvent } from 'react';
import { Button, Form, FormGroup, Label, Input, Fade } from 'reactstrap';

interface LoginFormProps {
    onLogin: (enrollment: string, nip: string) => void;
    onCancel: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onCancel }) => {
    const [enrollment, setEnrollment] = useState<string>('');
    const [nip, setNip] = useState<string>('');
    const [enrollmentExists, setEnrollmentExists] = useState<boolean>(false);
    const [isChecking, setIsChecking] = useState<boolean>(false);

    // Simulando la verificación de la matrícula (se hará la petición al servidor en la versión final)
    const checkEnrollmentExists = async (_enrollment: string): Promise<boolean> => {
        setIsChecking(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsChecking(false);
        // Simulamos que cualquier matrícula existe
        return true;
    };

    const handleEnrollmentSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const exists = await checkEnrollmentExists(enrollment);
        setEnrollmentExists(exists);
    };

    const handleLogin = (event: FormEvent) => {
        event.preventDefault();
        onLogin(enrollment, nip);
    };

    return (
        <Form>
            {!enrollmentExists && (
                <FormGroup>
                    <Label for="enrollment">Matrícula</Label>
                    <Input
                        type="text"
                        name="enrollment"
                        id="enrollment"
                        placeholder="Ingresa tu matrícula"
                        value={enrollment}
                        onChange={e => setEnrollment(e.target.value)}
                        disabled={isChecking}
                        style={{ marginBottom: '1rem' }}
                    />
                    <Button color="primary" block onClick={handleEnrollmentSubmit} disabled={isChecking}>
                        {isChecking ? 'Verificando...' : 'Verificar Matrícula'}
                    </Button>
                </FormGroup>
            )}

            <Fade in={enrollmentExists} tag="div">
                {enrollmentExists && (
                    <>
                        <FormGroup>
                            <Label for="nip">NIP</Label>
                            <Input
                                type="password"
                                name="nip"
                                id="nip"
                                placeholder="Ingresa tu NIP"
                                value={nip}
                                onChange={e => setNip(e.target.value)}
                                style={{ marginBottom: '1rem' }}
                            />
                        </FormGroup>
                        <Button color="danger" block onClick={handleLogin}>Log In</Button>
                        {/* <CardFooter className="text-center" style={{ marginTop: '1rem' }}>
                            <Button color="secondary" block onClick={onCancel}>Cancelar</Button>
                        </CardFooter> */}
                    </>
                )}
            </Fade>
        </Form>
    );
};

export default LoginForm;
