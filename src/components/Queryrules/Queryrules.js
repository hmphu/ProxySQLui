import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { PAGE_SIZE } from '../../constants';
import { Form, Button, Table, Pagination, Popconfirm } from 'antd';

import styles from './Queryrules.css';

import CreateOneQr from './CreateOneQr';
import UpdateQrUserModal from './UpdateQrUserModal';
import UpdateQrSchemaModal from './UpdateQrSchemaModal';
import UpdateQrClientModal from './UpdateQrClientAddrModal';
import UpdateQrHostGroupModal from './UpdateQrHostGroupModal';
import UpdateQrDigestModal from './UpdateQrDigestModal';
import UpdateQrMatchDigestModal from './UpdateQrMatchDigestModal';
import UpdateQrMatchPatternModal from './UpdateQrMatchPatternModal';
import UpdateQrReplacePatternModal from './UpdateQrReplacePatternModal';

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

  // 定义要呈现的表格结构
  const columns = [
    {
      title: 'RuleId',
      dataIndex: 'rule_id',
      key: 'rule_id',
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
    },
    {
      title: 'UserName',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Schemaname',
      dataIndex: 'schemaname',
      key: 'schemaname',
    },
    {
      title: 'ClientAddr',
      dataIndex: 'client_addr',
      key: 'client_addr',
    },
    {
      title: 'Digest',
      dataIndex: 'digest',
      key: 'digest',
    },
    {
      title: 'MatchDigest',
      dataIndex: 'match_digest',
      key: 'match_digest',
    },
    {
      title: 'MatchPattern',
      dataIndex: 'match_pattern',
      key: 'match_pattern',
    },
    {
      title: 'ReplacePattern',
      dataIndex: 'replace_pattern',
      key: 'replace_pattern',
    },
    {
      title: 'DestinationHostGroup',
      dataIndex: 'destination_hostgroup',
      key: 'destination_hostgroup',
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <UpdateQrUserModal
            record={record}
            onOk={updateOneQrUserHandler.bind(null, record)}
          >
            <a>EditUser</a>
          </UpdateQrUserModal>
          <UpdateQrSchemaModal
            record={record}
            onOk={updateOneQrSchemaHandler.bind(null, record)}
          >
            <a>EditSchema</a>
          </UpdateQrSchemaModal>
          <UpdateQrClientModal
            record={record}
            onOk={updateOneQrClientHandler.bind(null, record)}
          >
            <a>EditClient</a>
          </UpdateQrClientModal>
          <UpdateQrDigestModal
            record={record}
            onOk={updateOneQrDigestHandler.bind(null, record)}
          >
            <a>EditDigest</a>
          </UpdateQrDigestModal>
          <UpdateQrMatchDigestModal
            record={record}
            onOk={updateOneQrMatchDigestHandler.bind(null, record)}
          >
            <a>EditMatchDigest</a>
          </UpdateQrMatchDigestModal>
          <UpdateQrMatchPatternModal
            record={record}
            onOk={updateOneQrMatchPatternHandler.bind(null, record)}
          >
            <a>EditMatchPattern</a>
          </UpdateQrMatchPatternModal>
          <UpdateQrReplacePatternModal
            record={record}
            onOk={updateOneQrReplacePatternHandler.bind(null, record)}
          >
            <a>ReplacePattern</a>
          </UpdateQrReplacePatternModal>
          <UpdateQrHostGroupModal
            record={record}
            onOk={updateOneQrHostGroupHandler.bind(null, record)}
          >
            <a>EditHostGroup</a>
          </UpdateQrHostGroupModal>
          <Popconfirm
            record={record}
            title="Delete Qr"
            onConfirm={deleteOneQr.bind(null, record)}
          >
            <a href=""> Delete</a>
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
