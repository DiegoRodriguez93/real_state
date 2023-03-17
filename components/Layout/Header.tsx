import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import { Heart } from 'react-ionicons';
import headerBGIMG from './header-bg.jpg';

import { SearchComponent } from '../SearchComponent';

console.log('headerBGIMG :>> ', headerBGIMG);

export const Header = () => {
  return (
    <Container className="bg-dark text-light" fluid>
      <Row
        className="d-flex flex-row justify-content-center align-items-center text-center"
        style={{
          height: '550px',
          backgroundImage: `url(${headerBGIMG.src})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          position: 'relative',
        }}
      >
        <Col md={4} sm={12}>
          <h4>UnlockCommerce</h4>
        </Col>
        <Col md={4} sm={12}>
          <SearchComponent />
        </Col>
        <Col md={4} sm={12}>
          <Heart
            color="#a83f39"
            onClick={() => window.location.assign('/favorites')}
            title={`Go to favorites page`}
            height="30px"
            width="30px"
            cssClasses="pointer mr-5"
          />
          <Link className="text-light" href="/favorites">
            Favorites List
          </Link>
        </Col>
      </Row>
    </Container>
  );
};
