import React from 'react';
import { connect } from 'dva';
import styles from './Servers.css';
import MainLayout from '../components/MainLayout/MainLayout';
import ServersComponents from '../components/Servers/Servers';

function Servers({ location }) {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <ServersComponents />
      </div>
    </MainLayout>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Servers);
