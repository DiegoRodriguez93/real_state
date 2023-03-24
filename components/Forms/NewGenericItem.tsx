import { FC, FormEvent, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useFirestore } from 'react-redux-firebase';
import { getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

type NewGenericItemProps = {
  onHide: () => void;
  itemNameLabel: string;
  itemCollectionName: string;
};

export const NewGenericItem: FC<NewGenericItemProps> = ({ onHide, itemNameLabel, itemCollectionName }) => {
  const [itemName, setItemName] = useState('');
  const firestore = useFirestore();

  const handleCreateNewGenericItem = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!itemName) {
      Swal.fire('Error!', `${itemNameLabel} es requerido`, 'error');
      return;
    }
    try {
      const itemsReq = await getDocs(firestore.collection(itemCollectionName));
      const items = itemsReq?.docs.map((doc) => doc.data());
      const hasThisItem = items?.find((item) => itemName.toLowerCase() === item?.name.toLowerCase());

      if (hasThisItem) {
        Swal.fire('Error!', `${itemNameLabel} ya existe`, 'error');
        return;
      }

      const firestorePromise = firestore.add(itemCollectionName, {
        name: itemName,
      });
      toast.promise(firestorePromise, {
        pending: `Creando nuevo(a) ${itemNameLabel}...`,
        success: `El/La ${itemNameLabel} ha sido creado(a) con éxito 👌`,
        error: `Ocurrió un error al crear el/la ${itemNameLabel}`,
      });
      const target = e?.target as HTMLFormElement;
      target.reset();
      setItemName('');
    } catch (error) {}
  };

  return (
    <Modal show onHide={onHide}>
      <Modal.Body>
        <Form onSubmit={handleCreateNewGenericItem}>
          <Form.Group className="mb-3">
            <Form.Label>Nueva {itemNameLabel}:</Form.Label>
            <Form.Control
              type="text"
              id="item_name"
              value={itemName}
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                setItemName(target?.value);
              }}
            />
          </Form.Group>
          <Button className="w-100 mt-4" type="submit">
            Crear
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
