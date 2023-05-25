import React, { useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Outlet, NavLink } from 'react-router-dom';

import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setCredentials } from '../userSlice/userSlice';
import { useGetVerifyUserStatusQuery } from '../api/apiSlice';

const RootPage = () => {
    const dispatch = useDispatch();

    const { userInfo } = useSelector(state => state.auth);

    const { data } = useGetVerifyUserStatusQuery('userStatus', {
        pollingInterval: 900000
    });

    const handleLogout = () => {
        localStorage.clear()
        dispatch(logout())
    }

    useEffect(() => {
        if (data) dispatch(setCredentials(data));
    }, [data, dispatch]);

    return (
        <>
            <Navbar className='navbar navbar-expand-lg bg-light'>
                <div className='container-fluid'>
                    <NavLink className="navbar-brand" to="/">MyCommercePage</NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {/* Other navigation links */}
                        </Nav>
                        <ul className="navbar-nav justify-content-end ms-auto">
                            {!userInfo ?
                                (
                                    <Nav>
                                        <NavLink className="nav-link" to="/login">Login</NavLink>
                                        <NavLink className="nav-link" to="/signup">Signup</NavLink>
                                    </Nav>
                                ) : (
                                    < Nav >
                                        <NavLink className="nav-link" to="/dashboard">Products</NavLink>
                                        <NavLink className="nav-link" to="/cart">Cart</NavLink>
                                        <NavLink className="nav-link" onClick={() => handleLogout()}>Logout</NavLink>
                                    </Nav >
                                )}

                        </ul>

                    </Navbar.Collapse>
                </div>

            </Navbar>
            <div id="detail" className='container-sm' style={{ padding: '3rem' }}>
                <section>
                    <Outlet />
                </section>

            </div>
            <div className="mt-3 pg-4 bg-dark text-white text-center">
                <Footer />
            </div>
        </>

    );
};

export default RootPage;
