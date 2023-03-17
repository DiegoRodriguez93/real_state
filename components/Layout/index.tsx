import { FC, ReactNode } from 'react';
import { Container } from 'react-bootstrap';

import { Header } from './Header';
import { Navbar } from './Navbar';

type LayoutType = {
  children: ReactNode;
  disableHeader?: boolean;
};

export const Layout: FC<LayoutType> = ({ children, disableHeader }) => {
  return (
    <>
      <Navbar />
      {!disableHeader && <Header />}
      <Container>{children}</Container>
    </>
  );
};
