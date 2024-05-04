// components/CreateUserForm.tsx
"use client";
import React, { useEffect } from "react";
import { Form, Input, Button, Typography } from "antd";
import {
  createUser,
  fetchUserById,
  updateUser,
} from "@root/libs/redux/reducers/usersSlice";
import { useAppDispatch, useAppSelector } from "@root/libs/redux/store";
import { useParams, useRouter } from "next/navigation";

const { Title } = Typography;

const CreateUserForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const route = useRouter();
  const param = useParams();
  const [form] = Form.useForm();

  const selectedUser = useAppSelector((state) => state.users.selectedUser);

  useEffect(() => {
    dispatch(fetchUserById(param.id));
  }, [dispatch, param]);

  useEffect(() => {
    form.setFieldValue("name", selectedUser?.name);
    form.setFieldValue("email", selectedUser?.email);
    form.setFieldValue("phone", selectedUser?.phone);
    form.setFieldValue("website", selectedUser?.website);
  }, [form, selectedUser]);

  const onFinish = (values: any) => {
    const val = {
      ...values,
      id: param.id,
    };
    dispatch(updateUser(val));
    route.push("/user");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Title level={2}>Update User</Title>
      <Form
        form={form}
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
