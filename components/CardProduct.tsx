import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

import { useFirestore } from 'react-redux-firebase';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import { CardProductAddedOnTime } from './CardProductAddedOnTime';
import { CardProductIcons } from './CardProductIcons';

type CardProductType = ProductType & {
  favorites: CurrentUser['favorites'];
  userId: string;
  productsIdOfFavorites: Array<string>;
  onlyFavorites?: boolean;
};

export const CardProduct: FC<CardProductType> = ({
  id,
  name,
  file,
  favorites,
  productsIdOfFavorites = [],
  userId,
  onlyFavorites,
}) => {
  const firestore = useFirestore();

  const handleFavorite = async (isFavorite: boolean) => {
    if (id) {
      let newFavorites = [...favorites, { product_id: id, time_added: new Date().toISOString() }];
      if (isFavorite) {
        newFavorites = favorites?.filter(({ product_id }) => product_id !== id);
      }
      const firestorePromise = firestore.collection('users').doc(userId).set({ favorites: newFavorites });

      toast.promise(firestorePromise, {
        pending: isFavorite ? 'Removing from favorites...' : 'Adding to favorites...',
        success: `${name ?? 'The Product'} has been ${isFavorite ? 'removed' : 'added'} to favorites successfully 👌`,
        error: `An error occurred when ${isFavorite ? 'removing' : 'adding'} ${
          name ?? 'the Product'
        } to favorites, please try again later🤯`,
      });
    }
  };

  const deleteProduct = () => {
    if (id) {
      Swal.fire({
        title: `Are you sure you want to delete "${name}"?`,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        confirmButtonColor: '#a83f39',
        imageUrl: file,
        imageHeight: 150,
        imageAlt: name,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const firestorePromise = firestore.collection('products').doc(id).delete();
          toast.promise(firestorePromise, {
            pending: `Removing ${name}...`,
            success: `${name ?? 'The Product'} has been removed successfully 👌`,
            error: `An error occurred when removing ${name ?? 'the Product'} , please try again later🤯`,
          });
        }
      });
    }
  };

  return (
    <Card className="m-2">
      <Card.Img style={{ maxHeight: 250, objectFit: 'contain' }} className="p-4" src={file} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>

        <Row>
          <Col sm={12}>
            <CardProductIcons
              productsIdOfFavorites={productsIdOfFavorites}
              id={id}
              name={name}
              deleteProduct={deleteProduct}
              handleFavorite={handleFavorite}
            />
          </Col>
          <Col className="mt-2" sm={12}>
            {onlyFavorites && <CardProductAddedOnTime favorites={favorites} id={id} />}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
