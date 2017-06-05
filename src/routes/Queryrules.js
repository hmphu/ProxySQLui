import React from 'react';
import { connect } from 'dva';
import styles from './Queryrules.css';

import MainLayout from '../components/MainLayout/MainLayout';

function Queryrules({ location }) {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        Queryrules Components.
      </div>
    </MainLayout>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Queryrules);
