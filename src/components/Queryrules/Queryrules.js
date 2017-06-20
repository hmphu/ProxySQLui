import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { PAGE_SIZE } from '../../constants';
import { Form, Button, Table, Pagination, Popconfirm } from 'antd';

import styles from './Queryrules.css';

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
  ];

  // DOM
  return (
    <div className={styles.normal}>
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
