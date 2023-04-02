import Image from 'next/image';
import { ChangeEvent, useEffect, useState, useRef } from 'react';
import { ListGroup } from 'react-bootstrap';

import { useSearchCollectionData } from '../hooks/useSearchCollectionData';

type EstatesFound = Array<EstateType & { categoryName: string }>;

export const SearchComponent = () => {
  // TODO: replace with BE firebase search
  const { estates } = useSearchCollectionData();

  const [searchStringValue, setSearchStringValue] = useState('');
  const [estatesFound, setEstatesFound] = useState<EstatesFound>([]);

  const inputSearchRef = useRef<HTMLInputElement>(null);
  const inputSearchWidth = inputSearchRef.current?.offsetWidth ?? 'auto';

  useEffect(() => {
    if (searchStringValue) {
      const search = estates?.filter(
        ({ estate_name, categoryName }) =>
          String(`${estate_name} ${categoryName}`).toUpperCase().indexOf(String(searchStringValue).toUpperCase()) > -1,
      );
      setEstatesFound(search);
    } else {
      setEstatesFound([]);
    }
    // eslint-disable-next-line
  }, [searchStringValue, estates?.length]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchStringValue(e?.target.value);
  };

  return (
    <>
      <input
        className="w-100"
        type="search"
        ref={inputSearchRef}
        value={searchStringValue}
        onChange={handleSearch}
        placeholder="Buscar por nombre o ubicación... "
        name="search"
        id="search"
      />

      {estatesFound && estatesFound?.length > 0 && (
        <ListGroup style={{ zIndex: 3, textAlign: 'justify', width: inputSearchWidth }} className="position-absolute">
          {estatesFound?.slice(0, 10).map((estates) => (
            <ListGroup.Item key={estates?.id}>
              {estates?.estate_name} - <small className="text-secondary">{estates?.categoryName}</small>
            </ListGroup.Item>
          ))}
          <ListGroup.Item className="bg-info">See all results for {searchStringValue}</ListGroup.Item>
        </ListGroup>
      )}
    </>
  );
};
