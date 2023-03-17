import { FC } from 'react';

type CategoryColorBlockType = {
  color: string;
};

export const CategoryColorBlock: FC<CategoryColorBlockType> = ({ color }) => {
  return <div style={{ height: '22px', width: '22px', backgroundColor: color, marginLeft: '10px' }}></div>;
};
