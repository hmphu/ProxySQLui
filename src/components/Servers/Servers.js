import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { PAGE_SIZE } from '../../constants';
import { Form, Button, Table, Pagination, Popconfirm } from 'antd';

import CreateOneServer from './CreateOneServer';
import UpdateServerStatusModal from './UpdateServerStatusModal';
import UpdateServerWeightModal from './UpdateServerWeightModal';
import UpdateServerMCModal from './UpdateServerMCModal';

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

  // 更新后端服务的状态
  const updateOneServerStatusHandler = (record, values) => {
    console.log('Servers.js->updateOneServerStatusHandler->values= ', values);
    dispatch({
      type: 'servers/UpdateOneServerStatus',
      payload: values,
    });
  };

  // 更新后端服务权重
  const updateOneServerWeightHandler = (record, values) => {
    console.log('Servers.js->updateOneServerWeightHandler->values= ', values);
    dispatch({
      type: 'servers/UpdateOneServerWeight',
      payload: values,
    });
  };

  // 更新后端服务最大连接数
  const updateOneServerMCHandler = (record, values) => {
    console.log('Servers.js->updateOneServerMCHandler->values= ', values);
    dispatch({
      type: 'servers/UpdateOneServerMC',
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
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <UpdateServerStatusModal
            record={record}
            onOk={updateOneServerStatusHandler.bind(null, record)}
          >
            <a> Status </a>
          </UpdateServerStatusModal>
          <UpdateServerWeightModal
            record={record}
            onOk={updateOneServerWeightHandler.bind(null, record)}
          >
            <a> Weight </a>
          </UpdateServerWeightModal>
          <UpdateServerMCModal
            record={record}
            onOk={updateOneServerMCHandler.bind(null, record)}
          >
            <a> MC </a>
          </UpdateServerMCModal>

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
