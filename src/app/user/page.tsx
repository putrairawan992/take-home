// components/UsersList.tsx
"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Space, Table, Typography, notification } from "antd";
import { deleteUser, fetchUsers } from "@root/libs/redux/reducers/usersSlice";
import { RootState } from "@root/libs/redux/reducers/rootReducers";
import { useAppDispatch } from "@root/libs/redux/store";
import Link from "next/link";

const { Title } = Typography;

const UsersList: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useSelector((state: RootState) => state.users.data);
  const loading = useSelector((state: RootState) => state.users.loading);
  const error = useSelector((state: RootState) => state.users.error);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
    },
    {
      title: "Action",
      dataIndex: null,
      key: "action",
      render: (text: string, record: any) => (
        <Space size="middle">
          <Link href={`/user/update/${record.id}`}>Edit</Link>
          <Button
            type="link"
            danger
            onClick={() => {
              dispatch(deleteUser(record.id)).then(() => {
                dispatch(fetchUsers());
                notification.success({ message: "User deleted successfully" });
              });
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>Users List</Title>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div style={{ textAlign: "right", margin: "20px 0" }}>
        <Button type="primary">
          <Link href="/user/create">Create New</Link>
        </Button>
      </div>
      <Table dataSource={users} columns={columns} />
    </div>
  );
};

export default UsersList;
