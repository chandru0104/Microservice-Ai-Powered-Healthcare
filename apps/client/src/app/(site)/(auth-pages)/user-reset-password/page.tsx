"use client"

import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import Image from 'next/image';

import { useRouter } from "next/navigation"


const UserForgot: React.FC = () => {

    const [loading, setLoading] = useState(false)

    const router = useRouter()


    const onFinish = async (values: { otp: string }) => {

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
                <h2 className='text-center p-8'>Otp verify</h2>
                <Form.Item
                    name="otp"
                    rules={[{ required: true, message: 'Please enter your Otp!' }]}
                >
                    <Input placeholder="Otp" />
                </Form.Item>


                <Form.Item>
                    <Button block type="primary" htmlType="submit" loading={loading}>
                        verify
                    </Button>

                </Form.Item>
            </Form>
        </div>
    );
};

export default UserForgot;