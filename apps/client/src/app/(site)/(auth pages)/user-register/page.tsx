"use client"

import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

const UserRegister: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>

      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360, padding: "50px", borderRadius: "20px" }}
        onFinish={onFinish}
        className='shadow-2xl border-gray-900 border-1 w-[800px]'
      >
        <div className='flex items-center justify-center'>
          <Image src={"/logo.png"} height={60} width={60} alt='logo' />
          <h2 className='text-center'>Care Hub</h2>

        </div>
        <h2 className='text-center p-8'>User Login</h2>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please enter your Username!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
                <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please enter your Username!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
                <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please enter your Username!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
                <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please enter your Username!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please enter your Password!' }]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>


        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Register
          </Button>
          <p className='flex item-center justify-center pt-2'>or</p>
          <div className='flex item-center justify-center p-1'>
            <Link href="/user-login" className='text-center'>Login</Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserRegister;