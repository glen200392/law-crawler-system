import React from 'react';
import { Card, Form, Select, Button, DatePicker, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const { Option } = Select;
const { RangePicker } = DatePicker;

const DataExport = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      message.loading('正在導出數據...');
      // TODO: 實現導出邏輯
      message.success('數據導出成功！');
    } catch (error) {
      message.error('導出失敗：' + error.message);
    }
  };

  return (
    <Card title="數據導出">
      <Form
        form={form}
        name="export"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="format"
          label="導出格式"
          rules={[{ required: true, message: '請選擇導出格式' }]}
        >
          <Select placeholder="選擇格式">
            <Option value="csv">CSV</Option>
            <Option value="excel">Excel</Option>
            <Option value="json">JSON</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="dateRange"
          label="日期範圍"
          rules={[{ required: true, message: '請選擇日期範圍' }]}
        >
          <RangePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="type"
          label="數據類型"
          rules={[{ required: true, message: '請選擇數據類型' }]}
        >
          <Select placeholder="選擇類型">
            <Option value="all">全部數據</Option>
            <Option value="laws">法規數據</Option>
            <Option value="cases">案例數據</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<DownloadOutlined />}>
            開始導出
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default DataExport; 