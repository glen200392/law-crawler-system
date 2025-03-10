import React, { useState, useEffect } from 'react';
import { Card, Button, Table, Tag, Space, Form, Select, Input, message } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, SettingOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;

const CrawlerControl = () => {
  const [crawlers, setCrawlers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // 獲取爬蟲列表
  const fetchCrawlers = async () => {
    try {
      const response = await axios.get('/api/crawlers');
      setCrawlers(response.data);
    } catch (error) {
      message.error('獲取爬蟲列表失敗');
    }
  };

  useEffect(() => {
    fetchCrawlers();
  }, []);

  // 啟動爬蟲
  const startCrawler = async (crawlerId) => {
    try {
      setLoading(true);
      await axios.post(`/api/crawlers/${crawlerId}/start`);
      message.success('爬蟲已啟動');
      fetchCrawlers();
    } catch (error) {
      message.error('啟動爬蟲失敗');
    } finally {
      setLoading(false);
    }
  };

  // 停止爬蟲
  const stopCrawler = async (crawlerId) => {
    try {
      setLoading(true);
      await axios.post(`/api/crawlers/${crawlerId}/stop`);
      message.success('爬蟲已停止');
      fetchCrawlers();
    } catch (error) {
      message.error('停止爬蟲失敗');
    } finally {
      setLoading(false);
    }
  };

  // 添加新爬蟲
  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios.post('/api/crawlers', values);
      message.success('爬蟲添加成功');
      form.resetFields();
      fetchCrawlers();
    } catch (error) {
      message.error('添加爬蟲失敗');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: '國家',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: '類別',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '狀態',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'running' ? 'green' : 'red'}>
          {status === 'running' ? '運行中' : '已停止'}
        </Tag>
      ),
    },
    {
      title: '上次運行',
      dataIndex: 'lastRun',
      key: 'lastRun',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {record.status === 'running' ? (
            <Button
              icon={<PauseCircleOutlined />}
              onClick={() => stopCrawler(record.id)}
              loading={loading}
            >
              停止
            </Button>
          ) : (
            <Button
              type="primary"
              icon={<PlayCircleOutlined />}
              onClick={() => startCrawler(record.id)}
              loading={loading}
            >
              啟動
            </Button>
          )}
          <Button icon={<SettingOutlined />}>設置</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card title="添加新爬蟲" style={{ marginBottom: 24 }}>
        <Form
          form={form}
          name="crawler"
          onFinish={onFinish}
          layout="inline"
        >
          <Form.Item
            name="country"
            rules={[{ required: true, message: '請選擇國家' }]}
          >
            <Select style={{ width: 120 }} placeholder="選擇國家">
              <Option value="taiwan">台灣</Option>
              <Option value="japan">日本</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="category"
            rules={[{ required: true, message: '請選擇類別' }]}
          >
            <Select style={{ width: 120 }} placeholder="選擇類別">
              <Option value="labor">勞動法規</Option>
              <Option value="safety">安全法規</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              添加
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title="爬蟲管理">
        <Table
          columns={columns}
          dataSource={crawlers}
          rowKey="id"
          loading={loading}
        />
      </Card>
    </div>
  );
};

export default CrawlerControl; 