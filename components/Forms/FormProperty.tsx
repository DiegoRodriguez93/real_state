import { ChangeEvent, FormEvent, useEffect, useState, useRef, FC } from "react";
import dynamic from "next/dynamic";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useFirestore } from "react-redux-firebase";
import { toast } from "react-toastify";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import TextAreaWithHTML from "./Inputs/TextAreaWithHTML";
import FilesDropzone from "./FilesDropzone";
import { NewCategory } from "./NewCategory";
import { NewGenericItem } from "./NewGenericItem";

import { storage } from "../../context/ReactReduxFirebaseContextProvider";

const width = {
  width: "100%",
};

const SearchAddress = dynamic(() => import("./SearchAddress"), {
  ssr: false,
});

type SelectorsType = Array<{ id: string; name: string }>;

type FormPropertyProps = {
  isEditMode?: boolean;
  estateData?: EstateType;
  categories: SelectorsType;
  tags: SelectorsType;
  currencies: SelectorsType;
};

export const FormProperty: FC<FormPropertyProps> = ({
  isEditMode,
  estateData,
  categories,
  tags,
  currencies,
}) => {
  const [values, setValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, any>>({});
  const [showNewCategoryFormModal, setShowNewCategoryFormModal] = useState(
    false
  );
  const [showNewTagFormModal, setShowNewTagFormModal] = useState(false);
  const [showNewCurrencyFormModal, setShowNewCurrencyFormModal] = useState(
    false
  );

  const formRef: any = useRef(null);

  useEffect(() => {
    if (isEditMode && estateData) {
      setValues(estateData);

      const elements = formRef.current;
      for (let i = 0; i < elements?.length; i++) {
        const key: keyof EstateType = elements?.[i].id;
        if (estateData.hasOwnProperty(key)) {
          elements[i].value = estateData[key];
        }
      }
    }
  }, []);

  const handleChangeInput = (e: ChangeEvent<any>) => {
    try {
      if (errors.hasOwnProperty(e.target.name) && e.target.value.length > 0) {
        const newErrors = { ...errors };
        delete newErrors?.[e.target.name];
        setErrors(newErrors);
      }
      setValues({ ...values, [e.target.name]: e.target.value });
    } catch (error) {
      console.error(`Error setting value or cleaning error: ${error}`);
    }
  };

  const firestore = useFirestore();

  useEffect(() => {
    firestore.get("categories");
  }, [showNewCategoryFormModal, firestore]);

  const uploadHouseImages = async (
    files: Array<File>,
    propertyName: string
  ) => {
    const urls: Array<string> = [];

    // don't migrate to Promise.All since I want them to be in the same order
    for await (const file of files) {
      const fileName = `images/${propertyName?.replaceAll(
        " ",
        "_"
      )}/${Date.now().toString()}_${file?.name?.slice(-5)}`;
      const reqFile = await uploadBytes(ref(storage, fileName), file);
      const url = await getDownloadURL(reqFile?.ref);
      urls.push(url);
    }

    return urls;
  };

  const handleCreateNewProduct = async (e: FormEvent<HTMLFormElement>) => {
    try {
      const propertyName = values?.estate_name;
      let profileImage = "https://i.imgur.com/cGoZGmO.jpg";

      if (values?.profile_image?.[0]) {
        const file = values?.profile_image?.[0];
        const fileName = `images/${propertyName?.replaceAll(
          " ",
          "_"
        )}/${file?.name?.slice(-5)}`;
        const reqFile = await uploadBytes(ref(storage, fileName), file);
        const url = await getDownloadURL(reqFile?.ref);
        profileImage = url;
      }

      const estates_images = await uploadHouseImages(
        values?.estates_images,
        propertyName
      );

      const firestorePromise = firestore.add("estates", {
        estate_name: propertyName,
        category: values?.category ?? "",
        currency: values?.currency ?? "",
        tag: values?.tag ?? "",
        price: values?.price ?? "",
        operation_type: values?.operation_type ?? "sale",
        floors: values?.floors ?? "",
        total_area: values?.total_area ?? "",
        total_built_area: values?.total_built_area ?? "",
        address: values?.address ?? "",
        department: values?.department ?? "",
        description: values?.description ?? "",
        youtube_video: values?.youtube_video ?? "",
        profile_image: profileImage,
        bedrooms: values?.bedrooms ?? "",
        toilets: values?.toilets ?? "",
        garages: values?.garages ?? "",
        estates_images,
      });

      toast.promise(firestorePromise, {
        pending: "Creando nueva propiedad...",
        success: "La propiedad ha sido creado exitosamente 👌",
        error:
          "Ocurrió un error al crear la propiedad, por favor inténtalo de nuevo más tarde 🤯",
      });

      return;
    } catch (error) {
      console.log(error);
    }
  };

  const focusFirstInvalidField = () => {
    if (formRef.current) {
      const firstInvalidField = formRef.current?.querySelector(".is-invalid");
      if (firstInvalidField) {
        firstInvalidField.focus();
      }
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, any> = {};

    if (!values.estate_name) {
      newErrors.estate_name = "El título de la propiedad es obligatorio.";
    }

    setErrors(newErrors);

    const isValid = Object.keys(newErrors).length === 0;
    if (!isValid) {
      setTimeout(() => {
        focusFirstInvalidField();
      }, 220);
    }
    return isValid;
  };

  return (
    <>
      {showNewCategoryFormModal && (
        <NewGenericItem
          itemCollectionName="categories"
          itemNameLabel="Categoría"
          onHide={() => setShowNewCategoryFormModal(false)}
        />
      )}
      {showNewTagFormModal && (
        <NewGenericItem
          itemCollectionName="tags"
          itemNameLabel="Etiqueta"
          onHide={() => setShowNewTagFormModal(false)}
        />
      )}
      {showNewCurrencyFormModal && (
        <NewGenericItem
          itemCollectionName="currencies"
          itemNameLabel="Moneda"
          onHide={() => setShowNewCurrencyFormModal(false)}
        />
      )}
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (validateForm()) {
            handleCreateNewProduct(e);
          }
        }}
        ref={formRef}
      >
        <Form.Group className="mb-3">
          <Form.Label>
            Título de la propiedad <span>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            id="estate_name"
            name="estate_name"
            placeholder="Ej: Casa moderna y luminosa en zona de Palermo..."
            onChange={handleChangeInput}
            className={errors.estate_name ? "is-invalid" : ""}
          />
          {errors.estate_name && (
            <Form.Text className="text-danger">{errors.estate_name}</Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Seleccione una categoría:</Form.Label>
          <Row>
            <Col sm={9}>
              <Form.Select
                onChange={handleChangeInput}
                name="category"
                id="category"
              >
                <option>- Select -</option>
                {categories?.map((category) => (
                  <option key={category?.id} value={category?.id}>
                    {category?.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col sm={3}>
              <Button
                style={width}
                type="button"
                onClick={() => setShowNewCategoryFormModal(true)}
              >
                Nueva Categoría
              </Button>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Seleccione una Etiqueta:</Form.Label>
          <Row>
            <Col sm={9}>
              <Form.Select onChange={handleChangeInput} name="tag" id="tag">
                <option>- Select -</option>
                {tags?.map((tag) => (
                  <option key={tag?.id} value={tag?.id}>
                    {tag?.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col sm={3}>
              <Button
                style={width}
                type="button"
                onClick={() => setShowNewTagFormModal(true)}
              >
                Nueva Etiqueta
              </Button>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3">
          <Row>
            <Col sm={6}>
              <Form.Label>
                Precio <span>*</span>
              </Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  type="number"
                  name="price"
                  id="price"
                  onChange={handleChangeInput}
                />
                <InputGroup.Text>USD</InputGroup.Text>
              </InputGroup>
            </Col>
            <Col sm={3}>
              <Form.Label>Seleccione una moneda:</Form.Label>
              <Form.Select
                onChange={handleChangeInput}
                name="currency"
                id="currency"
              >
                <option>- Select -</option>
                {currencies?.map((currency) => (
                  <option key={currency?.id} value={currency?.id}>
                    {currency?.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col
              style={{
                display: "flex!important",
                alignItems: "center!important",
                paddingTop: "15px!important",
              }}
              sm={3}
            >
              <Button
                style={width}
                type="button"
                onClick={() => setShowNewCurrencyFormModal(true)}
              >
                Nueva Moneda
              </Button>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3">
          <Row>
            <Col sm={9}>
              <Form.Label>Tipo de operación:</Form.Label>
              <Form.Select
                onChange={handleChangeInput}
                name="operation_type"
                id="operation_type"
              >
                <option value="sale"> Venta</option>
                <option value="rent">Alquiler</option>
              </Form.Select>
            </Col>
            <Col sm={3}>
              <Form.Label>Pisos:</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  type="number"
                  name="floors"
                  id="floors"
                  onChange={handleChangeInput}
                />
              </InputGroup>
            </Col>
          </Row>
        </Form.Group>

        <Row>
          <Col sm={6}>
            <Form.Label>Superficie Total:</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type="number"
                name="total_area"
                id="total_area"
                onChange={handleChangeInput}
              />
              <InputGroup.Text>m2</InputGroup.Text>
            </InputGroup>
          </Col>
          <Col sm={6}>
            <Form.Label>Área edificada:</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type="number"
                name="total_built_area"
                id="total_built_area"
                onChange={handleChangeInput}
              />
              <InputGroup.Text>m2</InputGroup.Text>
            </InputGroup>
          </Col>
        </Row>

        <Row>
          <Col sm={4}>
            <Form.Label>Dormitorios:</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type="number"
                name="bedrooms"
                id="bedrooms"
                onChange={handleChangeInput}
              />
            </InputGroup>
          </Col>
          <Col sm={4}>
            <Form.Label>Baños:</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type="number"
                name="toilets"
                id="toilets"
                onChange={handleChangeInput}
              />
            </InputGroup>
          </Col>
          <Col sm={4}>
            <Form.Label>Cocheras:</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type="number"
                name="garages"
                id="garages"
                onChange={handleChangeInput}
              />
            </InputGroup>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Subir imagenes del producto:</Form.Label>
          <FilesDropzone
            multiple
            values={values}
            setValues={setValues}
            key_file_array="estates_images"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Dirección:</Form.Label>
          <SearchAddress values={values} setValues={setValues} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descripción:</Form.Label>
          <TextAreaWithHTML
            name="description"
            values={values}
            setValues={setValues}
          />
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
          <FilesDropzone
            values={values}
            setValues={setValues}
            key_file_array="profile_image"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Subir enlace de video</Form.Label>
          <Form.Control
            type="text"
            id="youtube_video"
            name="youtube_video"
            placeholder="Ej: https://youtu.be/RVF-L3zqhpE"
            onChange={handleChangeInput}
            className={errors.youtube_video ? "is-invalid" : ""}
          />
          <small>Solo soporta enlaces de YouTube</small>
          {errors.youtube_video && (
            <Form.Text className="text-danger">
              {errors.youtube_video}
            </Form.Text>
          )}
        </Form.Group>

        <Button className="w-100 mt-4 mb-5" type="submit">
          Crear
        </Button>
      </Form>
    </>
  );
};
