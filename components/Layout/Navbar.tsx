import Link from 'next/link';
import { Navbar as BootstrapNavBar, Nav, Container, Row, Col } from 'react-bootstrap';
import { SearchComponent } from '../SearchComponent';

export const Navbar = () => {
  const isActiveStyle = ({ isActive }: { isActive: boolean }) => (isActive ? 'text-primary nav-link' : 'nav-link');

  return (
    <Container fluid>
      <BootstrapNavBar bg="dark" color="white" expand="lg">
        <Container>
          <Row className="w-100">
            <Col md={6} sm={12} className="d-flex justify-content-end">
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
            <Col md={6} sm={12}>
              <SearchComponent />
            </Col>
          </Row>
        </Container>
      </BootstrapNavBar>
    </Container>
  );
};
