import React, { Component } from 'react';
import { Switch, Select, Modal, Form, Input } from 'antd';
import styles from './Schedulers.css';

const FormItem = Form.Item;

class SchedulerCreateOrUpdateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const onOk = this.props.onOk;
    this.props.form.validateFields((err, values) => {
      console.log('SchedulerCreateOrUpdateModal->okHandler->values:', values);
      const id = parseInt(values.id, 10);
      const interval_ms = parseInt(values.interval_ms, 10);
      const filename = values.filename;
      const arg1 = values.arg1;
      const arg2 = values.arg2;
      const arg3 = values.arg3;
      const arg4 = values.arg4;
      const arg5 = values.arg5;
      const comment = values.comment;

      let active = values.active;
      if (active) {
        active = 1;
      } else {
        active = 0;
      }

      const newValue = {
        id,
        active,
        interval_ms,
        filename,
        arg1,
        arg2,
        arg3,
        arg4,
        arg5,
        comment,
      };

      console.log('QrCreateOrUpdateModal.js->okHandler->newValue: ', newValue);

      if (!err) {
        onOk(newValue);
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const {
      id,
      active,
      interval_ms,
      filename,
      arg1,
      arg2,
      arg3,
      arg4,
      arg5,
      comment,
    } = this.props.record;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <span>
        <span onClick={this.showModelHandler}>
          {children}
        </span>
        <Modal
          title="修改调度器 "
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form layout="horizontal" onSubmit={this.okHandler}>
            <FormItem {...formItemLayout} label="调度ID">
              {getFieldDecorator('id', {
                initialValue: id,
              })(<Input type="number" disabled="true" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="激活">
              {getFieldDecorator('active', {
                initialValue: active,
              })(
                <Switch
                  defaultChecked={active}
                  checkedChildren={'是'}
                  unCheckedChildren={'否'}
                  onChange=""
                />,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="执行周期">
              {getFieldDecorator('interval_ms', {
                rules: [{ required: true }],
                initialValue: interval_ms,
              })(<Input type="number" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="执行文件">
              {getFieldDecorator('filename', {
                initialValue: filename,
              })(<Input type="string" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="参数1">
              {getFieldDecorator('arg1', {
                initialValue: arg1,
              })(<Input type="string" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="参数2">
              {getFieldDecorator('arg2', {
                initialValue: arg2,
              })(<Input type="string" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="参数3">
              {getFieldDecorator('arg3', {
                initialValue: arg3,
              })(<Input type="string" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="参数4">
              {getFieldDecorator('arg4', {
                initialValue: arg4,
              })(<Input type="string" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="参数5">
              {getFieldDecorator('arg5', {
                initialValue: arg5,
              })(<Input type="string" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="注释">
              {getFieldDecorator('comment', {
                initialValue: comment,
              })(<Input />)}
            </FormItem>

          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(SchedulerCreateOrUpdateModal);
