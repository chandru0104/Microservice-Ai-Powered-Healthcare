"use client"

import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Flex, Form, Input } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
const UserLogin: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
<div className='min-h-screen flex items-center justify-center'>

    <Form
      name="login"
      initialValues={{ remember: true }}
      style={{ maxWidth: 360,  border: "1px solid black", padding:"60px" ,borderRadius:"20px"}}
      onFinish={onFinish}
    className='shadow-lg'
    >
        <div className='flex items-center justify-center'>
        <Image src={"/logo.png"} height={60} width={60} alt='logo'/> 
        <h2 className='text-center'>Care Hub</h2>

        </div>
       <h2 className='text-center p-8'>User Login</h2>
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Flex justify="space-between" align="center">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Link href="/user-doctor">Forgot password</Link>
        </Flex>
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit">
          Log in
        </Button>
        or <Link href="/user-regsiter" className='text-center'>Register now!</Link>
      </Form.Item>
    </Form>
    </div>
  );
};

export default UserLogin;