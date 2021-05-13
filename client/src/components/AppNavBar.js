import React, { Fragment, useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem, 
    Container
} from 'reactstrap';
import RegisterModel from './auth/RegisterModel';
import LoginModel from './auth/LoginModel';
import Logout from './auth/Logout';
import { useSelector } from 'react-redux';

const  AppNavBar = () => {
 
    const [isOpen,setToggle] = useState(false);
    const {isAuthenticated,name} = useSelector(state => state.auth)

    const authLinks = (
        <Fragment>
            <NavItem>
                <span className="navbar-text mr-3">
                    <strong>{ name ? `Welcome ${name}`: ''}</strong>
                </span>
            </NavItem>
            <NavItem>
                <Logout/>
            </NavItem>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <NavItem>
                <RegisterModel/>
            </NavItem>
            <NavItem>
                <LoginModel/>
            </NavItem>
        </Fragment>
    )
    return (
        <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href="/">shoppingList</NavbarBrand>
                    <NavbarToggler onClick={() => setToggle(!isOpen)}/>
                    <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        { isAuthenticated ? authLinks: guestLinks}   
                    </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default AppNavBar;