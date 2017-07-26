import React, { Component } from 'react';
import { Switch, Select, Modal, Form, Input, InputNumber } from 'antd';
import styles from './Servers.css';

const FormItem = Form.Item;

class ServerCreateOrUpdateModal extends Component {
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
    console.log('updateserverstatus->props= ', this.props);
    const onOk = this.props.onOk;
    this.props.form.validateFields((err, values) => {
      const hostgroup_id = parseInt(values.hostgroup_id, 10);
      const hostname = values.hostname;
      const port = parseInt(values.port, 10);
      const status = values.status;
      const weight = parseInt(values.weight, 10);
      let compression = values.compression;
      if (compression) {
        compression = 1;
      } else {
        compression = 0;
      }
      const max_connections = parseInt(values.max_connections, 10);
      const max_replication_lag = parseInt(values.max_replication_lag, 10);
      let use_ssl = values.use_ssl;
      if (use_ssl) {
        use_ssl = 1;
      } else {
        use_ssl = 0;
      }
      const max_latency_ms = parseInt(values.max_latency_ms, 10);
      const comment = values.comment;

      const newValue = {
        hostgroup_id,
        hostname,
        port,
        status,
        weight,
        compression,
        max_connections,
        max_replication_lag,
        use_ssl,
        max_latency_ms,
        comment,
      };
      console.log('ServerCreateOrUpdateModal->okHandler->values', newValue);
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
      hostgroup_id,
      hostname,
      port,
      status,
      weight,
      compression,
      max_connections,
      max_replication_lag,
      use_ssl,
      max_latency_ms,
      comment,
    } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    const statusOptions = getFieldDecorator('status', {
      rules: [{ required: true }],
      initialValue: 'ONLINE',
    })(
      <Select style={{ width: 120 }}>
        <Option value="ONLINE">ONLINE</Option>
        <Option value="OFFLINE_SOFT">OFFLINE_SOFT</Option>
        <Option value="OFFLINE_HARD">OFFLINE_HARD</Option>
      </Select>,
    );

    return (
      <span>
        <span onClick={this.showModelHandler}>
          {children}
        </span>
        <Modal
          title="编辑主机信息"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form horizontal onSubmit={this.okHandler}>
            <FormItem {...formItemLayout} label="主机组ID">
              {getFieldDecorator('hostgroup_id', {
                rules: [{ required: true }],
                initialValue: hostgroup_id,
              })(<Input type="number" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="主机名">
              {getFieldDecorator('hostname', {
                rules: [{ required: true }],
                initialValue: hostname,
              })(<Input type="string" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="端口">
              {getFieldDecorator('port', {
                rules: [{ required: true }],
                initialValue: port,
              })(<InputNumber min={1025} max={655350} defaultvalue={3306} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="状态">
              {statusOptions}
            </FormItem>
            <FormItem {...formItemLayout} label="权重">
              {getFieldDecorator('weight', {
                rules: [{ required: true }],
                initialValue: weight,
              })(<InputNumber min={1} max={1000} defaultValue={100} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="压缩值">
              {getFieldDecorator('compression', {
                initialValue: compression,
              })(
                <InputNumber min={0} max={102400} defaultvalue={0} />,
                )}
            </FormItem>

            <FormItem {...formItemLayout} label="最大连接数">
              {getFieldDecorator('max_connections', {
                rules: [{ required: true }],
                initialValue: max_connections,
              })(<InputNumber min={1} max={1000000} defaultvalue={10000} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="最大复制延时">
              {getFieldDecorator('max_replication_lag', {
                initialValue: max_replication_lag,
              })(<InputNumber min={0} max={126144000} defaultvalue={0} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="启用SSL">
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
            <FormItem {...formItemLayout} label="最大延时时间">
              {getFieldDecorator('max_latency_ms', {
                initialValue: max_latency_ms,
              })(<InputNumber min={0} max={100000000} defaultvalue={0} />)}
            </FormItem>

            <FormItem {...formItemLayout} label="备注">
              {getFieldDecorator('comment', {
                initialValue: comment,
              })(<Input type="string" />)}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(ServerCreateOrUpdateModal);
