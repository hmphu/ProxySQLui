import React, { Component } from 'react';
import { connect } from 'dva';
import { Pagination, Form, Button, Table } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Variables.css';
import { PAGE_SIZE } from '../../constants';


import EditVariablesModal from './EditVariablesModal';

function Variables({ dispatch, list: dataSource, loading, total, page: current }) {
  function editHandler(id, values) {
    console.log('Variables.js->editHandler->values:', id, values);
    dispatch({
      type: 'variables/UpdateOneVariable',
      payload: values,
    });
  }

  function pageChangeHandler(page) {
    dispatch(
      routerRedux.push({
        pathname: '/variables',
        query: { page },
      }),
    );
  }

  const columns = [
    {
      title: '变量名',
      dataIndex: 'variable_name',
      key: 'variable_name',
      width: '40%',
    },
    {
      title: '值',
      dataIndex: 'variable_value',
      key: 'variable_value',
      width: '40%',
    },
    {
      title: '编辑',
      key: 'operation',
      width: '20%',
      render: (text, record) => (
        <span className={styles.operation}>
          <EditVariablesModal
            record={record}
            onOk={editHandler.bind(null, record)}
          >
            <Button type="primary" icon="edit" >
              编辑
            </Button>
          </EditVariablesModal>
        </span>
      ),
    },
  ];

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
        onChange={pageChangeHandler}
      />
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.variables;
  return {
    loading: state.loading.models.variables,
    list,
    total,
    page,
  };
}


export default connect(mapStateToProps)(Variables);
