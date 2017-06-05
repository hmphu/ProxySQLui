import React from 'react';
import styles from './MainLayout.css';

import { Form, Button, Input, Select, Layout, Menu, Icon } from 'antd';
import { Link } from 'dva/router';

class MainLayout extends React.Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    const { children } = this.props;
    const { size } = this.props;
    const state = this.state;
    return (
      <Layout height="100%">
        <Layout.Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className={styles.logo} />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="/dashboard">
              <Link to="/dashboard">
                <Icon type="info-circle-o" />
                <span className={styles.navtext}>Dashboard</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/users">
              <Link to="/users">
                <Icon type="user" />
                <span className={styles.navtext}>Users</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/servers">
              <Link to="/servers">
                <Icon type="database" />
                <span className={styles.navtext}>Servers</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/queryrules">
              <Link to="/queryrules">
                <Icon type="api" />
                <span className={styles.navtext}>QueryRules</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/schedulers">
              <Link to="/schedulers">
                <Icon type="sync" />
                <span className={styles.navtext}>Scheduler</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Layout.Sider>
        <Layout>
          <Layout.Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Layout.Header>
          <Layout.Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >

            {children}

          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}

export default MainLayout;
