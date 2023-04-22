import React from 'react';
import { useRouter } from 'next/router';

import { Layout } from '../../../components/Layout';
import { FormProperty } from '../../../components/Forms/FormProperty';

const PropertyEdit = () => {
  const router = useRouter();
  const params = router.query;
  const estateId = typeof params?.estateId === 'object' ? '' : params?.estateId ?? '';

  return (
    <Layout disableHeader>
      <h2 className="my-5">Editar Propiedad:</h2>
      <FormProperty estateId={estateId} />
    </Layout>
  );
};

export default PropertyEdit;
