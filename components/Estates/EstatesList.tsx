import { Col, Row } from 'react-bootstrap';

import { EstateCard } from './EstateCard';

import { useEstatesData } from '../../hooks/useEstatesData';

export const EstatesList = () => {
  const { estates } = useEstatesData();

  return (
    <Row>
      <Col className="my-5" sm={12}>
        <h4>Propiedades:</h4>
      </Col>
      {estates?.map((estate: EstateType) => (
        <Col lg={4} md={4} sm={12} key={estate.id}>
          <EstateCard {...estate} />
        </Col>
      ))}
    </Row>
  );
};
