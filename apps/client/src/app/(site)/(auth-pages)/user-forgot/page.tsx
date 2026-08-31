"use client"

import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import Image from 'next/image';
import { UserForgotEmail } from "../../../../services/authService"
import { useRouter } from 'next/navigation';

const sendEmail: React.FC = () => {

    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const onFinish = async (values: { email: string }) => {
        try {
            setLoading(true)
            const sendEmail = await UserForgotEmail(values)
            if (sendEmail) {
                if (typeof window === "object") {
                    localStorage.setItem("forgotTempEmail", values.email)
                }
                router.push("/user-forgot-otp")
            }

        } catch (error: any) {
            console.log(error.message)
        } finally {
            setLoading(false)
        }

    };

    return (
        <div className='min-h-screen flex items-center justify-center'>

            <Form
                name="Email"
                initialValues={{ remember: true }}
                style={{ maxWidth: 360, padding: "50px", borderRadius: "20px" }}
                onFinish={onFinish}
                className='shadow-2xl border-gray-900 border-1 w-[800px]'
            >
                <div className='flex items-center justify-center'>
                    <Image src={"/logo.png"} height={60} width={60} alt='logo' />
                    <h2 className='text-center'>Care Hub</h2>

                </div>
                <h2 className='text-center p-8'>Enter Email</h2>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please enter your Email!' }]}
                >
                    <Input placeholder="Enter your Email" />
                </Form.Item>


                <Form.Item>
                    <Button block type="primary" htmlType="submit" loading={loading}>
                        Send OTP
                    </Button>

                </Form.Item>
            </Form>
        </div>
    );
};

export default sendEmail;