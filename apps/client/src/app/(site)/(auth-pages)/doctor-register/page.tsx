"use client"

import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { MdOutlineMail } from "react-icons/md";
import { CgWorkAlt } from "react-icons/cg";
import { IoPricetagsOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa6";
import Grid from '@mui/material/Grid';
import DocfileUpload from "../../../../components/DocfileUpload"
import { DoctorRegisters } from "../../../../services/authService"
import { useRouter } from 'next/navigation';

const DoctorRegsiter: React.FC = () => {
  const router = useRouter()
  const onFinish = async (values: any) => {
    const add = await DoctorRegisters(values)
    if (add) {
      router.push('/doctor-login')
    }
  };



  return (
    <div className='min-h-screen  flex items-center justify-center'>

      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 860, padding: "30px", borderRadius: "20px" }}
        onFinish={onFinish}
        className='shadow-2xl border-gray-900 border-1 '
      >
        <div className='flex items-center justify-center'>
          <Image src={"/logo.png"} height={60} width={60} alt='logo' />
          <h2 className='text-center'>Care Hub</h2>

        </div>
        <h2 className='text-center p-8'>Doctor Login</h2>
        <Grid container spacing={1}>
          <Grid size={6}>
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please enter your Name!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Name" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please enter your email!' }]}
            >
              <Input prefix={<MdOutlineMail />} placeholder="Email" />
            </Form.Item>
          </Grid>
          <Grid size={6}>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please enter your Password!' }]}
            >
              <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item
              name="specialties"
              rules={[{ required: true, message: 'Please enter your Specialties!' }]}
            >
              <Input prefix={<CgWorkAlt />} placeholder="Specialties" />
            </Form.Item>
          </Grid>
          <Grid size={6}>
            <Form.Item
              name="experience"
              rules={[{ required: true, message: 'Please enter your Experience!' }]}
            >
              <Input prefix={<CgWorkAlt />} placeholder="Experience" />
            </Form.Item>
            <Form.Item
              name="price"
              rules={[{ required: true, message: 'Please enter your Fess!' }]}
            >
              <Input prefix={<IoPricetagsOutline />} placeholder="Fees" />
            </Form.Item>
          </Grid>
          <Grid size={6}>
            <Form.Item
              name="register"
              rules={[{ required: true, message: 'Please enter your Register!' }]}
            >
              <Input prefix={<FaRegBookmark />} placeholder="Register No" />
            </Form.Item>
            <div className='mb-3'>
              <label>Profile: &nbsp; </label><DocfileUpload />
            </div>
          </Grid>

        </Grid>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Register
          </Button>
          <p className='flex item-center justify-center pt-2'>or</p>
          <div className='flex item-center justify-center p-1'>
            <Link href="/doctor-login" className='text-center'>Already have an account</Link>
          </div>
        </Form.Item>

      </Form>

    </div>
  );
};

export default DoctorRegsiter;