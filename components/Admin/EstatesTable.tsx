import { useEstatesData } from '../../hooks/useEstatesData';
import { formatCurrency } from '../../utils/currency';
import { Table } from '../Table';

const fomatOperation = (operation_type: EstateType['operation_type']) => {
  if (operation_type === 'rent') {
    return 'Alquiler';
  } else {
    return 'Venta';
  }
};

const columns = [
  {
    name: 'Nombre',
    selector: (row: EstateType) => row.estate_name,
  },
  {
    name: 'Precio',
    selector: (row: EstateType) => `${row.currency} ${formatCurrency(String(row.price))}`,
  },
  {
    name: 'Operación',
    selector: (row: EstateType) => fomatOperation(row.operation_type),
  },
  {
    name: 'Dirección',
    selector: (row: EstateType) => row.address ?? '-',
  },
];

export const EstatesTable = () => {
  const data = useEstatesData();
  const estates = data?.estates ?? [];

  return <Table columns={columns} data={estates} />;
};
