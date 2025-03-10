import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Table, Progress } from 'antd';
import { Line } from '@ant-design/plots';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [performanceData, setPerformanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // 每分鐘更新
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, performanceRes] = await Promise.all([
        axios.get('/api/stats'),
        axios.get('/api/performance')
      ]);
      setStats(statsRes.data);
      setPerformanceData(performanceRes.data);
      setLoading(false);
    } catch (error) {
      console.error('獲取數據失敗:', error);
    }
  };

  const memoryConfig = {
    data: performanceData,
    xField: 'timestamp',
    yField: 'memory',
    smooth: true,
    annotations: [
      {
        type: 'line',
        start: ['min', 85],
        end: ['max', 85],
        style: {
          stroke: 'red',
          lineDash: [4, 4],
        },
      },
    ],
  };

  const cpuConfig = {
    data: performanceData,
    xField: 'timestamp',
    yField: 'cpu',
    smooth: true,
  };

  const columns = [
    {
      title: '爬蟲',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '狀態',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '進度',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress) => <Progress percent={progress} />,
    },
    {
      title: '已處理項目',
      dataIndex: 'processed',
      key: 'processed',
    },
    {
      title: '錯誤數',
      dataIndex: 'errors',
      key: 'errors',
    },
  ];

  return (
    <div>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="總爬取文件"
              value={stats.totalDocuments}
              loading={loading}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="今日更新"
              value={stats.todayUpdates}
              loading={loading}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="活躍爬蟲"
              value={stats.activeCrawlers}
              loading={loading}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="成功率"
              value={stats.successRate}
              suffix="%"
              loading={loading}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card title="內存使用">
            <Line {...memoryConfig} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="CPU 使用">
            <Line {...cpuConfig} />
          </Card>
        </Col>
      </Row>

      <Card title="爬蟲狀態" style={{ marginTop: 16 }}>
        <Table
          columns={columns}
          dataSource={stats.crawlers}
          loading={loading}
          rowKey="name"
        />
      </Card>
    </div>
  );
};

export default Dashboard; 