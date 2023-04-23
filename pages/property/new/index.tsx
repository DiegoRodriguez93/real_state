import React from "react";

import { Layout } from "../../../components/Layout";
import { FormProperty } from "../../../components/Forms/FormProperty";
import { useGetInitialSelectorsValues } from "../../../hooks/useGetInitialSelectorsValues";

const PropertyNew = () => {
  const {
    categories,
    tags,
    currencies,
    isLoaded,
  } = useGetInitialSelectorsValues();

  return (
    <Layout disableHeader>
      {isLoaded ? (
        <>
          <h2 className="my-5">Subir Nueva Propiedad:</h2>
          <FormProperty
            categories={categories}
            tags={tags}
            currencies={currencies}
          />
        </>
      ) : (
        "Loading..."
      )}
    </Layout>
  );
};

export default PropertyNew;
