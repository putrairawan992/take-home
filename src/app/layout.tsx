"use client";
import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import styles from "./layout.module.scss";
import { Providers } from "./provider";
import { useRouter } from "next/navigation";

const { Header, Sider, Content } = Layout;

const DashboardLayout = ({ children }: { children: any }) => {
  const route = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <html lang="en">
      <body className={styles.body}>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className={styles.logo} />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["0"]}>
              <Menu.Item
                key="0"
                icon={<PieChartOutlined />}
                onClick={() => route.push("/")}
              >
                Dashboard
              </Menu.Item>
              <Menu.Item
                key="1"
                icon={<UserOutlined />}
                onClick={() => route.push("/user")}
              >
                Users
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className={styles.siteLayout}>
            <Header
              className={styles.siteLayoutBackground}
              style={{ padding: 0 }}
            >
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: styles.trigger,
                  onClick: toggle,
                }
              )}
            </Header>
            <Providers>
              <Content style={{ margin: "16px" }}>
                <div
                  style={{ padding: 24, background: "#fff", minHeight: 360 }}
                >
                  {children}
                </div>
              </Content>
            </Providers>
          </Layout>
        </Layout>
      </body>
    </html>
  );
};

export default DashboardLayout;
