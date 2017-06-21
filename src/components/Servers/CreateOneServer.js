import React, { Component } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import styles from './Servers.css';

class CreateOneServer extends Component {
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
    const onOk = this.props.onOK;
    this.props.form.validateFields((err, values) => {
      console.log('this.props=', this.props);
      console.log('values --> ', values);
      if (!err) {
        this.props.onOk(values);
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    // const { password, username } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <span>
        <Button icon="database" onClick={this.showModelHandler}>
          {' '}Add Server{' '}
        </Button>
        <Modal
          title="Add Server"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form horizontal onSubmit={this.okHandler}>
            <Form.Item {...formItemLayout} label="HostGroupId">
              {getFieldDecorator('hostgroup_id', {
                initialValue: 0,
              })(<Input />)}
            </Form.Item>

            <Form.Item {...formItemLayout} label="Hostname">
              {getFieldDecorator('hostname', {
                initialValue: '192.168.100.10',
              })(<Input />)}
            </Form.Item>

            <Form.Item {...formItemLayout} label="Hostname">
              {getFieldDecorator('port', {
                initialValue: 6033,
              })(<Input />)}
            </Form.Item>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(CreateOneServer);
