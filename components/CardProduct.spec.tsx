import React from 'react';
import { render, screen } from '@testing-library/react';

import { CardProduct } from './CardProduct';

test('renders Card Product Component', () => {
  render(
    <CardProduct
      name="Iphone 14"
      id="1"
      categoryId="1"
      favorites={[]}
      onlyFavorites={false}
      userId="xLpODhv3eZowb11Sjvo4"
      productsIdOfFavorites={[]}
      file="https://d391ci4kxgasl8.cloudfront.net/fit-in/524x480/filters:fill(FFFFFF):quality(90):format(webp)/_img_productos/notebook-lenovo-82c3001wsp-foto1.jpg"
    />,
  );
  const productTitle = screen.getAllByText(/Iphone 14/i)[0] as HTMLAnchorElement;
  expect(productTitle.textContent).toContain('Iphone 14');
});
