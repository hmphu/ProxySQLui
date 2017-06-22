import React, { Component } from 'react';
import { Select, Modal, Form, Input } from 'antd';
import styles from './Queryrules.css';

const FormItem = Form.Item;

class UpdateQrUserModal extends Component {
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
    console.log('UpdateQrUser->props= ', this.props);
    const onOk = this.props.onOk;
    this.props.form.validateFields((err, values) => {
      console.log('UpdateQrUser->okHandler->values', values);
      const rule_id = parseInt(values.rule_id, 10);
      const username = values.username;
      if (!err) {
        onOk({ rule_id, username });
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { rule_id, username } = this.props.record;
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
          title="Modify Query Rules"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form horizontal onSubmit={this.okHandler}>
            <FormItem {...formItemLayout} label="RuleId">
              {getFieldDecorator('rule_id', {
                initialValue: rule_id,
              })(<Input type="number" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="User Name">
              {getFieldDecorator('username', {
                initialValue: username,
              })(<Input />)}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(UpdateQrUserModal);
