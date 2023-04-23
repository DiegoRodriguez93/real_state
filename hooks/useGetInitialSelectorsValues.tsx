import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { RootState } from "../redux/reducers/rootReducers";

export const useGetInitialSelectorsValues = () => {
  useFirestoreConnect([
    {
      collection: "currencies",
    },
    {
      collection: "tags",
    },
    {
      collection: "categories",
    },
  ]);

  const state = useSelector<
    RootState,
    Record<string, Array<{ id: string; name: string }>>
  >((state) => ({
    categories: state?.firestore?.ordered?.categories,
    tags: state?.firestore?.ordered?.tags,
    currencies: state?.firestore?.ordered?.currencies,
  }));

  const isLoaded = Object.values(state).every(
    (property) => property !== undefined
  );

  return {
    categories: state?.categories,
    tags: state?.tags,
    currencies: state?.currencies,
    isLoaded
  };
};
