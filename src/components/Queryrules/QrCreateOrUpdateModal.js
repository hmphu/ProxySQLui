import React, { Component } from 'react';
import { Switch, Select, Modal, Form, Input } from 'antd';
import styles from './Queryrules.css';

const FormItem = Form.Item;

class QrCreateOrUpdateModal extends Component {
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
      console.log('QrCreateOrUpdateModal->okHandler->values:', values);
      const rule_id = parseInt(values.rule_id, 10);
      let active = values.active;
      if (active) {
        active = 1;
        const apply = 1;
      } else {
        active = 0;
        const apply = 0;
      }
      const username = values.username;
      const schemaname = values.schemaname;
      const client_addr = values.client_addr;
      const digest = values.digest;
      const match_digest = values.match_digest;
      const match_pattern = values.match_pattern;
      const replace_pattern = values.replace_pattern;
      const destination_hostgroup = parseInt(values.destination_hostgroup, 10);
      const cache_ttl = parseInt(values.cache_ttl, 10);

      const error_msg = values.error_msg;

      const newValue = {
        rule_id,
        active,
        username,
        schemaname,
        client_addr,
        digest,
        match_digest,
        match_pattern,
        replace_pattern,
        destination_hostgroup,
        cache_ttl,
        error_msg,
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
      rule_id,
      active,
      username,
      schemaname,
      client_addr,
      digest,
      match_digest,
      match_pattern,
      replace_pattern,
      destination_hostgroup,
      cache_ttl,
      error_msg,
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
          title="修改查询规则"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form layout="horizontal" onSubmit={this.okHandler}>
            <FormItem {...formItemLayout} label="规则ID">
              {getFieldDecorator('rule_id', {
                initialValue: rule_id,
              })(<Input type="number" disabled="true" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="激活">
              {getFieldDecorator('active', {
                rules: [{ required: true }],
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
            <FormItem {...formItemLayout} label="目标用户">
              {getFieldDecorator('username', {
                initialValue: username,
              })(<Input type="string" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="目标库">
              {getFieldDecorator('schemaname', {
                initialValue: schemaname,
              })(<Input type="string" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="客户端IP">
              {getFieldDecorator('client_addr', {
                initialValue: client_addr,
              })(<Input type="string" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="SQL唯一标识">
              {getFieldDecorator('digest', {
                initialValue: digest,
              })(<Input type="string" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="匹配SQL语句">
              {getFieldDecorator('match_digest', {
                initialValue: match_digest,
              })(<Input type="string" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="匹配SQL正则">
              {getFieldDecorator('match_pattern', {
                initialValue: match_pattern,
              })(<Input type="string" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="覆写语句">
              {getFieldDecorator('replace_pattern', {
                initialValue: replace_pattern,
              })(<Input type="string" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="目标主机组">
              {getFieldDecorator('destination_hostgroup', {
                initialValue: destination_hostgroup,
              })(<Input type="number" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="查询缓冲时间">
              {getFieldDecorator('cache_ttl', {
                initialValue: cache_ttl,
              })(<Input type="number" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="错误信息">
              {getFieldDecorator('error_msg', {
                initialValue: error_msg,
              })(<Input />)}
            </FormItem>

          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(QrCreateOrUpdateModal);
