import React, { Component } from 'react';
import { Slider, Button, Modal, Form, Input } from 'antd';
import styles from './Schedulers.css';

class CreateOneScheduler extends Component {
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
      console.log('CreateOneQr->okHandler->this.props: ', this.props);
      const filename = values.filename;
      const interval_ms = values.interval_ms;
      console.log('values --> ', { filename, interval_ms });
      if (!err) {
        onOk({ filename, interval_ms });
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
        <Button icon="api" type="primary" onClick={this.showModelHandler}>
          {' '}新建{' '}
        </Button>
        <Modal
          title="新建调度器"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form horizontal onSubmit={this.okHandler}>
            <Form.Item {...formItemLayout} label="可执行文件路径">
              {getFieldDecorator('filename', {
                initialValue: '/bin/ls',
              })(<Input type="string" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="执行周期(单位:秒)">
              {getFieldDecorator('interval_ms', {
                initialValue: 100,
              })(<Slider min={100} step={10} max={3600} disabled={0} />)}
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

export default Form.create()(CreateOneScheduler);
