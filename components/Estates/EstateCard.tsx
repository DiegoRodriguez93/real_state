import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useFirestore } from 'react-redux-firebase';

import classes from './EstateCard.module.scss';
import BedroomIcon from './Icons/BedroomIcon';
import ToiletsIcon from './Icons/ToiletsIcon';
import GaragesIcon from './Icons/GaragesIcon';
import LocationIcon from './Icons/LocationIcon';
import { formatCurrency } from '../../utils/currency';

type EstateCardType = EstateType;

export const EstateCard: FC<EstateCardType> = ({
  estate_name,
  profile_image = '/images/not-found.png',
  price = '0',
  bedrooms,
  toilets,
  department,
}) => {
  const firestore = useFirestore();

  return (
    <Card className={`${classes.card} m-3`}>
      <Card.Img className={classes.cardImg} src={profile_image} />
      <Card.Body className={classes.cardBody}>
        <Row>
          <Col sm={12} className={classes.estateTitle}>
            {estate_name}
          </Col>
          <Col sm={12} className={classes.estateAmount}>
            U$D {formatCurrency(price)}
          </Col>
          <Col sm={4}>
            <BedroomIcon /> <span>{bedrooms}</span>
          </Col>
          <Col sm={4}>
            <ToiletsIcon /> <span>{toilets}</span>
          </Col>
          <Col sm={4}>
            <GaragesIcon /> <span>{bedrooms}</span>
          </Col>

          <Col sm={12} className="my-4">
            <LocationIcon /> <span>{department}</span>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
