import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { Modal, Tab } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Auth from '../../utils/auth';
import SignUpForm from '../LoginSignup/SignupForm';
import LoginForm from '../LoginSignup/LoginForm';
// import { useQuery } from '@apollo/client';
// import { SEARCH_RECIPES } from '../../utils/queries'
import styles from './Navbar.module.scss';

function Navigation() {
    // set modal display state
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Navbar className={styles.navbarApp} collapseOnSelect expand="lg" variant="light">
                <Container>
                    <Navbar.Brand className={styles.navbarBrand}>Recipe Repo</Navbar.Brand>
                    <Navbar.Toggle
                        className={`${styles.button}`}
                        aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                        <Nav className={`${styles.nav} ml-auto`}>
                            {/* if user is logged in show saved books and logout */}
                            {Auth.loggedIn() ? (
                                <>
                                    <Nav.Link
                                        className={`${styles.nav}`}
                                        as={Link} to='/'>
                                        Home
                                    </Nav.Link>
                                    <Nav.Link
                                        className={`${styles.nav}`}
                                        as={Link} to='/profile'>
                                        My Recipes
                                    </Nav.Link>
                                    <Nav.Link
                                        className={`${styles.nav}`}
                                        onClick={Auth.logout}>Logout</Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link
                                        className={`${styles.nav}`}>Home</Nav.Link>
                                    <Nav.Link
                                        className={`${styles.nav}`}
                                        onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Modal
                size='lg'
                show={showModal}
                onHide={() => setShowModal(false)}
                aria-labelledby='signup-modal'>
                {/* tab container to do either signup or login component */}
                <Tab.Container defaultActiveKey='login'>
                    <Modal.Header closeButton>
                        <Modal.Title id='signup-modal'>
                            <Nav variant='pills'>
                                <Nav.Item>
                                    <Nav.Link eventKey='login'>Login</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Tab.Content>
                            <Tab.Pane eventKey='login'>
                                <LoginForm handleModalClose={() => setShowModal(false)} />
                            </Tab.Pane>
                            <Tab.Pane eventKey='signup'>
                                <SignUpForm handleModalClose={() => setShowModal(false)} />
                            </Tab.Pane>
                        </Tab.Content>
                    </Modal.Body>
                </Tab.Container>
            </Modal>
        </>
    )
}

export default Navigation;