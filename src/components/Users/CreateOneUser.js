import React, { Component } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import styles from './UserModal.css';

const FormItem = Form.Item;

class CreateOneUser extends Component {
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
      console.log('onOk', this.props);
      console.log('values --> ', values);
      if (!err) {
        onOk(values);
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
        <Button type="primary" icon="user-add" onClick={this.showModelHandler}>
          {' '}创建新用户{' '}
        </Button>
        <Modal
          title="创建新用户"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form horizontal onSubmit={this.okHandler}>
            <FormItem {...formItemLayout} label="User Name">
              {getFieldDecorator('username', {
                initialValue: 'dev',
              })(<Input type="string" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="Password">
              {getFieldDecorator('password', {
                initialValue: 'dev',
              })(<Input type="string" />)}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(CreateOneUser);
