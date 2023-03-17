import { FC, FormEvent, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useFirestore } from 'react-redux-firebase';
import { getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

type NewCategoryProps = {
  onHide: () => void;
};

export const NewCategory: FC<NewCategoryProps> = ({ onHide }) => {
  const [categoryName, setCategoryName] = useState('');
  const firestore = useFirestore();

  const handleCreateNewCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!categoryName) {
      Swal.fire('Error!', 'Category name is required', 'error');
      return;
    }
    try {
      const categoriesReq = await getDocs(firestore.collection('categories'));
      const categories = categoriesReq?.docs.map((doc) => doc.data());
      const hasThisCategory = categories?.find((category) => categoryName.toLowerCase() === category?.name.toLowerCase());

      if (hasThisCategory) {
        Swal.fire('Error!', 'Category already exists', 'error');
        return;
      }

      const firestorePromise = firestore.add('categories', {
        name: categoryName,
      });
      toast.promise(firestorePromise, {
        pending: 'Creating new category...',
        success: 'The category has been created successfully 👌',
        error: 'An error occurred when creating the category',
      });
      const target = e?.target as HTMLFormElement;
      target.reset();
      setCategoryName('');
    } catch (error) {}
  };

  return (
    <Modal show onHide={onHide}>
      <Modal.Body>
        <Form onSubmit={handleCreateNewCategory}>
          <Form.Group className="mb-3">
            <Form.Label>Nueva categoría:</Form.Label>
            <Form.Control
              type="text"
              id="category_name"
              value={categoryName}
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                setCategoryName(target?.value);
              }}
            />
          </Form.Group>
          <Button className="w-100 mt-4" type="submit">
            Create
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
