import { useSelector } from 'react-redux';

import { RootState } from '../redux/reducers/rootReducers';

export const useSearchCollectionData = () => {
  const data = useSelector<RootState, SelectorsType>((state) => state?.firestore?.ordered);

  let listOfCategoriesNames: Record<CategoryType['id'], CategoryType['name']> = {};

  if (data?.categories) {
    data?.categories?.forEach(({ id, name }) => {
      listOfCategoriesNames[id] = name;
    });
  }

  const estatesWithCategories = data.estates?.map((estate) => {
    const categoryName = listOfCategoriesNames[estate?.categoryId];
    return {
      ...estate,
      categoryName,
    };
  });

  return { estates: estatesWithCategories };
};
