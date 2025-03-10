import React from 'react';
import { Card, Form, Input, Switch, InputNumber, Button, message } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

const Settings = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      message.loading('正在保存設置...');
      // TODO: 實現設置保存邏輯
      message.success('設置已保存！');
    } catch (error) {
      message.error('保存失敗：' + error.message);
    }
  };

  return (
    <Card title="系統設置">
      <Form
        form={form}
        name="settings"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          apiKey: '',
          maxConcurrent: 5,
          enableAutoClean: true,
          cleanupThreshold: 85,
          retryAttempts: 3
        }}
      >
        <Form.Item
          name="apiKey"
          label="API 密鑰"
          rules={[{ required: true, message: '請輸入 API 密鑰' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="maxConcurrent"
          label="最大並發請求數"
          rules={[{ required: true, message: '請設置最大並發請求數' }]}
        >
          <InputNumber min={1} max={10} />
        </Form.Item>

        <Form.Item
          name="enableAutoClean"
          label="啟用自動清理"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          name="cleanupThreshold"
          label="清理閾值 (%)"
          rules={[{ required: true, message: '請設置清理閾值' }]}
        >
          <InputNumber min={50} max={95} />
        </Form.Item>

        <Form.Item
          name="retryAttempts"
          label="重試次數"
          rules={[{ required: true, message: '請設置重試次數' }]}
        >
          <InputNumber min={0} max={5} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
            保存設置
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Settings; 