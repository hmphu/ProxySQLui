import React from 'react';
import styles from './Schedulers.css';
import { PAGE_SIZE } from '../../constants';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';

import { Button, Table, Popconfirm, Pagination } from 'antd';

import CreateOneScheduler from './CreateOneScheduler';
import SchedulerCreateOrUpdateModal from './SchedulerCreateOrUpdateModal';

function Schedulers({
  dispatch,
  list: dataSource,
  loading,
  total,
  page: current,
}) {
  // 列出所有定时任务
  function listAllSchedulers(page) {
    dispatch(
      routerRedux.push({
        pathname: '/schedulers',
        query: { page },
      }),
    );
  }

  // 创建新的调度器
  const createHandler = (values) => {
    console.log('scheduler.js->createHandler :', values);
    dispatch({
      type: 'schedulers/CreateOneScheduler',
      payload: values,
    });
  };

  // 删除定时任务
  const deleteHandler = (record, values) => {
    console.log('scheduler->deleteHandler->values: ', record);
    const id = record.id;
    dispatch({
      type: 'schedulers/DeleteOneScheduler',
      payload: id,
    });
  };

  // 编辑定时任务
  const editHandler = (record, values) => {
    console.log('scheduler->editHandler-> ', record, values);
    dispatch({
      type: 'schedulers/UpdateOneScheduler',
      payload: values,
    });
  };

  const columns = [
    {
      title: '调度ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '激活',
      dataIndex: 'active',
      key: 'active',
    },
    {
      title: '执行周期',
      dataIndex: 'interval_ms',
      key: 'interval_ms',
    },
    {
      title: '执行文件',
      dataIndex: 'filename',
      key: 'filename',
    },
    {
      title: '参数1',
      dataIndex: 'arg1',
      key: 'arg1',
    },
    {
      title: '参数2',
      dataIndex: 'arg2',
      key: 'arg2',
    },
    {
      title: '参数3',
      dataIndex: 'arg3',
      key: 'arg3',
    },
    {
      title: '参数4',
      dataIndex: 'arg4',
      key: 'arg4',
    },
    {
      title: '参数5',
      dataIndex: 'arg5',
      key: 'arg5',
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
          <SchedulerCreateOrUpdateModal
            record={record}
            title="编辑"
            onOk={editHandler.bind(null, record)}
          >
            <Button icon="edit" type="primary">编辑</Button>
          </SchedulerCreateOrUpdateModal>
          <Popconfirm
            record={record}
            title="是否删除此调度配置?"
            onConfirm={deleteHandler.bind(null, record)}
          >
            <Button icon="delete" type="danger">删除</Button>
          </Popconfirm>
        </span>
      ),
    },
  ];
  return (
    <div className={styles.normal}>
      <div>
        <CreateOneScheduler onOk={createHandler} />
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
        onChange={listAllSchedulers}
      />
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.schedulers;
  return {
    loading: state.loading.models.schedulers,
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(Schedulers);
