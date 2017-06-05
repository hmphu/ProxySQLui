import React from 'react';
import { connect } from 'dva';
import styles from './Dashboard.css';

import MainLayout from '../components/MainLayout/MainLayout';

function Dashboard({ location }) {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        Dashboard Components.
      </div>
    </MainLayout>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Dashboard);
