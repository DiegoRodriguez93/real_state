import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers/rootReducers';

export const useProductData = (onlyFavorites?: boolean) => {
  const data = useSelector<RootState, SelectorsType>((state) => state?.firestore?.ordered);
  
  const products = data?.products;
  const categories = data?.categories;
  const favorites = data?.currentUser?.[0]?.favorites;
  const productsIdOfFavorites = data?.currentUser?.[0]?.favorites.map(({ product_id }) => product_id);

  const productsOrdersByCategory: Record<ProductType['categoryId'], Array<ProductType>> = {};

  if (products) {
    products?.forEach((product) => {
      if (onlyFavorites && !productsIdOfFavorites?.includes(product?.id)) {
        return;
      }

      if (Array.isArray(productsOrdersByCategory[product?.categoryId])) {
        productsOrdersByCategory[product?.categoryId] = [...productsOrdersByCategory[product?.categoryId], product];
      } else {
        productsOrdersByCategory[product?.categoryId] = [product];
      }
    });
  }

  const categoriesWithProducts = categories?.filter(({ id }) => Object.keys(productsOrdersByCategory).includes(id)) ?? [];

  return {
    products,
    categories,
    favorites,
    productsIdOfFavorites,
    productsOrdersByCategory,
    categoriesWithProducts,
  };
};
