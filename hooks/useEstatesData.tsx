import { useSelector } from 'react-redux';

import { RootState } from '../redux/reducers/rootReducers';

export const useEstatesData = () => {
  const data = useSelector<RootState, SelectorsType>((state) => state?.firestore?.ordered);

  const categories = data?.categories;
  const tags = data?.tags;
  const estates = data?.estates;
  const currencies = data?.currencies;

  return {
    categories,
    tags,
    estates,
    currencies,
  };
};
