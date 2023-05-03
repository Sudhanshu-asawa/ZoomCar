import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom';


function Header() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">ZoomCar</Navbar.Brand>
                    <Nav className="me-auto m-lg-1">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/listing">Cars Available</Nav.Link>
                        <Nav.Link href="/logout">Logout</Nav.Link>

                    </Nav>
                </Container>
            </Navbar>

        </>
    );
}

export default Header;