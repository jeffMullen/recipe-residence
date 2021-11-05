// import React , {useState} from 'react';
// import Navbar from 'react-bootstrap/Navbar';
// import { Link } from 'react-router-dom';
// import { Modal, Tab} from 'react-bootstrap';
// import Nav from 'react-bootstrap/Nav';
// import Container from 'react-bootstrap/Container';
// import Auth from '../utils/auth';
// import SignUpForm from './SignupForm';
// import LoginForm from './LoginForm';

// function Navigation() {
//     // set modal display state
//     const [showModal, setShowModal] = useState(false);

//     return (
//         <>
//             <Navbar className="navbar-app" collapseOnSelect expand="lg" variant="light">
//                 <Container>
//                     <Navbar.Brand>Recipe Repo</Navbar.Brand>
//                     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//                     <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
//                         <Nav className='ml-auto'>
//                             {/* if user is logged in show saved books and logout */}
//                             {Auth.loggedIn() ? (
//                                 <>
//                                     <Nav.Link as={Link} to='/saved'>
//                                         See Your Recipes
//                                     </Nav.Link>
//                                     <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
//                                 </>
//                             ) : (
//                                 <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
//                             )}
//                         </Nav>

//                         {/* <Nav className="me-auto d-lg-flex m-lg-0">
//                             <Nav.Link href="/login">Login/Signup</Nav.Link>
//                         </Nav> */}

//                         <form className="d-flex col-12 col-lg-6">
//                             <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
//                                 id="dietary-restriction-search"></input>
//                             <button id="search" className="btn btn-outline-dark" type="submit">Search</button>
//                         </form>
//                     </Navbar.Collapse>
//                 </Container>
//             </Navbar>
//             <Modal
//                 size='lg'
//                 show={showModal}
//                 onHide={() => setShowModal(false)}
//                 aria-labelledby='signup-modal'>
//                 {/* tab container to do either signup or login component */}
//                 <Tab.Container defaultActiveKey='login'>
//                     <Modal.Header closeButton>
//                         <Modal.Title id='signup-modal'>
//                             <Nav variant='pills'>
//                                 <Nav.Item>
//                                     <Nav.Link eventKey='login'>Login</Nav.Link>
//                                 </Nav.Item>
//                                 <Nav.Item>
//                                     <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
//                                 </Nav.Item>
//                             </Nav>
//                         </Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <Tab.Content>
//                             <Tab.Pane eventKey='login'>
//                                 <LoginForm handleModalClose={() => setShowModal(false)} />
//                             </Tab.Pane>
//                             <Tab.Pane eventKey='signup'>
//                                 <SignUpForm handleModalClose={() => setShowModal(false)} />
//                             </Tab.Pane>
//                         </Tab.Content>
//                     </Modal.Body>
//                 </Tab.Container>
//             </Modal>
//         </>
//     )
// }

// export default Navigation;