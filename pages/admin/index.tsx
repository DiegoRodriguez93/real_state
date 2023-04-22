import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';

import { Layout } from '../../components/Layout';
import { EstatesTable } from '../../components/Admin/EstatesTable';

const Admin = () => {
  const handleAddFormProperty = () => window.location.assign('/property/new'); // TODO: MOVE TO CONST

  return (
    <Layout disableHeader>
      <Row>
        <Col style={{ padding: 15 }} sm={6}>
          <Button onClick={handleAddFormProperty}>Agregar una propiedad</Button>
        </Col>
        <Col sm={12}>
          <EstatesTable />
        </Col>
      </Row>
    </Layout>
  );
};

export default Admin;
