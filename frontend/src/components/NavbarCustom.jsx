import Container from 'react-bootstrap/Container';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Navbar, Button, Nav, Offcanvas, ButtonGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const lngs = {
  en: 'En',
  uk: 'Uk',
};

const NavbarCustom = () => {
  const { t, i18n } = useTranslation();
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

  const lngsBtnsRender = () =>
    Object.keys(lngs).map((lng) => {
      if (i18n.resolvedLanguage === lng) {
        return (
          <Button variant="primary" key={lng} disabled>
            {lngs[lng]}
          </Button>
        );
      }
      return (
        <Button
          variant="outline-primary"
          key={lng}
          onClick={() => i18n.changeLanguage(lng)}
        >
          {lngs[lng]}
        </Button>
      );
    });

  return (
    <Navbar bg="white" className="shadow-sm mb-2" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="text-reset text-decoration-none">
            HelloCHAT
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Offcanvas id="basic-navbar-nav" placement="end">
          <Offcanvas.Header closeButton className="bg-light shadow">
            <p className="h4 m-0">{username()}</p>
          </Offcanvas.Header>
          <Offcanvas.Body className="d-flex flex-lg-row flex-column justify-content-end">
            <Nav className="gap-3">
              {isAuthorised() && (
                <Button onClick={handleClick}>{t('navbar.btn')}</Button>
              )}
              <ButtonGroup>
                {lngsBtnsRender()}
              </ButtonGroup>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavbarCustom;
