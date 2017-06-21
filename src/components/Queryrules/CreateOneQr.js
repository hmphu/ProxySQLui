import React, { Component } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import styles from './Queryrules.css';

class CreateOneQr extends Component {
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
      const username = values.username;
      console.log('values --> ', { username });
      if (!err) {
        onOk({ username });
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
        <Button icon="api" onClick={this.showModelHandler}>
          {' '}Add Query Rules{' '}
        </Button>
        <Modal
          title="Add Query Rules"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form horizontal onSubmit={this.okHandler}>
            <Form.Item {...formItemLayout} label="UserName">
              {getFieldDecorator('username', {
                initialValue: 'dev',
              })(<Input type="string" />)}
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

export default Form.create()(CreateOneQr);
