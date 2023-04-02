import { Col, Row } from 'react-bootstrap';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { useEstatesData } from '../../hooks/useEstatesData';
import { EstateCard } from './EstateCard';

export const EstatesList = () => {
  useFirestoreConnect([
    {
      collection: 'tags',
    },
    {
      collection: 'estates',
    },
    {
      collection: 'categories',
    },
    {
      collection: 'currencies',
    },
  ]);

  const firestore = useFirestore();

  const { categories, tags, estates, currencies } = useEstatesData();

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
