import React from "react";
import { useRouter } from "next/router";

import { Layout } from "../../../components/Layout";
import { FormProperty } from "../../../components/Forms/FormProperty";
import useGetEstateData from "../../../hooks/useGetEstateData";
import { isEmpty } from "lodash";
import { useGetInitialSelectorsValues } from "../../../hooks/useGetInitialSelectorsValues";

const PropertyEdit = () => {
  const router = useRouter();
  const params = router.query;
  const estateId =
    typeof params?.estateId === "object" ? "" : params?.estateId ?? "";

  const estateData = useGetEstateData({ id: estateId });
  const { categories, tags, currencies, isLoaded } = useGetInitialSelectorsValues();

  const isCorrectState = !isEmpty(estateData) && isLoaded;

  return (
    <Layout disableHeader>
      {isCorrectState ? (
        <>
          <h2 className="my-5">Editar Propiedad:</h2>
          <FormProperty
            isEditMode
            estateData={estateData}
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

export default PropertyEdit;
