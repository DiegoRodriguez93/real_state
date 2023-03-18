import { useState, useEffect, forwardRef, ForwardRefRenderFunction, RefObject, ForwardedRef } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

import classes from './ExternalGeocoder.module.css';

interface ExternalGeocoderProps {
  onSubmit: (value: string) => void;
  results: Array<any>;
  setAddress: (index: number) => void;
}

const ExternalGeocoderRender: ForwardRefRenderFunction<any, ExternalGeocoderProps> = ({ onSubmit, results, setAddress }, ref) => {
  const [inputWidth, setInputWidth] = useState(0);

  const handleResize = () => {
    // @ts-ignore
    if (ref?.current) {
      // @ts-ignore
      setInputWidth(ref.current.offsetWidth);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Row mt={3} style={{ display: 'inline-block', position: 'relative', width: '100%', marginTop: '20px' }}>
      <Col sm={12}>
        <Form.Group className="mb-3">
          <Form.Control
            ref={ref}
            type="text"
            onChange={(e) => {
              onSubmit(e.target.value);
            }}
            placeholder="Buscar dirección..."
          />
        </Form.Group>
        {results.length > 0 && (
          <div
            style={{
              position: 'relative',
              overflowY: 'scroll',
              top: '100%',
              width: inputWidth ?? 300,
              maxHeight: '220px',
              backgroundColor: 'white',
              border: '1px solid #eaeaea',
              borderTop: 'none',
              zIndex: 2,
            }}
          >
            {results.map((result, index) => (
              <div
                key={index}
                onClick={() => setAddress(index)}
                className={classes.itemList}
                style={{ padding: '8px 16px', border: '1px solid #eaeaea' }}
              >
                {result.label}
              </div>
            ))}
          </div>
        )}
      </Col>
    </Row>
  );
};

export const ExternalGeocoder = forwardRef<HTMLInputElement, ExternalGeocoderProps>(ExternalGeocoderRender);

ExternalGeocoder.displayName = 'ExternalGeocoder';
