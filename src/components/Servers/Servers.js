import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { PAGE_SIZE } from '../../constants';
import { Form, Button, Table, Pagination, Popconfirm } from 'antd';

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

  // 删除一个指定的数据库服务
  function deleteOnServer(values) {
    dispatch({
      type: 'servers/DeleteOneServer',
      payload: values,
    });
  }

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
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      key: 'weight',
    },
    {
      title: 'Compression',
      dataIndex: 'compression',
      key: 'compression',
    },
    {
      title: 'MaxConnections',
      dataIndex: 'max_connections',
      key: 'max_connections',
    },
    {
      title: 'MaxReplicationLag',
      dataIndex: 'max_replication_lag',
      key: 'max_replication_lag',
    },
    {
      title: 'UseSSL',
      dataIndex: 'use_ssl',
      key: 'use_ssl',
    },
    {
      title: 'MaxLatencyMs',
      dataIndex: 'max_latency_ms',
      key: 'max_latency_ms',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
    },
  ];

  // DOM
  return (
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
        onChange={listAllServers}
      />
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.servers;
  return {
    loading: state.loading.models.users,
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(Servers);
