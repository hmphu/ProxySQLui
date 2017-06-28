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
      console.log('UpdateQrClientModal->okHandler->values:', values);
      const rule_id = parseInt(values.rule_id, 10);
      const client_addr = values.client_addr;
      if (!err) {
        onOk({ rule_id, client_addr });
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { rule_id, client_addr } = this.props.record;
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
            <FormItem {...formItemLayout} label="RuleID">
              {getFieldDecorator('rule_id', {
                initialValue: rule_id,
              })(<Input type="number" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="ClientAddr">
              {getFieldDecorator('client_addr', {
                initialValue: client_addr,
              })(<Input />)}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(QrCreateOrUpdateModal);
