import React, { useEffect, useState } from 'react';
import {
    Button, Modal, ModalHeader,ModalBody,
    Form, FormGroup, Label, Input,NavLink,Alert, Container
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';



const LoginModal = () => {

    const [modal, setModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMsg] = useState(null);
    const dispatch = useDispatch();
    const {isAuthenticated} = useSelector(state => state.auth);
    const {msg} = useSelector(state => state.error);

    
    const toggle = () => {
        dispatch(clearErrors())   
        setModal(!modal)
    }
    const onChange = (e) => {
        if(e.target.name == 'email')
            setEmail(e.target.value)     
        if(e.target.name == 'password')
            setPassword(e.target.value)
    }

    useEffect(() => {
        setMsg(msg)
        if(modal) {
            if(isAuthenticated) {
                toggle()
            }
        }
    })

    const onSubmit = e => {
        e.preventDefault();
        dispatch(login({email,password}))
        
    }
    return (
        <Container>
            <NavLink onClick={toggle} href="#">
                Login
            </NavLink>
            <Modal
                isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Login</ModalHeader>
            {msg ? (<Alert color='danger'>{msg}</Alert>) : null}
            <ModalBody>
                <Form onSubmit={onSubmit}>
                    <FormGroup>
                        <Label for="email">Email</Label>    
                        <Input type="email"
                            name="email"
                            id="email"
                            placeholder="email"
                            className="mb-3"
                            onChange={onChange} />
                        <Label for="password">Password</Label>    
                        <Input type="password"
                            name="password"
                            id="password"
                            placeholder="password"
                            className="mb-3"
                            onChange={onChange} />        
                        <Button
                        color="dark" style={{marginTop: '2rem'}}
                        block
                        >Login</Button>    
                    </FormGroup>
                </Form>
            </ModalBody>        
            </Modal>    
        </Container>
    )
}

export default LoginModal; 
