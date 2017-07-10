import React from 'react';
import { connect } from 'dva';
import styles from './Variables.css';
import VariablesComponent from '../components/Variables/Variables';
import MainLayout from '../components/MainLayout/MainLayout';

function Variables({ location }) {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <VariablesComponent />
      </div>
    </MainLayout>
  );
}

function mapStateToProps() {
  return {
  };
}

export default connect(mapStateToProps)(Variables);
