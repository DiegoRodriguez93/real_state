import { useRouter } from 'next/router';
import { Col, Row } from 'react-bootstrap';

import { Layout } from '../../components/Layout';
import useGetEstateData from '../../hooks/useGetEstateData';
import NextCarousel from '../../components/NextCarousel';

const EstatePage = () => {
  const router = useRouter();
  const params = router.query;
  const estateId = typeof params?.estateId === 'object' ? '' : params?.estateId ?? '';

  const estate = useGetEstateData({ id: estateId });

  return (
    <Layout disableHeader>
      <Row>
        <Col sm={12} md={9} className="my-3">
          <NextCarousel images={estate?.estates_images ?? []} />
        </Col>
        <Col sm={12} md={3}></Col>
      </Row>

      {estate?.estate_name}
    </Layout>
  );
};

export default EstatePage;
