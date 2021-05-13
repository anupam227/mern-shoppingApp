import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'reactstrap';
import { logout } from '../../actions/authActions';


const Logout = () => {

    const dispatch = useDispatch()
    const onClick = () => {
        dispatch(logout())
    }
    return (
        <Fragment>
            <NavLink onClick={onClick} href='#'>
                Logout
            </NavLink>
        </Fragment>
    )
}

export default Logout;
