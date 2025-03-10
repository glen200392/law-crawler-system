import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  BugOutlined,
  ExportOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: '儀表板',
    },
    {
      key: '/crawler',
      icon: <BugOutlined />,
      label: '爬蟲管理',
    },
    {
      key: '/export',
      icon: <ExportOutlined />,
      label: '數據導出',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: '系統設置',
    },
  ];

  return (
    <Sider
      theme="light"
      breakpoint="lg"
      collapsedWidth="0"
    >
      <div style={{ height: 32, margin: 16, background: 'rgba(0, 0, 0, 0.2)' }} />
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  );
};

export default Sidebar; 