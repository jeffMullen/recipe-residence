import React from 'react';

function Navbar() {


    return (
        <>
            <nav class="navbar navbar-expand-lg py-0">
                {/* <div class="container-fluid p-0 d-flex justify-content-between"> */}
                <a class="navbar-brand ml-4 py-0" id="site-title" href="/">Recipe Repo</a>
                <button class="navbar-toggler navbar-light" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse p-0 mr-0 ml-3 mb-3 mb-lg-0 col-lg-7 col-xl-5 w-100"
                    id="navbarSupportedContent">
                    <form class="d-flex col-12 col-lg-6">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                            id="dietary-restriction-search"></input>
                        <button id="search" class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    <ul
                        class="row-fluid col-12 col-lg-6 d-flex justify-content-lg-end navbar-nav me-auto mb-2 mb-lg-0 mt-2 mt-lg-0">
                        <li class="nav-item pl-0">
                            <a id="logout" class="nav-link active mr-2" aria-current="page" href="#">Logout</a>
                        </li>
                    </ul>
                </div>
                {/* </div> */}
            </nav>
        </>
    )
}

export default Navbar;