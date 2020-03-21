import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function AppNavbar() {
  return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Next.js Demo App</Navbar.Brand>
        </Container>
      </Navbar>
  );
}

export default AppNavbar;
