import React, { Component } from 'react';
import { Switch, Modal, Form, Input } from 'antd';
import styles from './UserModal.css';

const FormItem = Form.Item;

class UserCreateOrUpdateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      active: 0,
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
        let result = values;
        result.max_connections = parseInt(result.max_connections, 10);
        onOk(values);
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const {
      username,
      password,
      active,
      use_ssl,
      default_hostgroup,
      default_schema,
      schema_locked,
      transaction_persistent,
      fast_forward,
      backend,
      frontend,
      max_connections,
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
          title={this.props.modaltitle}
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form horizontal onSubmit={this.okHandler}>
            <FormItem {...formItemLayout} label="用户名">
              {getFieldDecorator('username', {
                rules: [{ required: true }],
                initialValue: username,
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="密码">
              {getFieldDecorator('password', {
                rules: [{ required: true }],
                initialValue: password,
              })(<Input />)}
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
            <FormItem {...formItemLayout} label="使用SSL">
              {getFieldDecorator('use_ssl', {
                initialValue: use_ssl,
              })(
                <Switch
                  defaultChecked={use_ssl}
                  checkedChildren={'是'}
                  unCheckedChildren={'否'}
                  onChange=""
                />,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="默认主机组">
              {getFieldDecorator('default_hostgroup', {
                rules: [{ required: true }],
                initialValue: default_hostgroup,
              })(<Input type="number" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="默认数据库">
              {getFieldDecorator('default_schema', {
                rules: [{ required: true }],
                initialValue: default_schema,
              })(<Input type="string" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="数据库锁定">
              {getFieldDecorator('schema_locked', {
                initialValue: schema_locked,
              })(
                <Switch
                  defaultChecked={schema_locked}
                  checkedChildren={'是'}
                  unCheckedChildren={'否'}
                  onChange=""
                />,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="事务持久">
              {getFieldDecorator('transaction_persistent', {
                initialValue: transaction_persistent,
              })(
                <Switch
                  defaultChecked={transaction_persistent}
                  checkedChildren={'是'}
                  unCheckedChildren={'否'}
                  onChange=""
                />,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="快速转发">
              {getFieldDecorator('fast_forward', {
                initialValue: fast_forward,
              })(
                <Switch
                  defaultChecked={fast_forward}
                  checkedChildren={'是'}
                  unCheckedChildren={'否'}
                  onChange=""
                />,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="后端用户">
              {getFieldDecorator('backend', {
                initialValue: backend,
              })(
                <Switch
                  defaultChecked={backend}
                  checkedChildren={'是'}
                  unCheckedChildren={'否'}
                  onChange=""
                />,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="前端用户">
              {getFieldDecorator('frontend', {
                initialValue: frontend,
              })(
                <Switch
                  defaultChecked={frontend}
                  checkedChildren={'是'}
                  unCheckedChildren={'否'}
                  onChange=""
                />,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="最大连接数">
              {getFieldDecorator('max_connections', {
                rules: [{ required: true }],
                initialValue: max_connections,
              })(<Input type="number" />)}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(UserCreateOrUpdateModal);
