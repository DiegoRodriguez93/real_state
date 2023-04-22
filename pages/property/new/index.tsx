import React from 'react';

import { Layout } from '../../../components/Layout';
import { FormProperty } from '../../../components/Forms/FormProperty';

const PropertyNew = () => {
  return (
    <Layout disableHeader>
      <h2 className="my-5">Subir Nueva Propiedad:</h2>
      <FormProperty />
    </Layout>
  );
};

export default PropertyNew;
