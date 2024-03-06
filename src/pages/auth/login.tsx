import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Card, CardBody } from 'reactstrap';

const Login = () => {
    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md="6">
                    <Card>
                        <CardBody>
                            <h1 className="text-center">Login</h1>
                            <Form>
                                <FormGroup>
                                    <Label for="username">Username</Label>
                                    <Input type="text" name="username" id="username" placeholder="Enter username" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input type="password" name="password" id="password" placeholder="Password" />
                                </FormGroup>
                                <Button color="danger" block>Log In</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
