import { useState, useEffect, FC } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import classes from './NextCarousel.module.scss';

type NextCarouselType = {
  images: Array<string>;
};

const NextCarousel: FC<NextCarouselType> = ({ images }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener('resize', () => setWidth(window.innerWidth));
    return () => window.removeEventListener('resize', () => setWidth(window.innerWidth));
  }, []);

  console.log('images :>> ', images);

  return (
    <Carousel
      className={classes.container}
      showThumbs={width > 768}
      showArrows={width > 768}
      showStatus={false}
      infiniteLoop={true}
    >
      {images?.map((image) => (
        <div className={classes.imageContainer} key={image}>
          {/* eslint-disable-next-line */}
          <img src={image} className={classes.image} alt={image} />
        </div>
      ))}
    </Carousel>
  );
};

export default NextCarousel;
