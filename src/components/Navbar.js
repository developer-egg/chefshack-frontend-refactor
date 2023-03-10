import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const AppNavbar = () => {
    return (
        <Navbar>
            <Container>
                <Link to="/" className="navbar-brand">ChefShack</Link>

                <Nav>
                    <Link to="/recipes" className="nav-link">Recipes</Link>
                    <Link to="/login" className="nav-link">Login</Link>
                    <Link to="/create" className="nav-link">Create</Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default AppNavbar;