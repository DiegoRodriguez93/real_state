import dynamic from 'next/dynamic';
import React, { useState, useCallback, useMemo, FC } from 'react';
import { Button } from 'react-bootstrap';
import { TableColumn } from 'react-data-table-component';

type TableType = {
  data: Array<any>;
  columns: TableColumn<any>[];
};

const DataTable = dynamic(() => import('react-data-table-component').then((mod) => mod), { ssr: false });

export const Table: FC<TableType> = ({ data, columns }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  // const [data, setData] = useState([]);

  const handleRowSelected = useCallback((state: any) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = useMemo(() => {
    const handleDelete = () => {
      setToggleCleared(!toggleCleared);
      /*       if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map((r) => r)}?`)) {
        setToggleCleared(!toggleCleared);
        // setData(differenceBy(data, selectedRows, 'title'));
      } */
    };

    const handleUpdate = () => {};

    return (
      <>
        <Button key="update" onClick={handleUpdate} style={{ backgroundColor: '#007bff', marginRight: '10px' }}>
          Actualizar
        </Button>
        <Button key="delete" onClick={handleDelete} style={{ backgroundColor: 'red' }}>
          Eliminar
        </Button>
      </>
    );
  }, [data, selectedRows, toggleCleared]);

  return (
    <DataTable
      title="Propiedades"
      columns={columns}
      data={data}
      selectableRows
      contextActions={contextActions}
      onSelectedRowsChange={handleRowSelected}
      clearSelectedRows={toggleCleared}
      pagination
    />
  );
};
