import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import { Heart } from 'react-ionicons';
import headerBGIMG from './bg.jpeg';

import { SearchComponent } from '../SearchComponent';

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
        <Col md={4} sm={12}></Col>
        <Col md={4} sm={12}>
          <div>
            <SearchComponent />
          </div>
        </Col>
        <Col md={4} sm={12}></Col>
      </Row>
    </Container>
  );
};
