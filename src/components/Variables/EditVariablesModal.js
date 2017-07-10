import React, { Component } from 'react';
import { Switch, Select, Modal, Form, Input } from 'antd';
import styles from './Variables.css';

const FormItem = Form.Item;

class EditVariablesModal extends Component {
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
      console.log('EditVariablesModal->okHandler->values:', values);
      const variable_name = values.variable_name;
      const variable_value = values.variable_value;

      const newValue = { variable_name, variable_value };

      console.log('EditVariablesModal.js->okHandler->newValue: ', newValue);

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
      variable_name,
      variable_value,
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
          title="修改参数"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form layout="horizontal" onSubmit={this.okHandler}>
            <FormItem {...formItemLayout} label="参数名称">
              {getFieldDecorator('variable_name', {
                initialValue: variable_name,
              })(<Input type="string" disabled="true" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="参数值">
              {getFieldDecorator('variable_value', {
                initialValue: variable_value,
              })(
                <Input type="string" />,
              )}
            </FormItem>
          </Form>
        </Modal>
      </span >
    );
  }
}

export default Form.create()(EditVariablesModal);
