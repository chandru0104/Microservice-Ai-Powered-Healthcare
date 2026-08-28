"use client"

import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { Login } from "../../../../models/authModel"
import { DoctorLogin } from "../../../../services/authService"
import { useRouter } from 'next/navigation';
const DoctorLogins: React.FC = () => {

  const [loading, setLoading] = useState(false)
  const router = useRouter()


  const onFinish = async (values: Login) => {
    try {

      setLoading(true)

      const doctorData = await DoctorLogin(values)
      console.log(doctorData)
      const { id, name, accessToken } = doctorData.data
 
      localStorage.setItem("doctorId", id)
      localStorage.setItem("doctorName", name)
      localStorage.setItem("doctorAccessToken", accessToken)

      if (doctorData) {
        router.push("/dashboard")
      }

    } catch (error: any) {
      throw new Error(error.message)
    } finally {
      setLoading(false)
    }
  }



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
        <h2 className='text-center p-8'>Doctor Login</h2>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please enter your Email!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please enter your Password!' }]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Flex >
            <div className='flex item-end justify-end pl-[150px]'>
              <Link href="/doctor-forgot">Forgot password</Link>
            </div>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit" loading={loading}>
            Log in
          </Button>
          <p className='flex item-center justify-center pt-2'>or</p>
          <div className='flex item-center justify-center p-1'>
            <Link href="/doctor-register" className='text-center'>Register now!</Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DoctorLogins;