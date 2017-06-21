import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { PAGE_SIZE } from '../../constants';
import { Form, Button, Table, Pagination, Popconfirm } from 'antd';

import CreateOneServer from './CreateOneServer';

import styles from './Servers.css';

function Servers({
  dispatch,
  list: dataSource,
  loading,
  total,
  page: current,
}) {
  // 列出所有后端数据库服务器
  function listAllServers(page) {
    dispatch(
      routerRedux.push({
        pathname: '/servers',
        query: { page },
      }),
    );
  }

  // 新加一个后端服务
  const createOneServerHandler = (values) => {
    dispatch({
      type: 'servers/CreateOneServer',
      payload: values,
    });
  };

  // 删除一个指定的数据库服务
  const deleteOneServer = (values) => {
    console.log('deleteOneServer: ', values);
    const { hostgroup_id, hostname, port } = values;
    console.log('deleteOneServer:', hostgroup_id, hostname, port);
    dispatch({
      type: 'servers/DeleteOneServer',
      payload: { hostgroup_id, hostname, port },
    });
  };

  // 定义后端服务列表
  const columns = [
    {
      title: 'Hostgroup_id',
      dataIndex: 'hostgroup_id',
      key: 'hostgroup_id',
    },
    {
      title: 'Hostname',
      dataIndex: 'hostname',
      key: 'hostname',
    },
    {
      title: 'Port',
      dataIndex: 'port',
      key: 'port',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: text => <a href="">{text}</a>,
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      key: 'weight',
      render: text => <a href="">{text}</a>,
    },
    {
      title: 'Compression',
      dataIndex: 'compression',
      key: 'compression',
      render: text => <a href="">{text}</a>,
    },
    {
      title: 'MaxConnections',
      dataIndex: 'max_connections',
      key: 'max_connections',
      render: text => <a href="">{text}</a>,
    },
    {
      title: 'MaxReplicationLag',
      dataIndex: 'max_replication_lag',
      key: 'max_replication_lag',
      render: text => <a href="">{text}</a>,
    },
    {
      title: 'UseSSL',
      dataIndex: 'use_ssl',
      key: 'use_ssl',
      render: text => <a href="">{text}</a>,
    },
    {
      title: 'MaxLatencyMs',
      dataIndex: 'max_latency_ms',
      key: 'max_latency_ms',
      render: text => <a href="">{text}</a>,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <Popconfirm
            record={record}
            title="Delete Server ?"
            onConfirm={deleteOneServer.bind(null, record)}
          >
            <a href="">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  // DOM
  return (
    <div>
      <div>
        <CreateOneServer onOk={createOneServerHandler} />
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
        onChange={listAllServers}
      />

    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.servers;
  return {
    loading: state.loading.models.servers,
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(Servers);
