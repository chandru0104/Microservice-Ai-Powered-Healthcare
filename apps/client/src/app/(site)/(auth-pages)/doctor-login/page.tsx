"use client"

import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { Login } from "../../../../models/authModel"
import { DoctorLogin,googleLoginDoctor } from "../../../../services/authService"
import { useRouter } from 'next/navigation';
import {useGoogleLogin} from "@react-oauth/google"

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
        router.push("/admin/dashboard")
      }

    } catch (error: any) {
      throw new Error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      try {
        const post = await googleLoginDoctor({ code: codeResponse.code, role: "doctor" })
        const user = post?.data?.data?.user
        const accessToken = post?.data?.data?.accessToken

        if (user) {
          localStorage.setItem("doctorId", user._id || user.id)
          localStorage.setItem("doctorName", user.name)
          localStorage.setItem("doctorRole", user.role)
        }
        if (accessToken) {
          localStorage.setItem("doctorAccessToken", accessToken)
        }
       if(post){
        router.push("/")
       }

      } catch (error: any) {
        console.log(error.message)
      }
    }
  })

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
          <div className='flex flex-col items-center justify-center'>
            <button type="button" className='flex items-center justify-center gap-2 p-1 border-2 rounded-md' onClick={() => handleGoogleLogin()}><Image src="/google-logo.jpg" alt="logo" height={20} width={20} />Continue With Google</button>
            <div className='flex item-center justify-center p-1'>
              <Link href="/doctor-register" className='text-center'>Register now!</Link>
            </div>
          </div>
        </Form.Item>
      </Form>

    </div>
  );
};

export default DoctorLogins;