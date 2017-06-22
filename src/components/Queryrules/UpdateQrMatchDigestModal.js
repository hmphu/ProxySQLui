import React, { Component } from 'react';
import { Select, Modal, Form, Input } from 'antd';
import styles from './Queryrules.css';

const FormItem = Form.Item;

class UpdateQrMatchDigestModal extends Component {
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
      console.log('UpdateQrMatchDigest->okHandler->values: ', values);
      const rule_id = parseInt(values.rule_id, 10);
      const match_digest = values.match_digest;
      if (!err) {
        onOk({ rule_id, match_digest });
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { rule_id, match_digest } = this.props.record;
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

            <FormItem {...formItemLayout} label="MatchDigest">
              {getFieldDecorator('match_digest', {
                initialValue: match_digest,
              })(<Input type="string" />)}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(UpdateQrMatchDigestModal);
