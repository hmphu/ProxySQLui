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
      const hostgroup_id = parseInt(values.hostgroup_id, 10);
      const hostname = values.hostname;
      const port = parseInt(values.port, 10);
      if (!err) {
        this.props.onOk({ hostgroup_id, hostname, port });
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
        <Button type="primary" icon="database" onClick={this.showModelHandler}>
          {' '}新建{' '}
        </Button>
        <Modal
          title="新建后端数据库信息"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form horizontal onSubmit={this.okHandler}>
            <Form.Item {...formItemLayout} label="主机组ID">
              {getFieldDecorator('hostgroup_id', {
                initialValue: 0,
              })(<Input type="number" />)}
            </Form.Item>

            <Form.Item {...formItemLayout} label="主机名">
              {getFieldDecorator('hostname', {
                initialValue: '192.168.100.10',
              })(<Input />)}
            </Form.Item>

            <Form.Item {...formItemLayout} label="端口">
              {getFieldDecorator('port', {
                initialValue: 6033,
              })(<Input type="number" />)}
            </Form.Item>
          </Form>
        </Modal>
      </span>
    );
  }
}

/*
CreateOneServer.propTypes = {
  hostgroup_id: React.PropTypes.number.isRequired,
  hostname: React.PropTypes.string.isRequired,
  port: React.PropTypes.number.isRequired,
};
*/

export default Form.create()(CreateOneServer);
