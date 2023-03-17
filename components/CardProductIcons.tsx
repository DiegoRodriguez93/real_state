import { FC } from 'react';
import { HeartOutline, Heart, TrashOutline } from 'react-ionicons';

type CardProductIconsType = {
  productsIdOfFavorites: Array<string>;
  id: ProductType['id'];
  name: ProductType['name'];
  handleFavorite: (isFavorite: boolean) => void;
  deleteProduct: () => void;
};

export const CardProductIcons: FC<CardProductIconsType> = ({
  productsIdOfFavorites,
  id,
  name,
  handleFavorite,
  deleteProduct,
}) => {
  return (
    <>
      {productsIdOfFavorites.includes(id) ? (
        <Heart
          color="#a83f39"
          cssClasses="pointer"
          onClick={() => handleFavorite(true)}
          title={`Remove ${name} to favorites`}
          height="30px"
          width="30px"
        />
      ) : (
        <HeartOutline
          color="#a83f39"
          cssClasses="pointer"
          onClick={() => handleFavorite(false)}
          title={`Add ${name} to favorites`}
          height="30px"
          width="30px"
        />
      )}
      <TrashOutline
        color="#666666"
        cssClasses="pointer"
        onClick={deleteProduct}
        title={`Delete ${name}`}
        height="30px"
        width="30px"
      />
    </>
  );
};
