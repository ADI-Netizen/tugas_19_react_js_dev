import React from 'react';
import { Image, Nav, Navbar } from 'react-bootstrap';

function Navigasi(props) {
    return (
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="#home">
                <Image
                    alt=""
                    src="https://image.shutterstock.com/image-vector/transport-logo-template-260nw-351283481.jpg"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    roundedCircle
                />{' '}
                    Kusmara Trans
            </Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#">Home</Nav.Link>
                <Nav.Link href="#">Armada</Nav.Link>
                <Nav.Link href="#" active>Karyawan</Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default Navigasi;