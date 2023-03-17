import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';

import { Layout } from '../../components/Layout';
import { Table } from '../../components/Table';

type Row = {
  title: string;
  year: string;
};

const columns = [
  {
    name: 'Title',
    selector: (row: Row) => row.title,
  },
  {
    name: 'Year',
    selector: (row: Row) => row.year,
  },
];

const data = [
  {
    id: 1,
    title: 'Beetlejuice',
    year: '1988',
  },
  {
    id: 2,
    title: 'Ghostbusters',
    year: '1984',
  },
];

const Admin = () => {
  const handleAddNewProperty = () => window.location.assign('/property/new'); // TODO: MOVE TO CONST

  return (
    <Layout disableHeader>
      <Row>
        <Col style={{ padding: 15 }} sm={6}>
          <Button onClick={handleAddNewProperty}>Agregar una propiedad</Button>
        </Col>
        <Col sm={12}>
          <Table columns={columns} data={data} />
        </Col>
      </Row>
    </Layout>
  );
};

export default Admin;
