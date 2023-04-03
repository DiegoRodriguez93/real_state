import { useSelector } from 'react-redux';

import { RootState } from '../redux/reducers/rootReducers';
import { useFirestoreConnect } from 'react-redux-firebase';

export const useEstatesData = () => {
  useFirestoreConnect([
    {
      collection: 'tags',
    },
    {
      collection: 'estates',
    },
    {
      collection: 'categories',
    },
    {
      collection: 'currencies',
    },
  ]);
  const data = useSelector<RootState, SelectorsType>((state) => state?.firestore?.ordered);

  const categories = data?.categories;
  const tags = data?.tags;
  const estates = data?.estates;
  const currencies = data?.currencies;

  const estatesWithPropNamesInsteadOfIds = estates?.map((estate) => ({
    ...estate,
    currency: currencies?.[estate?.currency]?.name,
    tag: tags?.[estate?.tag]?.name,
    category: categories?.[estate?.category]?.name,
  }));

  console.log(estatesWithPropNamesInsteadOfIds);

  return {
    categories,
    tags,
    estates,
    currencies,
  };
};
