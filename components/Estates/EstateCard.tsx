import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

import classes from './EstateCard.module.scss';
import BedroomIcon from './Icons/BedroomIcon';
import ToiletsIcon from './Icons/ToiletsIcon';
import GaragesIcon from './Icons/GaragesIcon';
import LocationIcon from './Icons/LocationIcon';
import { formatCurrency } from '../../utils/currency';
import SquareFeetsIcon from './Icons/SquareFeetsIcon';
import Link from 'next/link';

type EstateCardType = EstateType;

export const EstateCard: FC<EstateCardType> = ({
  id,
  estate_name,
  profile_image = '/images/not-found.png',
  price = '0',
  bedrooms,
  toilets,
  department,
  total_area,
}) => (
  <Link className={classes.link} href={`/estates/${id}`}>
    <Card className={`${classes.card} m-3`}>
      <Card.Img className={classes.cardImg} src={profile_image} />
      <Card.Body className={classes.cardBody}>
        <Row className={classes.descriptionContainer}>
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

          <Col sm={6} className="my-3">
            <LocationIcon /> <span>{department}</span>
          </Col>
          <Col sm={6} className="my-3">
            <SquareFeetsIcon /> <span>{total_area} m2</span>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  </Link>
);
