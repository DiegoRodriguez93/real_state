import React from 'react';

import { Layout } from '../../../components/Layout';
import { NewProperty } from '../../../components/Forms/NewProperty';

const PropertyNew = () => {
  return (
    <Layout disableHeader>
      <h2 className="my-5">Subir Nueva Propiedad:</h2>
      <NewProperty />
    </Layout>
  );
};

export default PropertyNew;
