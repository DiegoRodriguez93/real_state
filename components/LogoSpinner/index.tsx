import React from 'react';
import styles from './LogoSpinner.module.scss';
import Image from 'next/image';

const LogoSpinner: React.FC = () => {
  return (
    <div className={styles.logoSpinner}>
      {/* eslint-disable-next-line */}
      <Image height={120} width={150} src="/images/logo-dummy.png" alt="Company Logo" />
    </div>
  );
};

export default LogoSpinner;
