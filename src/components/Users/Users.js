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
import CreateOneUser from './CreateOneUser';
import UserCreateOrUpdateModal from './UserCreateOrUpdateModal';

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

  function editUserStatusHandler(id, values) {
    dispatch({
      type: 'users/putStatus',
      payload: { values },
    });
  }

  function editUserDHG(id, values) {
    dispatch({
      type: 'users/putDHG',
      payload: { values },
    });
  }

  function editUserDS(id, values) {
    dispatch({
      type: 'users/putDS',
      payload: { values },
    });
  }

  function editUserPass(id, values) {
    dispatch({
      type: 'users/putPass',
      payload: { values },
    });
  }

  function editUserMC(id, values) {
    dispatch({
      type: 'users/putMC',
      payload: { values },
    });
  }

  function editHandler(id, values) {
    console.log('Users.js->editHandler->values: ', values);
    dispatch({
      type: 'users/put',
      payload: { values },
    });
  }

  const createOneUserHandler = (values) => {
    dispatch({
      type: 'users/CreateUser',
      payload: values,
    });
  };

  function deleteHandler(username) {
    console.log('deleteOneUser:', username);
    dispatch({
      type: 'users/deleteOneUser',
      payload: username,
    });
    console.log('deleteHandler ', username);
  }

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      // render: text => <a href="">{text}</a>,
    },
    {
      title: '密码',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: '激活',
      dataIndex: 'active',
      key: 'active',
    },
    {
      title: '使用SSL',
      dataIndex: 'use_ssl',
      key: 'use_ssl',
    },
    {
      title: '默认主机组',
      dataIndex: 'default_hostgroup',
      key: 'default_hostgroup',
    },
    {
      title: '默认模式名',
      dataIndex: 'default_schema',
      key: 'default_schema',
    },
    {
      title: '模式锁定',
      dataIndex: 'schema_locked',
      key: 'schema_locked',
    },
    {
      title: '事务持久',
      dataIndex: 'transaction_persistent',
      key: 'transaction_persistent',
    },
    {
      title: '快速转发',
      dataIndex: 'fast_forward',
      key: 'fast_forward',
    },
    {
      title: '后端',
      dataIndex: 'backend',
      key: 'backend',
    },
    {
      title: '前端',
      dataIndex: 'frontend',
      key: 'frontend',
    },
    {
      title: '最大连接数',
      dataIndex: 'max_connections',
      key: 'max_connections',
    },

    {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <UserCreateOrUpdateModal
            record={record}
            onOk={editHandler.bind(null, record)}
            modaltitle="编辑用户"
          >
            <Button icon="edit" type="primary"> 编辑用户</Button>
          </UserCreateOrUpdateModal>

          <Popconfirm
            record={record}
            title="确定删除此用户？"
            onConfirm={deleteHandler.bind(null, record.username)}
          >
            <Button icon="delete" type="danger">删除用户</Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.normal}>
      <div>
        <CreateOneUser onOK={createOneUserHandler} />
      </div>
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
