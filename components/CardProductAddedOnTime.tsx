import { format } from 'date-fns';
import { FC } from 'react';

type AddedOnTimeType = {
  favorites: CurrentUser['favorites'];
  id: ProductType['id'];
};

export const CardProductAddedOnTime: FC<AddedOnTimeType> = ({ favorites, id }) => {
  const timeAdded = favorites?.find((fav) => fav?.product_id === id)?.time_added;
  const formatedTime = timeAdded && format(new Date(timeAdded), 'M-d-Y H:I');

  if (!formatedTime) {
    return null;
  }

  return <small>Added {formatedTime}</small>;
};
