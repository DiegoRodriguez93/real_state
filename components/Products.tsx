import { FC } from 'react';
import { Accordion, Col, Row } from 'react-bootstrap';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { toast } from 'react-toastify';
import { useProductData } from '../hooks/useProductData';
import Swal from 'sweetalert2';

import { CardProduct } from './CardProduct';
import { CategoryColorBlock } from './CategoryColorBlock';

const MOCK_USER_ID = 'xLpODhv3eZowb11Sjvo4';

type ProductsType = {
  onlyFavorites?: boolean;
};

export const Products: FC<ProductsType> = ({ onlyFavorites }) => {
  useFirestoreConnect([
    {
      collection: 'users',
      doc: MOCK_USER_ID,
      storeAs: 'currentUser',
    },
    {
      collection: 'products',
    },
    {
      collection: 'categories',
    },
  ]);

  const firestore = useFirestore();

  const { categories, productsOrdersByCategory, favorites, productsIdOfFavorites, categoriesWithProducts } =
    useProductData(onlyFavorites);

  const handleRemoveCategory = async (id: CategoryType['id'], name: CategoryType['name']) => {
    Swal.fire({
      title: `Are you sure you want to delete the whole category "${name}" and its products?`,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#a83f39',
    }).then(async (result) => {
      if (result.isConfirmed) {
        let promises = [];
        promises.push(firestore.collection('categories').doc(id).delete());
        // this also removes the products inside of the category
        productsOrdersByCategory[id].forEach((product) =>
          promises.push(firestore.collection('products').doc(product?.id).delete()),
        );
        const req = Promise.all(promises);
        toast.promise(req, {
          pending: `Removing ${name}...`,
          success: `${name ?? 'The Product'} has been removed successfully 👌`,
          error: `An error occurred when removing ${name ?? 'the Product'} , please try again later🤯`,
        });
      }
    });
  };

  const hasCategories = categories && categories.length > 0;
  const defaultActiveKeys = categories?.map(({ id }) => id);

  return (
    <>
      {defaultActiveKeys && (
        <Accordion className="m-5" defaultActiveKey={defaultActiveKeys} alwaysOpen>
          {hasCategories &&
            categoriesWithProducts?.map(({ name, color, id }) => (
              <Accordion.Item key={id} eventKey={id}>
                <Accordion.Header>
                  {name} <CategoryColorBlock color={color} />
                </Accordion.Header>
                <Accordion.Body>
                  <Row>
                    {productsOrdersByCategory[id]?.map((product) => (
                      <Col md={3} sm={12} key={product?.name}>
                        <CardProduct
                          id={product?.id}
                          name={product?.name}
                          file={product?.file}
                          categoryId={product?.categoryId}
                          productsIdOfFavorites={productsIdOfFavorites}
                          favorites={favorites}
                          userId={MOCK_USER_ID}
                          onlyFavorites={onlyFavorites}
                        />
                      </Col>
                    ))}
                  </Row>
                  {!onlyFavorites && (
                    <Row>
                      <small onClick={() => handleRemoveCategory(id, name)} className="text-danger pointer">
                        Remove Category
                      </small>
                    </Row>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            ))}
        </Accordion>
      )}
    </>
  );
};
