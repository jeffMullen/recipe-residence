import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

function Navigation() {


    return (
        <>
            <Navbar className="navbar-app" collapseOnSelect expand="lg" variant="light">
                <Container>
                    <Navbar.Brand>Recipe Repo</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                        <Nav className="me-auto d-lg-flex m-lg-0">
                            <Nav.Link href="/login">Login</Nav.Link>
                        </Nav>
                        <form className="d-flex col-12 col-lg-6">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                                id="dietary-restriction-search"></input>
                            <button id="search" className="btn btn-outline-dark" type="submit">Search</button>
                        </form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* <nav className="navbar-app navbar navbar-expand-lg py-4 d-flex align-items-center">
                <h1 className="px-3 m-0 d-flex"><a className="navbar-brand" id="site-title" href="/">Recipe Repo</a></h1>
                <button className="navbar-toggler navbar-light" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse p-0 mr-0 ml-3 mb-3 mb-lg-0 col-lg-7 col-xl-5"
                    id="navbarSupportedContent">
                    <form className="d-flex col-12 col-lg-6">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                            id="dietary-restriction-search"></input>
                        <button id="search" className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    <ul
                        className="row navbar-nav">
                        <li className="nav-item pl-0">
                            <a id="logout" className="nav-link active mr-2" aria-current="page" href="#">Logout</a>
                        </li>
                        <li class="nav-item pl-0">
                            <a id="login" class="nav-link active mr-2" aria-current="page" href="#">Login</a>
                        </li>
                    </ul>
                </div>
            </nav> */}
        </>
    )
}

export default Navigation;