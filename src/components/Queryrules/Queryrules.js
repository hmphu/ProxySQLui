import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { PAGE_SIZE } from '../../constants';
import { Form, Button, Table, Pagination, Popconfirm } from 'antd';

import styles from './Queryrules.css';

import CreateOneQr from './CreateOneQr';
import UpdateQrUserModal from './UpdateQrUserModal';
import UpdateQrSchemaModal from './UpdateQrSchemaModal';
import UpdateQrStatusModal from './UpdateQrStatusModal';
import UpdateQrClientModal from './UpdateQrClientAddrModal';
import UpdateQrHostGroupModal from './UpdateQrHostGroupModal';
import UpdateQrDigestModal from './UpdateQrDigestModal';
import UpdateQrMatchDigestModal from './UpdateQrMatchDigestModal';
import UpdateQrMatchPatternModal from './UpdateQrMatchPatternModal';
import UpdateQrReplacePatternModal from './UpdateQrReplacePatternModal';

import QrCreateOrUpdateModal from './QrCreateOrUpdateModal';

function Queryrules({
  dispatch,
  list: dataSource,
  loading,
  total,
  page: current,
}) {
  // 列出所有查询规则
  function ListAllQueryRules(page) {
    dispatch(
      routerRedux.push({
        pathname: '/queryrules',
        query: { page },
      }),
    );
  }

  // 新建查询规则
  const createOneQrHandler = (values) => {
    console.log('Queryrules.js->createOneQrHandler->values ', values);
    dispatch({
      type: 'queryrules/CreateQueryRules',
      payload: values,
    });
  };

  // 激活或者反激活一个规则
  function editOneQr(record) {
    dispatch({
      type: 'queryrules/UpdateOneQrStatus',
      payload: values,
    });
  }

  // 删除一个查询规则
  function deleteOneQr(record) {
    dispatch({
      type: 'queryrules/DeleteOneQueryRules',
      payload: record.rule_id,
    });
  }

  // 更新一个查询规则的用户名称
  function updateOneQrUserHandler(record, values) {
    dispatch({
      type: 'queryrules/UpdateOneQrUser',
      payload: values,
    });
  }

  // 更新一个查询规则的模式名称
  function updateOneQrSchemaHandler(record, values) {
    dispatch({
      type: 'queryrules/UpdateOneQrSchema',
      payload: values,
    });
  }

  // 更新一个查询规则的模式名称
  function updateOneQrStatusHandler(record, values) {
    dispatch({
      type: 'queryrules/UpdateOneQrStatus',
      payload: values,
    });
  }

  // 更新一个查询规则的客户端IP地址
  function updateOneQrClientHandler(record, values) {
    dispatch({
      type: 'queryrules/UpdateOneQrClient',
      payload: values,
    });
  }

  // 更新一个查询规则的语句digest号
  function updateOneQrDigestHandler(record, values) {
    dispatch({
      type: 'queryrules/UpdateOneQrDigest',
      payload: values,
    });
  }

  // 更新一个查询规则的语句match_digest号
  function updateOneQrMatchDigestHandler(record, values) {
    dispatch({
      type: 'queryrules/UpdateOneQrMatchDigest',
      payload: values,
    });
  }

  // 更新一个查询规则的匹配语句
  function updateOneQrMatchPatternHandler(record, values) {
    dispatch({
      type: 'queryrules/UpdateOneQrMatchPattern',
      payload: values,
    });
  }

  // 更新一个查询规则的复写语句
  function updateOneQrReplacePatternHandler(record, values) {
    dispatch({
      type: 'queryrules/UpdateOneQrReplacePattern',
      payload: values,
    });
  }

  // 更新一个查询规则的目标主机组
  function updateOneQrHostGroupHandler(record, values) {
    dispatch({
      type: 'queryrules/UpdateOneQrHostGroup',
      payload: values,
    });
  }

  // 更新一个查询规则的目标主机组
  function editHandler(record, values) {
    dispatch({
      type: 'queryrules/put',
      payload: values,
    });
  }

  // 定义要呈现的表格结构
  const columns = [
    {
      title: '规则ID',
      dataIndex: 'rule_id',
      key: 'rule_id',
    },
    {
      title: '状态',
      dataIndex: 'active',
      key: 'active',
    },
    {
      title: '目标用户',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '目标库',
      dataIndex: 'schemaname',
      key: 'schemaname',
    },
    {
      title: '客户端IP',
      dataIndex: 'client_addr',
      key: 'client_addr',
    },
    {
      title: 'SQL唯一标识',
      dataIndex: 'digest',
      key: 'digest',
    },
    {
      title: '匹配SQL语句',
      dataIndex: 'match_digest',
      key: 'match_digest',
    },
    {
      title: '匹配SQL正则',
      dataIndex: 'match_pattern',
      key: 'match_pattern',
    },
    {
      title: '覆写语句',
      dataIndex: 'replace_pattern',
      key: 'replace_pattern',
    },
    {
      title: '目标主机组',
      dataIndex: 'destination_hostgroup',
      key: 'destination_hostgroup',
    },
    {
      title: '查询缓冲时间',
      dataIndex: 'cache_ttl',
      key: 'cache_ttl',
    },
    {
      title: '错误信息',
      dataIndex: 'error_msg',
      key: 'error_msg',
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <QrCreateOrUpdateModal
            title="修改"
            record={record}
            onOk={editHandler.bind(null, record)}
          >
            <Button icon="edit" type="primary">编辑</Button>
          </QrCreateOrUpdateModal>

          <Popconfirm
            record={record}
            title="删除此条规则?"
            onConfirm={deleteOneQr.bind(null, record)}
          >
            <Button icon="delete" type="danger">删除</Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  // DOM
  return (
    <div className={styles.normal}>
      <div>
        <CreateOneQr onOk={createOneQrHandler} />
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
        onChange={ListAllQueryRules}
      />
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.queryrules;
  return {
    loading: state.loading.models.queryrules,
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(Queryrules);
