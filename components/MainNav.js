import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useRouter } from "next/router";
import { readToken, removeToken } from "@/lib/authenticate"; // Functions to handle JWT token

export default function MainNav() {
  const router = useRouter();
  const token = readToken(); // Get current user token

  // Logout function
  const logout = () => {
    removeToken(); // Remove token from localStorage
    router.push("/login"); // Redirect to login page
  };

  return (
    <Navbar className="fixed-top navbar-dark bg-dark">
      <Container>
        <Navbar.Brand href="/">Kasen Tei</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/about">About</Nav.Link>

          {/* Show Register if not logged in */}
          {!token && <Nav.Link href="/register">Register</Nav.Link>}

          {/* Show user dropdown if logged in */}
          {token && (
            <NavDropdown title={token.userName} id="user-dropdown">
              <NavDropdown.Item href="/favourites">Favourites</NavDropdown.Item>
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Container>
      <br /><br />
    </Navbar>
  );
}