import Container from 'react-bootstrap/Container';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Navbar, Button, Nav, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const NavbarCustom = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthorised = () => window.localStorage.user !== undefined;

  const handleClick = () => {
    window.localStorage.removeItem('user');
    dispatch({ type: 'USER_LOGOUT' });
    navigate('/login');
  };

  const username = () => {
    if (isAuthorised()) {
      return JSON.parse(window.localStorage.user).username.toUpperCase();
    }
    return 'No user';
  };

  return (
    <Navbar bg="white" className="shadow-sm mb-2" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="text-reset text-decoration-none">
            Hexlet Chat
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Offcanvas id="basic-navbar-nav" placement="end">
          <Offcanvas.Header closeButton className="bg-light shadow">
            <p className="h4 m-0">{username()}</p>
          </Offcanvas.Header>
          <Offcanvas.Body className="d-flex flex-lg-row flex-column justify-content-end gap-2">
            <Nav className="gap-1">
              {isAuthorised() && (
                <Button onClick={handleClick}>{t('navbar.btn')}</Button>
              )}
              {/* <Button>THEME</Button>
              <Button>LANG</Button> */}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavbarCustom;
