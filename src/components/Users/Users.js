import React from 'react';
import { connect } from 'dva';
import { Form, Button, Table, Pagination, Popconfirm } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Users.css';
import { PAGE_SIZE } from '../../constants';
import UserActiveModal from './UserActiveModal';
import UserPasswdModal from './UserPasswdModal';
import UserDHGModal from './UserDHGModal';
import UserDSModal from './UserDSModal';
import UserMCModal from './UserMCModal';

// const Option = Select.option;
const FormItem = Form.Item;

function Users({ dispatch, list: dataSource, loading, total, page: current }) {
  function deleteHandler(id) {
    // console.warn(`TODO: ${id}`);
    dispatch({
      type: 'users/remove',
      payload: id,
    });
  }

  function pageChangeHandler(page) {
    dispatch(
      routerRedux.push({
        pathname: '/users',
        query: { page },
      }),
    );
  }

  function editHandler(id, values) {
    dispatch({
      type: 'users/put',
      payload: { values },
    });
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'username',
      key: 'username',
      // render: text => <a href="">{text}</a>,
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
    },
    {
      title: 'DefaultHostgroup',
      dataIndex: 'default_hostgroup',
      key: 'default_hostgroup',
    },
    {
      title: 'DefaultSchema',
      dataIndex: 'default_schema',
      key: 'default_schema',
    },
    {
      title: 'MaxConnections',
      dataIndex: 'max_connections',
      key: 'max_connections',
    },

    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <UserPasswdModal
            record={record}
            onOk={editHandler.bind(null, record.id)}
          >
            <a>EditPasswd</a>
          </UserPasswdModal>
          <UserActiveModal
            record={record}
            onOk={editHandler.bind(null, record.username)}
          >
            <a>EditStatus</a>
          </UserActiveModal>
          <UserDHGModal
            record={record}
            onOk={editHandler.bind(null, record.id)}
          >
            <a>EditDHG</a>
          </UserDHGModal>
          <UserDSModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a>EditDS</a>
          </UserDSModal>
          <UserMCModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a>EditMC</a>
          </UserMCModal>

          <Popconfirm
            title="Confirm to delete?"
            onConfirm={deleteHandler.bind(null, record.id)}
          >
            <a href="">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.normal}>
      <Form layout="inline">
        <FormItem label="Username">
          <input type="text" />
        </FormItem>
        <FormItem>
          <Button icon="user-add" type="primary" htmlType="submit">
            Add User
          </Button>
        </FormItem>
      </Form>

      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey={record => record.id}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={pageChangeHandler}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.users;
  return {
    loading: state.loading.models.users,
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(Users);
