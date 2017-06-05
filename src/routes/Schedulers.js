import React from 'react';
import { connect } from 'dva';
import styles from './Schedulers.css';
import MainLayout from '../components/MainLayout/MainLayout';

function Schedulers({ location }) {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        Schedulers Components.
      </div>
    </MainLayout>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Schedulers);
