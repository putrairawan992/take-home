// components/CreateUserForm.tsx
"use client";
import React from "react";
import { Form, Input, Button, Typography, notification } from "antd";
import { createUser } from "@root/libs/redux/reducers/usersSlice";
import { useAppDispatch } from "@root/libs/redux/store";
import { useRouter } from "next/navigation";

const { Title } = Typography;

const CreateUserForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const route = useRouter();

  const onFinish = (values: any) => {
    dispatch(createUser(values)).then(() => {
      route.push("/user");
      notification.success({ message: "User created successfully" })
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Title level={2}>Create User</Title>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Please input your phone!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Website"
          name="website"
          rules={[{ required: true, message: "Please input your website!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateUserForm;
