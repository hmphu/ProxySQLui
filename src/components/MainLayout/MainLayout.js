import React from 'react';
import styles from './MainLayout.css';

import { Form, Button, Input, Select, Layout, Menu, Icon } from 'antd';
import { Link } from 'dva/router';

const Option = Select.option;
const FormItem = Form.Item;

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
      <Layout>
        <Layout.Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className={styles.logo} />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="/dashboard">
              <Icon type="info-circle-o" />
              <span className={styles.navtext}>Dashboard</span>
            </Menu.Item>
            <Menu.Item key="/users">
              <Icon type="user" />
              <span className={styles.navtext}>Users</span>
            </Menu.Item>
            <Menu.Item key="/servers">
              <Icon type="database" />
              <span className={styles.navtext}>Servers</span>
            </Menu.Item>
            <Menu.Item key="/queryrules">
              <Icon type="api" />
              <span className={styles.navtext}>QueryRules</span>
            </Menu.Item>
            <Menu.Item key="/schedulers">
              <Icon type="sync" />
              <span className={styles.navtext}>Scheduler</span>
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
            <Form layout="inline" onSubmit={this.handleSubmit}>
              <FormItem label="Username">
                <input type="text" />
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit">Add User</Button>
              </FormItem>

            </Form>
            {children}

          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}

export default MainLayout;
