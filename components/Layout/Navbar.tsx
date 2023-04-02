import Link from 'next/link';
import { Navbar as BootstrapNavBar, Nav, Container, Row, Col } from 'react-bootstrap';
import classes from './Navbar.module.scss';
import Image from 'next/image';
import logoImg from './logo-dummy.png';

export const Navbar = () => {
  const isActiveStyle = ({ isActive }: { isActive: boolean }) => (isActive ? 'text-primary nav-link' : 'nav-link');

  return (
    <Container className={classes.containerNavbar} fluid>
      <BootstrapNavBar bg="light" color="black" expand="lg">
        <Container>
          <Row className="w-100">
            <Col sm={1} className="d-flex">
              <Image className={classes.logo} src={logoImg} alt="logo" />
            </Col>
            <Col sm={11} className="d-flex">
              <Nav>
                <Link className="nav-link" href="/">
                  Home
                </Link>
                <Link className="nav-link" href="/favorites">
                  Favorites
                </Link>
                <Link className="nav-link" href="/admin">
                  Admin
                </Link>
              </Nav>
            </Col>
          </Row>
        </Container>
      </BootstrapNavBar>
    </Container>
  );
};
