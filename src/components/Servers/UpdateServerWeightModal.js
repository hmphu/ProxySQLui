import React, { Component } from 'react';
import { Select, Modal, Form, Input } from 'antd';
import styles from './Servers.css';

const FormItem = Form.Item;

class UpdateServerWeightModal extends Component {
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
    console.log('updateserverweight->props= ', this.props);
    const onOk = this.props.onOk;
    this.props.form.validateFields((err, values) => {
      console.log('UpdateServerWeightModal->okHandler->values', values);
      const hostgroup_id = parseInt(values.hostgroup_id, 10);
      const hostname = values.hostname;
      const port = parseInt(values.port, 10);
      const weight = parseInt(values.weight, 10);
      if (!err) {
        onOk({ hostgroup_id, hostname, port, weight });
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { hostgroup_id, hostname, port, weight } = this.props.record;
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
          title="Modify Server Status"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form horizontal onSubmit={this.okHandler}>
            <FormItem {...formItemLayout} label="HostGroupID">
              {getFieldDecorator('hostgroup_id', {
                initialValue: hostgroup_id,
              })(<Input type="number" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="Hostname">
              {getFieldDecorator('hostname', {
                initialValue: hostname,
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Port">
              {getFieldDecorator('port', {
                initialValue: port,
              })(<Input type="number" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="Weight">
              {getFieldDecorator('weight', {
                initialValue: weight,
              })(<Input type="number" />)}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(UpdateServerWeightModal);
