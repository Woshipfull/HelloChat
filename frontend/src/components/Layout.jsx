import { Outlet } from 'react-router-dom';
import NavbarCustom from './NavbarCustom';

const Layout = () => (
  <div className="h-100 d-flex flex-column">
    <NavbarCustom />
    <Outlet />
  </div>
);

export default Layout;
