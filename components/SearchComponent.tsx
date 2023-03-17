import { ChangeEvent, useEffect, useState, useRef } from 'react';
import { ListGroup } from 'react-bootstrap';

import { useSearchCollectionData } from '../hooks/useSearchCollectionData';

type ProductsFound = Array<ProductType & { categoryName: string }>;

export const SearchComponent = () => {
  // TODO: replace with BE firebase search
  const { productsWithCategories } = useSearchCollectionData();

  const [searchStringValue, setSearchStringValue] = useState('');
  const [productsFound, setProductsFound] = useState<ProductsFound>([]);

  const inputSearchRef = useRef<HTMLInputElement>(null);
  const inputSearchWidth = inputSearchRef.current?.offsetWidth ?? 'auto';

  useEffect(() => {
    if (searchStringValue) {
      const search = productsWithCategories?.filter(
        ({ name, categoryName }) =>
          String(`${name} ${categoryName}`).toUpperCase().indexOf(String(searchStringValue).toUpperCase()) > -1,
      );
      setProductsFound(search);
    } else {
      setProductsFound([]);
    }
    // eslint-disable-next-line
  }, [searchStringValue, productsWithCategories?.length]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchStringValue(e?.target.value);
  };

  return (
    <>
      <input
        className="rounded w-100"
        type="search"
        ref={inputSearchRef}
        value={searchStringValue}
        onChange={handleSearch}
        placeholder="Search Products... "
        name="search"
        id="search"
      />

      {productsFound && productsFound?.length > 0 && (
        <ListGroup style={{ zIndex: 3, textAlign: 'justify', width: inputSearchWidth }} className="position-absolute">
          {productsFound?.slice(0, 10).map((product) => (
            <ListGroup.Item>
              <img src={product?.file} alt={product?.name} style={{ width: '28px', height: '28px', marginRight: '10px' }} />
              {product?.name} - <small className="text-secondary">{product?.categoryName}</small>
            </ListGroup.Item>
          ))}
          <ListGroup.Item className="bg-info">See all results for "{searchStringValue}"</ListGroup.Item>
        </ListGroup>
      )}
    </>
  );
};
