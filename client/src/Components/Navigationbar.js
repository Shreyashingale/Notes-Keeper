import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

const Navigationbar = () => {
    return (
        <div>
            <Navbar  bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand as = {Link} to= {"/"} >Note-Keeper</Navbar.Brand>
                    <Nav className="me-auto">
                      

                        <Nav.Link as = {Link} to= {"/"}>Register</Nav.Link>
                        <Nav.Link as = {Link} to= {"/login"}>Login</Nav.Link>
                        {/* <Nav.Link as = {Link} to= {"/dashboard"}>Dashboard</Nav.Link> */}
                        
                    </Nav>
                </Container> 
            </Navbar>
        </div>
    )
}

export default Navigationbar







