import { Link, Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
// import Button from 'react-bootstrap/Button';

const Layout = () => (
  <div className="h-100 d-flex flex-column">
    <Navbar bg="white" className="shadow-sm mb-2">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="text-reset text-decoration-none">
            Hexlet Chat
          </Link>
        </Navbar.Brand>
      </Container>
    </Navbar>
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <Outlet />
      </div>
    </div>
  </div>
);

export default Layout;
