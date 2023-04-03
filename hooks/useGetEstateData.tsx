import { FC } from 'react';
import { useEstatesData } from './useEstatesData';

type UseGetEstateDataType = ({ id }: { id: string }) => EstateType;

const useGetEstateData: UseGetEstateDataType = ({ id }) => {
  const data = useEstatesData();

  const estate = data?.estates?.find((el) => el?.id === id);

  return estate;
};

export default useGetEstateData;
