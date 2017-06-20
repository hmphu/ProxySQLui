import React from 'react';
import { connect } from 'dva';
import styles from './Queryrules.css';

import MainLayout from '../components/MainLayout/MainLayout';
import QueryRulesComponent from '../components/Queryrules/Queryrules';

function Queryrules({ location }) {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <QueryRulesComponent />
      </div>
    </MainLayout>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Queryrules);
