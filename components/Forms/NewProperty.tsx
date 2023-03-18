import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { getDocs } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

import { RootState } from '../../redux/reducers/rootReducers';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../context/ReactReduxFirebaseContextProvider';
import TextAreaWithHTML from './Inputs/TextAreaWithHTML';
import FilesDropzone from './FilesDropzone';
import { NewCategory } from './NewCategory';
// import { SearchAddress } from './SearchAddress';

import dynamic from 'next/dynamic';

const SearchAddress = dynamic(() => import('./SearchAddress'), {
  ssr: false,
});

export const NewProperty = () => {
  const [productName, setProductName] = useState('');
  const [values, setValues] = useState<Record<string, string>>({});
  const [categoryId, setCategoryId] = useState('');
  const [file, setFile] = useState<File | undefined>();
  const [error, setError] = useState('');
  const [showNewCategoryFormModal, setShowNewCategoryFormModal] = useState(false);

  const handleChangeInput = (e: ChangeEvent<any>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const firestore = useFirestore();
  useFirestoreConnect('categories');
  const categories = useSelector<RootState, Array<{ id: string; name: string; color: string }>>(
    (state) => state?.firestore?.ordered?.categories,
  );

  useEffect(() => {
    firestore.get('categories');
  }, [showNewCategoryFormModal, firestore]);

  const handleCreateNewProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!productName) {
      Swal.fire('Error!', 'Product name is required', 'error');
      return;
    }

    if (!categoryId) {
      Swal.fire('Error!', 'Category is required', 'error');
      return;
    }
    try {
      const productsReq = await getDocs(firestore.collection('products'));
      const products = productsReq?.docs.map((doc) => doc.data());
      const hasThisCategory = products?.find((product) => productName.toLowerCase() === product?.name.toLowerCase());

      if (hasThisCategory) {
        Swal.fire('Error!', 'Product already exists', 'error');
        return;
      }

      const fileName = `images/${productName?.replace(' ', '_')}${file?.name?.slice(-5)}`;

      const reqFile = await uploadBytes(ref(storage, fileName), file as Blob);

      const url = await getDownloadURL(reqFile?.ref);

      const firestorePromise = firestore.add('products', {
        name: productName,
        categoryId,
        file: url,
      });

      toast.promise(firestorePromise, {
        pending: 'Creating new product...',
        success: 'The product has been created successfully 👌',
        error: 'An error occurred when creating the product , please try again later🤯',
      });

      const target = e?.target as HTMLFormElement;
      target.reset();
      setProductName('');
      setCategoryId('');
      setFile(undefined);
    } catch (error) {}
  };

  return (
    <>
      {showNewCategoryFormModal && <NewCategory onHide={() => setShowNewCategoryFormModal(false)} />}
      <Form onSubmit={handleCreateNewProduct}>
        <Form.Group className="mb-3">
          <Form.Label>Título de la propiedad</Form.Label>
          <Form.Control
            type="text"
            id="estate_name"
            name="estate_name"
            placeholder="Ej: Casa moderna y luminosa en zona de Palermo..."
            onChange={handleChangeInput}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Seleccione una categoría:</Form.Label>
          <Row>
            <Col sm={9}>
              <Form.Select onChange={handleChangeInput} name="category" id="category">
                <option>- Select -</option>
                {categories?.map((category) => (
                  <option key={category?.id} value={category?.id}>
                    {category?.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col sm={3}>
              <Button onClick={() => setShowNewCategoryFormModal(true)}>Nueva Categoría</Button>
            </Col>
          </Row>
        </Form.Group>

        <Row>
          <Col sm={6}>
            <Form.Label>Superficie Total:</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control type="number" name="total_area" id="total_area" onChange={handleChangeInput} />
              <InputGroup.Text>m2</InputGroup.Text>
            </InputGroup>
          </Col>
          <Col sm={6}>
            <Form.Label>Área edificada:</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control type="number" name="total_built_area" id="total_built_area" onChange={handleChangeInput} />
              <InputGroup.Text>m2</InputGroup.Text>
            </InputGroup>
          </Col>
        </Row>

        <Row>
          <Col sm={4}>
            <Form.Label>Dormitorios:</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control type="number" name="bedrooms" id="bedrooms" onChange={handleChangeInput} />
            </InputGroup>
          </Col>
          <Col sm={4}>
            <Form.Label>Baños:</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control type="number" name="toilets" id="toilets" onChange={handleChangeInput} />
            </InputGroup>
          </Col>
          <Col sm={4}>
            <Form.Label>Cocheras:</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control type="number" name="garages" id="garages" onChange={handleChangeInput} />
            </InputGroup>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Subir imagenes del producto:</Form.Label>
          <FilesDropzone multiple />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Dirección:</Form.Label>
          <SearchAddress />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descripción:</Form.Label>
          <TextAreaWithHTML name="description" values={values} setValues={setValues} />
        </Form.Group>

        {/*         <Form.Group className="mb-3">
          <Form.Label>Upload Product image:</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setFile(target?.files?.[0]);
              if (error) {
                setError('');
              }
            }}
            name="product_file"
            id="product_file"
          />
        </Form.Group> */}

        <Form.Group className="mb-3">
          <Form.Label>Subir imagen principal del producto:</Form.Label>
          <FilesDropzone />
        </Form.Group>



        <Button className="w-100 mt-4" type="submit">
          Create
        </Button>
      </Form>
    </>
  );
};
