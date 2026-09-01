"use client"

import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import Image from 'next/image';
import { UserResetPassword } from "../../../../services/authService"
import { useRouter } from "next/navigation"

import { ResetPassword } from "../../../../models/authModel"
const UserForgot: React.FC = () => {

    const [loading, setLoading] = useState(false)

    const router = useRouter()


    const onFinish = async (values: any) => {
        try {
            setLoading(true)
            const { newPassword, confirmPassword } = values

            const email = localStorage.getItem("forgotTempEmail")
            const token = localStorage.getItem("resetToken")
            if (!email || !token || !newPassword || !confirmPassword) {
                throw new Error("Please fill all values")
            }
            const data: ResetPassword = { email, token, newPassword, confirmPassword }
            const reset = await UserResetPassword(data)

            if (reset) {
                localStorage.removeItem("forgotTempEmail")
                localStorage.removeItem("resetToken")   
                router.push("/user-login")
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
                <h2 className='text-center p-8'>Reset Password</h2>
                <Form.Item
                    name="newPassword"
                    rules={[{ required: true, message: 'Please enter your new password!' }]}
                >
                    <Input placeholder="New Password" type='password' />
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    rules={[{ required: true, message: 'Please enter your confirm password!' }]}
                >
                    <Input placeholder="Confirm Password" type='password' />
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