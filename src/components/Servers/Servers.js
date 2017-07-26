import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { PAGE_SIZE } from '../../constants';
import { Form, Button, Table, Pagination, Popconfirm } from 'antd';

import CreateOneServer from './CreateOneServer';
import UpdateServerStatusModal from './UpdateServerStatusModal';
import UpdateServerWeightModal from './UpdateServerWeightModal';
import UpdateServerMCModal from './UpdateServerMCModal';
import ServerCreateOrUpdateModal from './ServerCreateOrUpdateModal';

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

  // 更新后端服务最大连接数
  const editHandler = (record, values) => {
    console.log('Servers.js->editHandler->values= ', values);
    dispatch({
      type: 'servers/put',
      payload: values,
    });
  };

  // 定义后端服务列表
  const columns = [
    {
      title: '主机组ID',
      dataIndex: 'hostgroup_id',
      key: 'hostgroup_id',
    },
    {
      title: '主机名',
      dataIndex: 'hostname',
      key: 'hostname',
    },
    {
      title: '端口',
      dataIndex: 'port',
      key: 'port',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '权重',
      dataIndex: 'weight',
      key: 'weight',
    },
    {
      title: '压缩值',
      dataIndex: 'compression',
      key: 'compression',
    },
    {
      title: '最大连接数',
      dataIndex: 'max_connections',
      key: 'max_connections',
    },
    {
      title: '最大复制延时',
      dataIndex: 'max_replication_lag',
      key: 'max_replication_lag',
    },
    {
      title: '开启SSL',
      dataIndex: 'use_ssl',
      key: 'use_ssl',
    },
    {
      title: '最大延时时间(单位：ms)',
      dataIndex: 'max_latency_ms',
      key: 'max_latency_ms',
    },
    {
      title: '注释',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <ServerCreateOrUpdateModal
            record={record}
            onOk={editHandler.bind(null, record)}
            title="编辑"
          >
            <Button icon="edit" type="primary">编辑</Button>
          </ServerCreateOrUpdateModal>
          <Popconfirm
            record={record}
            title="是否删除此节点信息?"
            onConfirm={deleteOneServer.bind(null, record)}
          >
            <Button icon="delete" type="danger">删除</Button>
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
