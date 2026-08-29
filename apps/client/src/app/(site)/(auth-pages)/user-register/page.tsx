"use client"

import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import { UserRegisters } from 'apps/client/src/services/authService';
import { useRouter } from 'next/navigation';
const UserRegister: React.FC = () => {

  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const onFinish = async (values: any) => {
    try {
      setLoading(true)
      const register = await UserRegisters(values)
      if (register) {
        router.push("/otp/user")
      }
    } catch (error: any) {
      throw new Error(error.message)

    } finally {
      setLoading(false)
    }

  };

  return (
    <div className='min-h-screen flex items-center justify-center'>

      <Form
        name="register"
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
          name="name"
          rules={[{ required: true, message: 'Please enter your Username!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please enter your Email!' }]}
        >
          <Input prefix={<MdOutlineMailOutline />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please enter your Password!' }]}
        >
          <Input prefix={<MdOutlinePassword />} placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit" loading={loading}>
            Register
          </Button>
          <p className='flex item-center justify-center pt-2'>or</p>
          <div className='flex item-center justify-center p-1'>
            <Link href="/user-login" className='text-center'>Already have an account?</Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserRegister;