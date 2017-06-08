import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
import styles from './UserModal.css';

const FormItem = Form.Item;

class UserMCModal extends Component {
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
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const result = values;
        result.max_connections = parseInt(result.max_connections, 10);
        onOk(values);
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { username, max_connections } = this.props.record;
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
          title="Edit User"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form horizontal onSubmit={this.okHandler}>
            <FormItem {...formItemLayout} label="User Name">
              {getFieldDecorator('username', {
                initialValue: username,
              })(<Input />)}
            </FormItem>

            <FormItem {...formItemLayout} label="MaxConnections">
              {getFieldDecorator('max_connections', {
                initialValue: max_connections,
              })(<Input />)}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(UserMCModal);
